#! /usr/bin/python

"""
receive_samples.py

By Paul Malmsten, 2010
pmalmsten@gmail.com

This example continuously reads the serial port and processes IO data
received from a remote XBee.
"""

from xbee import XBee
from xbee.digimesh import DigiMesh
import serial

PORT = '/dev/ttyUSB0'
BAUD_RATE = 9600

# Open serial port
ser = serial.Serial(PORT, BAUD_RATE)

# Create API object
xbee = DigiMesh(ser)

#def printData(data):
#    print(str(data), ":", int(response[str(data)].encode('hex')))

# Continuously read and print packets
while True:
    try:
        response = xbee.wait_read_frame()
        #printData(digital_samples)

        #print(int(response['analog_samples'].encode('hex')))
        print(int(response['analog_samples'].encode('hex'),16))

        #print response
        #print(hex(ord(response['analog_samples'])))
        
    except KeyboardInterrupt:
        break
        
ser.close()



