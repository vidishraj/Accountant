import os

import requests
from flask import Flask, jsonify
from flask import Response
from flask import request

import stocksFetcher
from handler import Handler

app = Flask(__name__)


@app.route('/updateStocks', methods=['POST'])
def updateStocks():
    try:
        postedData = request.get_json(force=True)
        newStocksList = postedData['newStocksList']
        # newStocksList = requests.get(request.json['newStocksList'])
        print(newStocksList, type(newStocksList))
        stocksFetcher.updateStocksList(newStocksList)
        return Response({"Response": "Stocks data updated successfully."}, status=200)
    except Exception as ex:
        print(ex)


@app.route('/refreshStocks', methods=['GET'])
def refreshStocks():
    try:
        return stocksFetcher.refresh()
    except Exception as ex:
        print(ex)


@app.route('/fetchStatement', methods=['POST'])
def fetchStatement():
    try:
        # Here we will take the files from S3, save it to the temp folder.
        # If no error, return 200 status code, which will be used to call the second endpoint.
        # This is done for modularity.
        debitStatement = requests.get(request.json['debitStatement'])
        creditStatement = requests.get(request.json['creditStatement'])
        os.chdir('tmp')
        open("debitStatement.pdf", "wb").write(debitStatement.content)
        open("creditStatement.pdf", "wb").write(creditStatement.content)
        return Response({"Response": "File saved successfully."}, status=200)
    except Exception as ex:
        return Response({"Error": ex}, status=500)


@app.route('/processStatement', methods=['POST'])
def processStatement():
    try:
        currentHandler = Handler("OctoberCredit.PDF", "OctoberDebit.PDF")
        return jsonify({"TransactionList": currentHandler.getFinalList()})
    except Exception as ex:
        return jsonify({"Error": ex})


if __name__ == '__main__':
    app.run(debug=False)
