import math
import datetime

import numpy

import PyPDF2
from tabula import read_pdf


def isDcardDebit(transaction):
    return type(transaction[3]) is float and math.isnan(transaction[3])


def isUPIDebit(transaction):
    return type(transaction[1]) is str and transaction[1].startswith('UPI') and type(
        transaction[3]) is float and math.isnan(transaction[3])


def isUPICredit(transaction):
    return type(transaction[1]) is str and transaction[1].startswith('UPI') and type(
        transaction[2]) is float and math.isnan(transaction[2])


class DebitParser:
    __filePath: str
    __UPITrans: list = []
    __NonUPITrans: list = []
    __UPICredit: list = []
    __UPIDebit: list = []
    __dcardDebit: list = []
    __dcardCredit: list = []
    __userInfo: list = []

    def __init__(self, path):
        self.__filePath = path
        self.readStatement()
        self.returneeFunction()

    def readStatement(self):
        try:
            pdfFileObj = open(self.__filePath, 'rb')
            PdfRead = PyPDF2.PdfFileReader(pdfFileObj)
            pages = PdfRead.numPages
            for i in range(pages):
                table_pdf = read_pdf(pdfFileObj, guess=False, area=[219, 12.75, 790.5, 650], pages=i + 1, stream=True,
                                     encoding="utf-8", columns=[68, 270, 350, 420, 500, 550, 650])
                self.extractData(table_pdf[0])
            self.cleanPayeeData()
            self.categoriseDate()

            pdfFileObj.close()
        except Exception as ex:
            print(ex)

    def extractData(self, pdfDf):
        for i in range(len(pdfDf)):
            currentRow = []
            # To stop the reading at the end of the statement
            if "STATEMENT SUMMARY" in pdfDf.iloc[i, 1]:
                break
            # next if is to append the extended payee detail to the previous one
            if type(pdfDf.iloc[i, 0]) == float or type(pdfDf.iloc[i, 0]) == numpy.float64:
                if len(self.__userInfo) > 0:
                    self.__userInfo[-1][1] += str(pdfDf.iloc[i, 1])
            else:
                for j in range(len(pdfDf.columns)):
                    # Represents the date of transaction
                    if j == 0:
                        currentDate = datetime.datetime.strptime(pdfDf.iloc[i, 0], "%d/%m/%y").date()
                        currentRow.append(currentDate)
                    # Represents the credit amount, debit amount
                    if j == 4 or j == 5:
                        if type(pdfDf.iloc[i, j]) == str:
                            pdfDf.iloc[i, j] = pdfDf.iloc[i, j].replace(",", "")
                        convertedValue = float(pdfDf.iloc[i, j])
                        if j == 4:
                            convertedValue = -1 * convertedValue
                        currentRow.append(convertedValue)
                    # Represents the payee details
                    if j == 1:
                        currentRow.append(pdfDf.iloc[i, j])
            if len(currentRow) != 0:
                self.__userInfo.append(currentRow)

    # If its a UPI transaction then clean the payee details here accordingly.
    def cleanPayeeData(self):
        for transaction in self.__userInfo:
            if transaction[1].startswith('UPI'):
                details = transaction[1].split('-')
                transaction[1] = details[0] + "-" + details[1]
                transaction.append(details[-1])

    # This function puts the data in the respective list.
    def categoriseDate(self):
        for i in range(len(self.__userInfo)):
            if isUPICredit(self.__userInfo[i]):
                self.__UPICredit.append(self.__userInfo[i])
                self.__UPITrans.append(self.__userInfo[i])
            elif isUPIDebit(self.__userInfo[i]):
                self.__UPIDebit.append(self.__userInfo[i])
                self.__UPITrans.append(self.__userInfo[i])
            elif isDcardDebit(self.__userInfo[i]):
                self.__dcardDebit.append(self.__userInfo[i])
                self.__NonUPITrans.append(self.__userInfo[i])
            else:
                self.__dcardCredit.append(self.__userInfo[i])
                self.__NonUPITrans.append(self.__userInfo[i])

    # Returnee function
    def returneeFunction(self):
        return [self.__userInfo, self.__UPITrans, self.__NonUPITrans]
