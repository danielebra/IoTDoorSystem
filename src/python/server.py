#!/usr/bin/env python

from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello world!"

@app.route('/auth')
def auth():
    print("received auth request")
    id = request.args.get('id')
    movement = request.args.get('movement')
    if id == "729":
        return "1"
    else:
        return "0"

if __name__ == '__main__':
    import os
    app.run(host='0.0.0.0', port=int((os.environ.get("PORT", "8000"))))
