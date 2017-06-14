#! /usr/bin/python

from xbee import XBee
from xbee.digimesh import DigiMesh
import serial
from time import sleep

ser = serial.Serial('/dev/ttyUSB0', 9600)
xbee = DigiMesh(ser)

lastMoisture= "null"
lastToggle = "null"

def on():
    xbee.remote_at(
      dest_addr_long='\x00\x13\xA2\x00\x40\xF7\xBD\xEA',
      command='D1',
      parameter='\x05')
    print("led pin is high")
    return

def off():
    xbee.remote_at(
      dest_addr_long='\x00\x13\xA2\x00\x40\xF7\xBD\xEA',
      command='D1',
      parameter='\x04')
    print("led pin is low")
    return

# Continuously read and print packets
while True:
    try:
        response = xbee.wait_read_frame()        
        responseType = response['id']
        #print response
        
        if responseType == 'io_rx':
            moistureValue = str(int(response['analog_samples'].encode('hex'),16))
            #if moistureValue != lastMoisture:
            lastMoisture=moistureValue
            moisture = open('moisture.txt', "w")
            moisture.write(moistureValue)
            moisture.close()
            print moistureValue
        togglefile = open('input.txt', "r")
        toggle=togglefile.read()
       
        #print toggle
        if toggle != lastToggle:
            lastToggle = toggle
            if toggle == "1":
                on()
            else:
                off()
            togglefile.close()
        
        #print(int(response['analog_samples'].encode('hex'),16))
        
    except KeyboardInterrupt:
        break
        
ser.close()
