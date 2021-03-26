# Water-Tank-Monitor
Water Tank Monitor as part of HCI MSc

Application Setup

This application requires you to have connected an ultrasonic distancing sensor microbit over bluetoooth.  

To do this follow these steps to get the Pi to listen to Eddystone Beacons:

1. Initialize npm:

npm init -y

2. Make your pi listen to Eddystone beacons:

npm i -s @abandonware/eddystone-beacon-scanner

3. Give the programme access to bluetooth:

sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

The application should now connect to the micro:bit successfully. 
The micro:bit makecode will require the eddystone bluetooth extension and the sonar extension to measure distances using a HC-SR04 ultrasonic component.

If you would like to use the LED hat on the Pi to see that the bluetooth pairing is working correctly you will need to use the sense-hat-led package:

npm i -s sense-hat-led

If you are on a raspberry pi you will need to have node to run this programme. You should check that you have the latest installation:

nvm install --lts
nvm use --lts

Thank you. The programme itself is quite simple but will display the volume of a water tank based on distances in centimetres from the micro:bit. Feel free to play around with the rectangular tank's measurements to test the application.

Author @Jason Baxter
Date Published: 26/03/2021









