from flask import Flask, jsonify
from flask import request
from handler import Handler

app = Flask(__name__)


@app.route('/processStatement', methods=['POST'])
def main():
    try:
        debitURL = request.json['debitStatement']
        creditURL = request.json['creditStatement']
        currentHandler = Handler(debitURL, creditURL)
        return jsonify({"TransactionList": currentHandler.getFinalList()})
    except Exception as ex:
        return jsonify({"Error": ex})


if __name__ == '__main__':
    app.run(debug=False)
