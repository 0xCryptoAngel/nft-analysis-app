from flask import Flask
from flask_pymongo import pymongo
from app import app

CONNECTION_STRING="mongodb+srv://dev:opensea2022.@orca.8feyo.mongodb.net/test"
client = pymongo.MongoClient(CONNECTION_STRING)
# print(client.list_database_names()) # Check if Database Exists
db = client.opensea
trades = db.trades
# print(data)
