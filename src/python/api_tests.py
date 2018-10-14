#!/usr/bin/env python
import requests
import socket
base = "http://localhost:5000"

def build_url(path):
    """
    Extends base url with the full path of the api
    :param str path: Path of the api request
    :returns str:
    """
    return base + path
API_ENTRY_authorize_door = build_url("/api/authorizeDoor/{}/{}") # Card, Room

def ignore_server_is_alive():
    """Check to see if the port of the server can be reached"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    usable_server = base
    if "://" in usable_server:
        usable_server = usable_server.split("://")[1]

    url, port = usable_server.split(':')
    result = sock.connect_ex((url, int(port)))
    sock.close()
    assert result == 0 # Check that the port is open, 0 = Open

# At the moment, the server will grant access to Card Number: 729
def test_authorize_door_granted():
    """
    Check the authorizeDoor api for an access granted entry.
    Expected outcome: 1
    """
    result = requests.get(API_ENTRY_authorize_door.format("CB06.01.01", "729")).content
    assert result == "1"

def ignore_authorize_door_denied():
    """
    Check the authorizeDoor api for a denied entry.
    Expected outcome: 0
    """
    result = requests.get(API_ENTRY_authorize_door.format("-1", "-1")).content
    assert result == "0"

if __name__ == "__main__":
    print("Instructions on how to run this file:")
    print("Execute nosetests on this file")
    print("This package can be installed with \'pip install nose\'")
    print("This file expects the server to be running")