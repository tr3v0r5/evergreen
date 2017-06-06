//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//


//firebase connection

var firebase = require("firebase");
var Timer = require("timers");

var config = {
    apiKey: "AIzaSyDIQMP6yMBrKuwDvtRaSmhwYMMZC3FyqpY",
    authDomain: "smart-garden-ca02a.firebaseapp.com",
    databaseURL: "https://smart-garden-ca02a.firebaseio.com",
    projectId: "smart-garden-ca02a",
    storageBucket: "smart-garden-ca02a.appspot.com",
    messagingSenderId: "269607227081"
  };
  firebase.initializeApp(config);


var sensorRef = firebase.database(); 


function generateData(){
  //this generates fake data to be sent to firebase
  return Math.random() * 10;
}


function setData(sensor){
  var valveStatus = 0;
  var data = generateData();
  // console.log(data);
   sensorRef.ref("/Sensors/"+ sensor).set({
            valveStatus: valveStatus,
            sensorData: data
            });
  
}


function PiTick(){
  setData("sensor1");
  setData("sensor2");
  setData("sensor3");
  setData("sensor4");
}

setInterval(PiTick,10000);

