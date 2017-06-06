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

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}

function timecapsule(){
    var date=new Date();
    return date;
}

/*function setData(sensor){
 switch (sensor){
   case "Moisture":
       var data= generateData();
       if(data<3){
           var moistness="Dry";
            sensorRef.ref("/Sensors/"+ sensor).set({
            Moisture: moistness
            });
       }
       else if(data>=3&&data<7){
           var moistness="Damp";
            sensorRef.ref("/Sensors/"+ sensor).set({
            Moisture: moistness
            });
       }
       else if(data>=7){
           var moistness="Mud";
            sensorRef.ref("/Sensors/"+ sensor).set({
            Moisture: moistness
            });
       }
       break;
     
    case "pH":
        var data= generateData();
       if(data<3){
           var balance="Basic";
            sensorRef.ref("/Sensors/"+ sensor).set({
            pH: balance
            });
       }
       else if(data>=3&&data<7){
           var balance="Neutral";
            sensorRef.ref("/Sensors/"+ sensor).set({
            pH: balance
            });
       }
       else if(data>=7){
           var balance="Acidic";
            sensorRef.ref("/Sensors/"+ sensor).set({
            pH: balance
            });
       }
       break;
      
    case "nutrient":
        var data= generateData();
       if(data<3){
           var food="Hungry";
            sensorRef.ref("/Sensors/"+ sensor).set({
            Nutrient: food
            });
       }
       else if(data>=3&&data<7){
           var food="Well Fed";
            sensorRef.ref("/Sensors/"+ sensor).set({
            Nutrient: food
            });
       }
       else if(data>=7){
           var food="STUFFED!!!";
            sensorRef.ref("/Sensors/"+ sensor).set({
            Nutrient: food
            });
       }
       break;
        
        case "light":
            var data= generateData();
            if(data<5){
                var lightness="No light";
                sensorRef.ref("/Sensors/"+ sensor).set({
                Light: lightness
                });
            }
            else if(data>=5){
                var lightness="In light";
                sensorRef.ref("/Sensors/"+ sensor).set({
                Light: lightness
                });
            }
            break;
        default:
            break;
 }
  
}


function PiTick(){
  setData("Moisture");
  setData("pH");
  setData("nutrient");
  setData("light");
}

setInterval(PiTick,10000);*/
console.log("The date and time is "+ timecapsule());
