//serial port imports
var SerialPort = require('serialport');
//var SerialPort = serialport.SerialPort;

//firebase connection
var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
    authDomain: "smart-garden-ca02a.firebaseapp.com",
    databaseURL: "https://smart-garden-ca02a.firebaseio.com",
    projectId: "smart-garden-ca02a",
    storageBucket: "smart-garden-ca02a.appspot.com",
    messagingSenderId: "269607227081"
  };
  firebase.initializeApp(config);

//temproary connection between firebase user and server
var userID = 'LaZTsgde9AWuHxRfmS5Y75QZSge2';

var sensorRef = firebase.database();

// list serial ports(our's will always be USB for now):
// serialport.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//   });
// });

//Set com name
var portName = '/dev/ttyUSB0';// need to find a way to look this up dynamically

//open port
var myPort = new SerialPort( portName, {
   baudRate: 9600,
 });

var Delimiter = SerialPort.parsers.Delimiter;
var parser = myPort.pipe(new Delimiter({delimiter: Buffer.from([126])}));//set how the messages are parsed
//this removes the 7e byte from the buffer all offsets are forward a byte from the documentation

var tempXbeeMessObj = {};

parser.on('data',function(data){

    console.log('xbee data: ' + data);

    var date = new Date();

    if(data.slice(2,3).toString('hex') == '90' ){
      //receive packet

      var endByte = parseInt(data.slice(1,2).toString('hex'), 16);

      console.log('End Byte: ' + endByte);

      //calculate checksum value: TODO

      tempXbeeMessObj = {
        mostSigByte: data.slice(0,1).toString('hex'),
        leastSigByte: data.slice(1,2).toString('hex'),
        frameType: data.slice(2,3).toString('hex'),
        senderAddressLong: data.slice(3,11).toString('hex'),
        reserved: data.slice(11,12).toString('hex'),
        receiveOptions: data.slice(13,14).toString('hex'),
        data: data.slice(14, endByte + 2).toString('hex'),
        checksum: data.slice(endByte + 2, endByte + 3).toString('hex'),
        timestamp: date
      }
    }

    // tempXbeeMessObj92 = {
    //   mostSigByte: data.slice(0,1).toString('hex'),
    //   leastSigByte: data.slice(1,2).toString('hex'),
    //   frameType: data.slice(2,3).toString('hex'),
    //   senderAddressLong: data.slice(3,11).toString('hex'),
    //   senderAddressShort: data.slice(11,13).toString('hex'),
    //   receiveOptions: data.slice(13,14).toString('hex'),
    //   numberOfSamples: data.slice(14,15).toString('hex'),
    //   digitalChannelMask: data.slice(15,17).toString('hex'),
    //   analogChannelMask: data.slice(17,18).toString('hex'),
    //   digitalSample: parseInt(data.slice(18,20).toString('hex'), 16),
    //   sensorData: parseInt(data.slice(20,22).toString('hex'), 16),
    //   checksum: data.slice(22,23).toString('hex'),
    //   timestamp: date
    // }


    console.log(JSON.stringify(tempXbeeMessObj));

    // try{
    //   sensorRef.ref('Users/'+ userID + '/Current/Sensors/'+ tempXbeeMessObj.senderAddressLong).set({
    //     data: tempXbeeMessObj.sensorData,
    //     icon: 'opacity',
    //     id: tempXbeeMessObj.senderAddressLong,
    //     title: 'Moisture Sensor 1',
    //     type: 'moisture',
    //   });
    //
    //   sensorRef.ref('Users/'+ userID + '/History/Sensors/'+ tempXbeeMessObj.senderAddressLong + '/' + tempXbeeMessObj.timestamp).set({
    //     data: tempXbeeMessObj.sensorData
    //   });// this will be changed later on to that data it archived from firebase to firebase
    // } catch(err){
    //   console.log(err.toString());
    // }

    });
