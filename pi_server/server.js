//serial port imports
var SerialPort = require('serialport');

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
// ========================================

var sensorRef = firebase.database();

//Set com name
var portName = '/dev/ttyUSB0';// need to find a way to look this up dynamically

//open port
var myPort = new SerialPort( portName, {
   baudRate: 9600,
 });

var Delimiter = SerialPort.parsers.Delimiter;
var parser = myPort.pipe(new Delimiter({delimiter: Buffer.from([126])}));//set how the messages are parsed
//this removes the 7e byte from the buffer all offsets are forward a byte from the documentation

var tempXbeeMessObj = {};//intailize a temporary object that will get recoreded on firebase then


//puts the serialPort into stream mode
parser.on('data',function(data){

    console.log('xbee data: ' + data);// print value send to server from xbee

    var date = new Date();//make a new Date object

    //we need to add paser.writes to a lot of theses cases
    switch (data.slice(2,3).toString('hex')) {

      var endByte = parseInt(data.slice(1,2).toString('hex'), 16);

      console.log('End Byte: ' + endByte);

      case '10':
        // Transmit Request Frame

        tempXbeeMessObj = {
          mostSigByte: data.slice(0,1).toString('hex'),
          leastSigByte: data.slice(1,2).toString('hex'),
          frameType: data.slice(2,3).toString('hex'),
          frameID: data.slice(3,4).toString('hex'),
          senderAddressLong: data.slice(4,11).toString('hex'),
          reserved: data.slice(11,13).toString('hex'),
          broadcastRadius: data.slice(13,14).toString('hex'),
          transportOptions: data.slice(14,15).toString('hex'),
          rfData: data.slice(15, endByte + 2).toString('hex'),
          checksum: data.slice(endByte + 2, endByte + 3).toString('hex'),
          timestamp: date
        }

        //do checksum here

        break;//end case frame 10


      case '90':
        //not sure the difference between 90 and 91 or this will be important later on

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

        //do checksum here

        break;//end case frame 90


      case '17':

        tempXbeeMessObj = {
          mostSigByte: data.slice(0,1).toString('hex'),
          leastSigByte: data.slice(1,2).toString('hex'),
          frameType: data.slice(2,3).toString('hex'),
          frameID: data.slice(3,4).toString('hex'),
          senderAddressLong: data.slice(4,12).toString('hex'),
          reserved: data.slice(12,14).toString('hex'),
          remoteCommandOptions: data.slice(14,15).toString('hex'),
          atCommand: data.slice(15,17).toString('hex'),
          commandParameter: data.slice(17, endByte + 2).toString('hex'),
          checksum: data.slice(endByte + 2, endByte + 3).toString('hex'),
          timestamp: date
        }

        //do checksum here

        break;//end case frame 17

      case '8B':

        tempXbeeMessObj = {
          mostSigByte: data.slice(0,1).toString('hex'),
          leastSigByte: data.slice(1,2).toString('hex'),
          frameType: data.slice(2,3).toString('hex'),
          frameID: data.slice(3,4).toString('hex'),
          destinationAddressShort: data.slice(4,6).toString('hex'),
          transmsitRetryCount: data.slice(6,7).toString('hex'),
          deliveryStatus: data.slice(7,8).toString('hex'),
          discoveryStatus: data.slice(8,9).toString('hex'),
          checksum: data.slice(9,10).toString('hex'),
          timestamp: date
        }

        //do checksum here

        break;

      case '97':

        tempXbeeMessObj = {
          mostSigByte: data.slice(0,1).toString('hex'),
          leastSigByte: data.slice(1,2).toString('hex'),
          frameType: data.slice(2,3).toString('hex'),
          frameID: data.slice(3,4).toString('hex'),
          senderAddressLong: data.slice(4,12).toString('hex'),
          reserved: data.slice(12,14).toString('hex'),
          atCommand: data.slice(14,16).toString('hex'),
          commandStatus: data.slice(16,17).toString('hex'),
          commandData: data.slice(17, endByte + 2).toString('hex'),
          checksum: data.slice(endByte + 2, endByte + 3),
          timestamp: date
        }

        //do checksum here

        break;//end case frame 97

      default:
        console.log('something went terribly wrong');
    }

    setInterval(function(){

      parser.write(Buffer.from([0x7e,'mostSigByte', 'leastSigByte', 0x10, 'frameID',
       'senderAddressLong', 'reserved', 'broadcastRadius', 'transportOptions',
       'rfData', 'checksum']));

    }, 15000);


    console.log(JSON.stringify(tempXbeeMessObj));//prints to console what is written to firebase

    function clacCheckSum(xbeeObj){
      /*TODO: This is a function that will take in an object
      read it's checksum then do the math to determine if it should
      continue with send the message or write it back to firebase
      */
    }


    // // this content writes xbee message to firebase
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



// --------------- saving the break down of different Xbee frames -------------

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

    // //list serial ports(our's will always be USB for now):
    // serialport.list(function (err, ports) {
    //   ports.forEach(function(port) {
    //     console.log(port.comName);
    //   });
    // });
