#!/usr/bin/env python

# This is a script to populate the accessRequest database
from pymongo.mongo_client import MongoClient
import random
import datetime

class AccessRequest(object):
    def __init__(self, cardNumber, roomNumber, outcome, time):
        self.cardNumber =cardNumber 
        self.roomNumber =roomNumber 
        self.outcome = outcome
        self.time = time
    def __str__(self):
        return "cardNumber: {} roomNumber: {} outcome: {} time: {}".format(
                                                self.cardNumber,
                                                self.roomNumber, 
                                                self.outcome,
                                                self.time)

def encode(accessRequest):
    return {
        "cardNumber": accessRequest.cardNumber,
        "outcome": accessRequest.outcome,
        "roomNumber": accessRequest.roomNumber,
        "timestamp": accessRequest.time
    }
def decode(document):
    return AccessRequest(
                cardNumber=document["cardNumber"],
                roomNumber=document["roomNumber"],
                outcome=document["outcome"],
                time=document['timestamp'])


client = MongoClient('mongodb://admin:admin1234@ds018258.mlab.com:18258/savage-security')
db = client['savage-security']
ar = db.accessRequest

for x in range(50):
    my_access = AccessRequest(random.randint(100,999), random.randint(1,100), "granted" if x % 2 == 0 else "denied", datetime.datetime.now())
    ar.insert(encode(my_access))

