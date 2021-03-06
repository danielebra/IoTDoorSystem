#include <Wire.h>
#include <SPI.h>
#include <WiFi.h>
#include <NeoPixelBus.h>
#include <Adafruit_PN532.h>
#include "secrets.h"
#include <Servo.h>

#define PN532_SCK  (2)
#define PN532_MOSI (3)
#define PN532_SS   (4)
#define PN532_MISO (5)

#define PN532_IRQ   (2)
#define PN532_RESET (3)

const int GRANTED = 1;
const int DENIED = 0;
const int FAILED = -1;

Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET);

const uint16_t PixelCount = 1; // this example assumes 4 pixels, making it smaller will cause a failure
const uint8_t PixelPin = 5;  // make sure to set this to the correct pin, ignored for Esp8266

const char *wifi_ssid = WIFI_SSID;
const char *wifi_password = WIFI_PASSWORD;
const char *room_name = ROOM_NAME;
const char *api_path = API_PATH;
const int stepsPerRevolution = 200;
const int port = PORT;
int status = WL_IDLE_STATUS;

Servo myservo;
WiFiClient client;
IPAddress server(ips[0],ips[1],ips[2], ips[3]);
NeoPixelBus<NeoGrbFeature, Neo800KbpsMethod> strip(PixelCount, PixelPin);
RgbColor red(255, 0, 0);
RgbColor black(0);
RgbColor green(0, 255, 0);
RgbColor orange(255, 165, 0);

void setup(void) {
  Serial.begin(115200);
  Serial.println("Setting up...");
  strip.Begin();
  strip.Show();
  myservo.attach(6);
  myservo.write(0);
  SetupWifi();
  SetupNFC();
  Serial.println("Setup complete");
}
int foobar = 0;
void loop(void) {
  
  Serial.println("Setting LED");
  strip.SetPixelColor(0, orange);
  strip.Show(); 
  int cardID = readCard();
  if (cardID != 0)
  {
    String idAsString = String(cardID);
    int resp = sendRequest(idAsString);
    if (resp == GRANTED)
      openDoor();
    else if (resp == DENIED)
      rejectCard();
    else if (resp == FAILED)
      Serial.println("Received fail status"); // Put some color and audio feedback here
  }
  delay(1000);
}

int sendRequest(String msg)
{
  if (client.connect(server, port))
  {
    Serial.println("Connected to server");
    client.print("GET ");
    client.print(api_path);
    client.print(room_name);
    client.print("/");
    client.print(msg);
    client.print(" HTTP/1.0\n\n");
    String response = String("");
    while (client.connected())
    {
      delay(50);
      // block until responce, then disconnect
      while (client.available()) {
        char c = client.read();
        response.concat(c);
        //Serial.write(c);
      }      
    }
    client.stop();
    //Serial.println("Before");
    //Serial.println(response);
    response = response.substring(response.indexOf(String("\r\n\r\n")) + 4);
    //Serial.println("After");
    //Serial.println(response);
    if (response.equals("1"))
    {
      Serial.println("Card accepted");
      return GRANTED;
    }

    else
    {
      Serial.println("Card declined");
      return DENIED;
    }
    
  }
  else
  {
    Serial.println("Failed to connect to server");
    return FAILED;
  }
}
  
void SetupWifi()
{
  
  // Setup Wifi
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv != "1.1.0") {
    Serial.println("Please upgrade the firmware");
  }

  // attempt to connect to Wifi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WEP network, SSID: ");
    Serial.println(wifi_ssid);
    status = WiFi.begin(wifi_ssid, wifi_password);
    
    // wait for connection:
    delay(2000);
  }

  // once you are connected :
  Serial.print("You're connected to the network");
  printCurrentNet();
  printWifiData();
}
void SetupNFC()
{
  // Setup NFC
  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    Serial.print("Didn't find PN53x board");
    while (1); // halt
  }
  
  Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX); 
  Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC); 
  Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
  
  nfc.setPassiveActivationRetries(0xFF);
  nfc.SAMConfig();
  
  Serial.println("Waiting for a card...");
}

int readCard()
{
  boolean success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
  int val = 0;
  if (success) {
    Serial.println("Card detected!");
    Serial.print("UID Length: ");Serial.print(uidLength, DEC);Serial.println(" bytes");
    Serial.print("UID Value: ");
    
    for (uint8_t i=0; i < uidLength; i++) 
    {
      Serial.print(" 0x");Serial.print(uid[i], HEX); 
      val += uid[i];
    }
    Serial.print(" : ");
    Serial.print(val);
    Serial.println("");
  }
  else
  {
    Serial.println("Timed out waiting for a card");
  }
  return val;
}
void openDoor()
{
  tone(4, 2000, 250);
  strip.SetPixelColor(0, green);
  strip.Show();
  Serial.println("Moving motor to 90 degrees");
  myservo.write(90);
  delay(3000);
  Serial.println("Moving motor to 0 degrees");
  myservo.write(0);  
  strip.SetPixelColor(0, black);
  strip.Show();
}
void rejectCard()
{
  strip.SetPixelColor(0, red);
  strip.Show();
  Serial.println("Making tone");
  tone(4, 1000, 200);
  delay(250);
  tone(4, 1000, 500);
  Serial.println("Ending tone");
  delay(2750);
}

// WiFi Methods:

void printWifiData() {
  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print your MAC address:
  byte mac[6];
  WiFi.macAddress(mac);
  Serial.print("MAC address: ");
  Serial.print(mac[5], HEX);
  Serial.print(":");
  Serial.print(mac[4], HEX);
  Serial.print(":");
  Serial.print(mac[3], HEX);
  Serial.print(":");
  Serial.print(mac[2], HEX);
  Serial.print(":");
  Serial.print(mac[1], HEX);
  Serial.print(":");
  Serial.println(mac[0], HEX);
}

void printCurrentNet() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print the MAC address of the router you're attached to:
  byte bssid[6];
  WiFi.BSSID(bssid);
  Serial.print("BSSID: ");
  Serial.print(bssid[5], HEX);
  Serial.print(":");
  Serial.print(bssid[4], HEX);
  Serial.print(":");
  Serial.print(bssid[3], HEX);
  Serial.print(":");
  Serial.print(bssid[2], HEX);
  Serial.print(":");
  Serial.print(bssid[1], HEX);
  Serial.print(":");
  Serial.println(bssid[0], HEX);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.println(rssi);

  // print the encryption type:
  byte encryption = WiFi.encryptionType();
  Serial.print("Encryption Type:");
  Serial.println(encryption, HEX);
  Serial.println();
}
