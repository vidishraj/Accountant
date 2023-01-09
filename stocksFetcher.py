from nsetools import Nse
import json
import requests
import urllib.request
import bs4

# Reading from json file
with open('userInfo.json', 'r') as openfile:
    userInfo = json.load(openfile)
currentStocks = userInfo['stocksList']
fetcherObject = Nse()
print(userInfo)


def priceParser(shareName):
    url = 'https://google.com/search?q=' + f'{shareName}' + '+share+price+nse'

    # Perform the request
    request = urllib.request.Request(url)

    # Set a normal User Agent header, otherwise Google will block the request.
    request.add_header('User-Agent',
                       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    raw_response = urllib.request.urlopen(request).read()

    # Read the repsonse as a utf-8 string
    html = raw_response.decode("utf-8")
    soup = bs4.BeautifulSoup(html, 'html.parser')
    divs = soup.find_all("span", {"class": "IsqQVc NprOob wT3VGc"})
    sharePrice = divs[0].text.replace(',', '')
    return float(sharePrice)


def updateStocksList(updatedList):
    try:
        global currentStocks
        userInfo['stocksList'] = updatedList
        if type(updatedList) == list:
            with open("userInfo.json", "w") as outfile:
                json.dump(userInfo, outfile)
            currentStocks = updatedList
            return True
        raise TypeError
    except Exception as ex:
        print(ex)
        return False


# soup.find_all("div", {"class": "stylelistrow"})
def refresh():
    try:
        updatedList = []
        for stock in currentStocks:
            stockDict = {}
            stockInfo = fetcherObject.get_quote(stock)
            stockDict['name'] = stockInfo['symbol']
            if stockInfo['buyPrice1'] != None:
                stockDict['price'] = stockInfo['buyPrice1']
            else:
                stockDict['price'] = priceParser(stock)
            stockDict['dayHigh'] = stockInfo['dayHigh']
            stockDict['dayLow'] = stockInfo['dayLow']
            stockDict['prevClose'] = stockInfo['previousClose']
            updatedList.append(stockDict)
        return updatedList
    except Exception as ex:
        print(ex)
        return [ex]
