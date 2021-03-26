/*
Author: Jason Harvey Baxter
Date: 25/03/2021
Related to MSc Human-Computer Interaction
*/

import EddystoneBeaconScanner from '@abandonware/eddystone-beacon-scanner'
import led from 'sense-hat-led'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

//LED Hat on Raspberry pi is used for troubleshooting
//and to see if the micro:bit is connected to the pi.
led.sync.clear()

const _ = [0,0,0] // RGB fully off (=black)
const X = [255,255,255] // RGB fully on (=white)
const imageSmile = [

_,_,_,_,_,_,_,_,
_,X,X,_,_,X,X,_,
_,X,X,_,_,X,X,_,
_,_,_,X,X,_,_,_,
_,_,_,X,X,_,_,_,
X,_,_,_,_,_,_,X,
_,X,_,_,_,_,X,_,
_,_,X,X,X,X,_,_,
]

led.sync.clear()

const a = [0,0,0]
const Y = [0,0,255]
const imageSad = [

a,a,a,a,a,a,a,a,
a,Y,Y,a,a,Y,Y,a,
a,Y,Y,a,a,Y,Y,a,
a,a,a,Y,Y,a,a,a,
a,a,a,a,a,a,a,a,
a,a,Y,Y,Y,Y,a,a,
a,Y,a,a,a,a,Y,a,
Y,a,a,a,a,a,a,Y,
]

const filter = [
'e9e0be89d86e' // microbit ID 
]

//Eddystone method to find the Micro:bit beacon and display smile on LED's and return info to console.
EddystoneBeaconScanner.on('found', (beacon) => {
    if (filter.join() && !filter.includes(beacon.id)) return
    console.log('Found: ' + beacon.id + ' - ' + beacon.instance);
    led.sync.setPixels(imageSmile)              
});

//links path directories and sets up the messages file name and path to save data.
const currentFolder = path.dirname(fileURLToPath(import.meta.url));
const messagesFile = path.join( currentFolder, 'public/index.html');
console.log('this is the message file ' + messagesFile);
const indextemplatehtmlFile = path.join(currentFolder, 'public/index_template.html');

//reads the template index.html file which includes a tokenised symbol and allows us to 
//save it out as an index.html file used on the website.
var content;
fs.readFile(indextemplatehtmlFile,'utf8', function (err, data) {
  if (err) {
      console.log(err);
      process.exit(1);
  }
  content = data;
});

//Eddystone method to display a sad face on LED's if the micro:bit cannot be found over bluetooth.
EddystoneBeaconScanner.on('lost', (beacon) => {
    if (filter.join() && !filter.includes(beacon.id)) return
    console.log('lost: ' + beacon.id);
    led.sync.setPixels(imageSad)
});

//'Updated' Method to return the volume of a tank as an integer value.
//Uses set tank measurements but can be tailored to different shapes.
//Replaces the %s token in the template file with the calculated volume string.
//Then writes out to a new index.html the amended html which will be used in the website.

EddystoneBeaconScanner.on('updated', (beacon) => {

  if (filter.join() && !filter.includes(beacon.id)) return

    console.log('instance value = ' + beacon.instance)
    var distance = parseInt(beacon.instance, 16);
    console.log('instance value = ' + beacon.instance)
    var volume = calculateVolume(90,150,80,distance);

    let volumeStr = 'Tank Volume is ' + volume + 'Litres'
    console.log('updated: ' + beacon.id + ' - ' + distance + ' - ' + volumeStr);

    var newstring = content.replace('%s', volumeStr);

    fs.writeFile(messagesFile, newstring,function(err) {
      console.log(volumeStr)
    });
});

EddystoneBeaconScanner.on('id', (beacon) => {
if (filter.join() && !filter.includes(beacon.id)) return
console.log('id: ' + beacon.id + ' - ' + parseInt(beacon.instance, 16));
});

//initiates the eddystone beacon scanning
EddystoneBeaconScanner.startScanning(true);

//Method to calculate volume of a water tank.
//this will work for a rectangular tank but other shapes would require different maths.
//for example, cylindrical tanks would need to account for radius & orientation.
function calculateVolume(tankHeight, tankLength,tankWidth, measuredDistance) {

  var fillHeight = tankHeight - measuredDistance;
  var tankVolume = tankLength * tankWidth * tankHeight / 1000;

  var fill = tankLength * tankWidth * fillHeight / 1000;

  return fill;
}