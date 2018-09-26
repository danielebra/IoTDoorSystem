#!/usr/bin/env python
# This is a proof of concept
from pymongo.mongo_client import MongoClient
import random
class Card(object):
    def __init__(self, cardNumber, isActive, userID):
        self.cardNumber = str(cardNumber)
        self.isActive = isActive
        self.userID = str(userID)
    def __str__(self):
        return "cardNumber: {} isActive: {} userID: {}".format(
                                                self.cardNumber,
                                                self.isActive, 
                                                self.userID)
def encode_card(card):
    return {
        "_type": "card",
        "cardNumber": card.cardNumber,
        "isActive": card.isActive,
        "userID": card.userID
    }
def decode_card(document):
    assert document["_type"] == "card"
    return Card(cardNumber=document["cardNumber"],
                isActive=document["isActive"],
                userID=document["userID"])


client = MongoClient('mongodb://admin:admin1234@ds018258.mlab.com:18258/savage-security')
db = client['savage-security']
cards = db.cards

random_number = random.randint(0, 100000000)
my_card = Card(random_number, True, 1)

cards.insert(encode_card(my_card))
card_from_database = cards.find_one({"cardNumber": str(random_number)})
print(card_from_database)

reproduce_card_instance = decode_card(card_from_database)
print(reproduce_card_instance)


