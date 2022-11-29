import datetime
import re

import numpy as np
import PyPDF2
from tabula import read_pdf


class CreditParser:
    __filePath: str
    __AllTrans: list = []
    __creditTrans: list = []
    __debitTrans: list = []
    __endFlag: bool = False

    def __init__(self, path):
        self.__filePath = path
        self.readStatement()

    def readStatement(self):
        try:
            pdfFileObj = open(self.__filePath, 'rb')
            PdfRead = PyPDF2.PdfFileReader(pdfFileObj)
            pages = PdfRead.numPages
            for i in range(pages - 1):
                if not self.__endFlag:
                    if i == 0:
                        table_pdf = read_pdf(pdfFileObj, guess=False, area=[452.7, 8.75, 790.5, 588], pages=i + 1,
                                             stream=True,
                                             encoding="utf-8", columns=[105.7, 475.09, 588])
                    else:
                        table_pdf = read_pdf(pdfFileObj, guess=False, area=[90, 8.75, 790.5, 588], pages=i + 1, stream=True,
                                             encoding="utf-8", columns=[105.7, 475.09, 588])
                    self.extractData(table_pdf[0])
                else:
                    break

            pdfFileObj.close()
        except Exception as ex:
            print(ex)

    def extractData(self, pdfDf):
        for i in range(len(pdfDf)):
            currentRow = []
            if "Cash points waiting for you" in pdfDf.iloc[i, 1]:
                self.__endFlag = True
                break
            else:
                currentDate = datetime.datetime.strptime(pdfDf.iloc[i, 0], "%d/%m/%Y").date()
                if "Cr" in pdfDf.iloc[i, 2]:
                    transactionAmount = float(re.sub("Cr|,", "", pdfDf.iloc[i, 2]))
                    currentRow.append(currentDate)
                    currentRow.append(pdfDf.iloc[i, 1])
                    currentRow.append(np.nan)
                    currentRow.append(transactionAmount)
                    self.__creditTrans.append(currentRow)
                    self.__AllTrans.append(currentRow)
                else:
                    transactionAmount = float(pdfDf.iloc[i, 2].replace(",", ""))
                    currentRow.append(currentDate)
                    currentRow.append(pdfDf.iloc[i, 1])
                    currentRow.append(transactionAmount)
                    currentRow.append(np.nan)
                    self.__debitTrans.append(currentRow)
                    self.__AllTrans.append(currentRow)

    def getList(self):
        return self.__AllTrans
