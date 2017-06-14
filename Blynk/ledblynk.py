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
        file1 = open('input.txt','r')
        for line in file1:
            #print(line)
            status = int(line)
            print(status, type(status))
            
        if status == 0:
            off()
        else:
            on()
        sleep(1)
        file1.close()
    except KeyboardInterrupt:
            break
