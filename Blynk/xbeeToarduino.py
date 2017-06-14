#! /usr/bin/python

from xbee import XBee
from xbee.digimesh import DigiMesh
import serial
from time import sleep

ser = serial.Serial('/dev/ttyUSB0', 9600)
xbee = DigiMesh(ser)

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

while True:
    try:
        response = xbee.wait_read_frame()
        moisture_data = int(response['analog_samples'].encode('hex'),16)
        print(moisture_data)

        if moisture_data > 1000:
            on()
            #sleep(3)
            #off()
        else:
            off()
        #sleep(.5)
        
    except KeyboardInterrupt:
            break
