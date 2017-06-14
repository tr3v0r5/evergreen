var Blynk = require('blynk-library');

var AUTH = '080eaaa562b2486f9057613f682b00ca';

var blynk = new Blynk.Blynk(AUTH, options = {
  connector : new Blynk.TcpClient()
});

var v1 = new blynk.VirtualPin(1);
var v9 = new blynk.VirtualPin(9);
var fs = require("fs");

v1.on('write', function(param) {
  console.log('V1:', param[0]);
fs.writeFile('input.txt',param[0], function(err) {
  if (err) {
	return console.error(err);
  }
  //console.log("data written");
  fs.readFile('input.txt',function (err, data) {
    if (err) {
	return console.error(err);
    }
   // console.log("Async read: " + data.toString());
  });
});


  
});

setInterval(function() {
  fs.open('moisture.txt', 'r', function(err, fd) {
    if (err) {
       return console.error(err);
   }
   fs.readFile('moisture.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      blynk.virtualWrite(9, data);	
      //console.log('V9:', data);
  });
});
}, 2000);

