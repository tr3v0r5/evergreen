//serial port imports
var SerialPort = require('serialport');
//var SerialPort = serialport.SerialPort;



//list serial ports(our's will always be USB for now):
// serialport.list(function (err, ports) {
//   ports.forEacdh(function(port) {
//     console.log(port.comName);
//   });
// });


var portName = 'dev/ttyUSB0';

var myPort = new SerialPort( portName, {
   baudRate: 9600,
 });

var Delimiter = SerialPort.parsers.Delimiter;// instance of the serail port delimiter object

var parser = myPort.pipe(new Delimiter({delimiter: Buffer.from([126])}));

//start of building the frame to broadcast

frameBuilder(data){
  //depending on the frame type select

}
