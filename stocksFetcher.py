from nsetools import Nse
import json

with open('userInfo.json', 'r') as openfile:
    # Reading from json file
    userInfo = json.load(openfile)

currentStocks = userInfo['stocksList']
fetcherObject = Nse()
print(userInfo)


def updateStocksList(updatedList):
    try:
        global currentStocks
        userInfo['stocksList']=updatedList
        if type(updatedList) == list:
            with open("userInfo.json", "w") as outfile:
                json.dump(userInfo, outfile)
            currentStocks = updatedList
            return True
        raise TypeError
    except Exception as ex:
        print(ex)
        return False


def refresh():
    updatedList = []
    for stock in currentStocks:
        stockDict = {}
        stockInfo = fetcherObject.get_quote(stock)
        stockDict['name'] = stockInfo['symbol']
        stockDict['price'] = stockInfo['buyPrice1']
        stockDict['dayHigh'] = stockInfo['dayHigh']
        stockDict['dayLow'] = stockInfo['dayLow']
        stockDict['prevClose'] = stockInfo['previousClose']
        updatedList.append(stockDict)
    return updatedList

