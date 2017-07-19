//xbee-api connection
var xbee_api = require('xbee-api');
var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI();

//serial port imports
var SerialPort = require('serialport');
//var SerialPort = serialport.SerialPort;

//firebase connection

var firebase = require("firebase");

var usb = require('usb');

var config = {
    apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
    authDomain: "smart-garden-ca02a.firebaseapp.com",
    databaseURL: "https://smart-garden-ca02a.firebaseio.com",
    projectId: "smart-garden-ca02a",
    storageBucket: "smart-garden-ca02a.appspot.com",
    messagingSenderId: "269607227081"
  };
  firebase.initializeApp(config);


var userID = 'LaZTsgde9AWuHxRfmS5Y75QZSge2';

console.log(usb.getDeviceList());

var sensorRef = firebase.database();

// list serial ports(our's will always be USB for now):
// serialport.list(function (err, ports) {
//   ports.forEacdh(function(port) {
//     console.log(port.comName);
//   });
// });

//open serialport
var portName = '/dev/ttyUSB0';// need to find a way to look this up dynamically

// console.log(SerialPort);

var myPort = new SerialPort( portName, {
   baudRate: 9600,
 });

 //serialPorts
 var Delimiter = SerialPort.parsers.Delimiter;// instance of the serail port delimiter object

 var parser = myPort.pipe(new Delimiter({delimiter: Buffer.from([126])}));//set how the messages are parsed

var tempXbeeMessObj = {};

//126 is 7e, the delimiters, as an integer
parser.on('data',function(data){
    // console.log(data);
    var date = new Date();

    tempXbeeMessObj = {
      mostSigByte: data.slice(0,1).toString('hex'),
      leastSigByte: data.slice(1,2).toString('hex'),
      frameType: data.slice(2,3).toString('hex'),
      senderAddressLong: data.slice(3,11).toString('hex'),
      senderAddressShort: data.slice(11,13).toString('hex'),
      receiveOptions: data.slice(13,14).toString('hex'),
      numberOfSamples: data.slice(14,15).toString('hex'),
      digitalChannelMask: data.slice(15,17).toString('hex'),
      analogChannelMask: data.slice(17,18).toString('hex'),
      digitalSample: parseInt(data.slice(18,20).toString('hex'), 16),
      sensorData: parseInt(data.slice(20,22).toString('hex'), 16),
      checksum: data.slice(22,23).toString('hex'),
      timestamp: date
    }


    console.log(JSON.stringify(tempXbeeMessObj));

    try{
      sensorRef.ref('Users/'+ userID + '/Current/Sensors/'+ tempXbeeMessObj.senderAddressLong).set({
        data: tempXbeeMessObj.sensorData,
        icon: 'opacity',
        id: tempXbeeMessObj.senderAddressLong,
        title: 'Moisture Sensor 1',
        type: 'moisture',
      });

      sensorRef.ref('Users/'+ userID + '/History/Sensors/'+ tempXbeeMessObj.senderAddressLong + '/' + tempXbeeMessObj.timestamp).set({
        data: tempXbeeMessObj.sensorData
      });// this will be changed later on to that data it archived from firebase to firebase
    } catch(err){
      console.log(err.toString());
    }


    // console.log('MSB: ' + data.slice(0,1).toString('hex'));//from raw byte to hex string to int
    // console.log('LSB: ' + data.slice(1,2).toString('hex'));
    // console.log('Frame Type: ' + data.slice(2,3).toString('hex'));
    // console.log('64-Bit sender Address: ' + data.slice(3,11).toString('hex'));
    // console.log('16-Bit sender Address: ' + data.slice(11,13).toString('hex'));
    // console.log('Receive Options: ' + data.slice(13,14).toString('hex'));
    // console.log('Number of Samples: ' + data.slice(14,15).toString('hex'));
    // console.log('Digital Channel Mask: ' + data.slice(15,17).toString('hex'));
    // console.log('Analog Channel Mask: ' + data.slice(17,18).toString('hex'));
    // console.log('Digital Sample (if included): ' + parseInt(data.slice(18,20).toString('hex'), 16));
    // console.log('Sensor Data: ' + parseInt(data.slice(20,22).toString('hex'), 16));
    // console.log('Checksum: ' + data.slice(22,23).toString('hex'));
});
