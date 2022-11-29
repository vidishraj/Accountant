from debitCardParser import DebitParser
from creditCardParser import CreditParser


class Handler:
    __UploadDebitFile: str
    __UploadCreditFile: str
    __FinalList: list = []

    def __init__(self, DebitFile, CreditFile):
        self.__UploadCreditFile = DebitFile
        self.__UploadDebitFile = CreditFile
        self.startParsing()

    def startParsing(self):
        try:
            debitCardDetails = DebitParser(self.__UploadDebitFile).returneeFunction()
            debitCardDetails = debitCardDetails[0]
            creditCardDetails = CreditParser(self.__UploadCreditFile).getList()
            self.combineData(debitCardDetails, creditCardDetails)
        except Exception as ex:
            print("ex")

    def combineData(self, debitCardDetails, creditCardDetails):
        self.__FinalList = debitCardDetails + creditCardDetails
        self.__FinalList = sorted(self.__FinalList, key=lambda x: x[0])
        return self.__FinalList

    def getFinalList(self):
        return self.__FinalList
