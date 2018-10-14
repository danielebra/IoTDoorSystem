# SavageSecurity

Software Engineering Practice Project.
IoT Door Opener
# References

## Flex

	https://css-tricks.com/snippets/css/a-guide-to-flexbox/


# Python

The following is an overview of the files within the `/src/python/` directory.
## api_tests.py

This is used for unit testing.

### Usage

	nosetests api_tests.py

## create_entries.py

This was used to populate the database with mockdata during the development process. This was important for testing and identifying edge cases such as issues with time formatting and time zones.

## schema_poc.py

This was used as a proof of concept to determine the feasability of creating a backend in `python` instead of `node`. This file creates an object and adds it to the database and pulls it back and reproduces it as a usable object.

## server.py

This is used to host a server locally that can give a response to the `arduino` based on what card is provided to the `/auth` route entry point. This critical in building a rapid prototype of the end-to-end communication between a `server` and `arduino`.

### Usage

	python server.py

# SSWebApp

The Web Application is broken down into two parts. The `server` and the `client`.

1. Server

	The server lives in the `/src/SSWebApp/` folder and can be executed with 
		
		npm run server

2. Client

	The client lives in the `/src/SSWebApp/client/` folder and can be executed with 
	
		npm run start
	
## Install dependencies

	
	cd src/SSWebApp/
	npm install
	cd client
	npm install
	


## Run dev environment

	cd src/SSWebApp/
	npm run dev

## Common Issues

There are some issues when executing the server and client from command line and utilising VSCode as the editing environment. `vscode` and `nodemon` utilise the same method of watching for files. It is important to note that when running `vscode` first, it will conflict with nodemon being run out of the vscode instanse. There are two main soltions for this problem.

1. Execute the server and client before starting the `vscode` instanse
2. Execute the server and client from within the `vscode` terminal 

Alternatively, this can be bypassed by not running these services with `nodemon` but rather just `node`.
A more indepth solution can be to run the two services on different listening ports for file watching, however this is unnesseracy for the scope of this potential issue.

# Arduino

## Software

The `arduino` software is located in `/src/arduino`. There is one primary file `basic_nfc.ino`. This depends on a secondary file named `secrets.h` which is not exposed in this repository.

### secrets.h

This file is used to pass information to the `arduino` that may change per deployment environment. For example, when deploying this system to multiple physical buildings. The `arduino` may use different wifis and servers. These changes all occur in the `secrets.h` file. This acts as the configuration file.

#### Template

	#define WIFI_SSID "{$SSID}"
	#define WIFI_PASSOWRD "{$PASSWORD}"
	#define ROOM_NAME "{$ROOM_NAME}"
	int ips[] = {$IP1, $IP2, $IP3, $IP4};

An example of this:

	#define WIFI_SSID "SSecurity"
	#define WIFI_PASSWORD "SSPassword"
	#define ROOM_NAME "Room1"
	int ips[] {192, 168, 1, 1};
## Dependencies

The arduino IDE may required these to compile the software. Install them by going to:

    Sketch --> Incluide Library --> Manage Libraries... --> {Search for depedency}

### NFC Sensor

[Adafruit PN532 By Adafruit v1.0.0](https://github.com/adafruit/Adafruit-PN532)

### Motor

[Stepper_28BYJ_48 by Thomas O Fredericks v1.0.0](https://github.com/thomasfredericks/Stepper_28BYJ_48/)
