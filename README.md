# Zipline Image Photo System (ZIPS) - Software for Raspberry Pi

## Description

This is the software that runs on the Raspberry Pi for the ZIPS application [See the main repo](https://github.com/Mitchellscot/ZIPS) or [view the demo](https://www.youtube.com/watch?v=Ei-ZUtdrTKw)

In addition to this express server, the motion software would run as well to take pictures on motion detection. This software does a few basic things. when motion is detected, it takes a photo and adds it to a folder, then it takes that photo and uploads it to AWS, and then posts the URL to a database for the main website to use.

### Prerequisites

A Raspberry Pi HQ Camera, Raspberry Pi computer

- [Node.js](https://nodejs.org/en/)
- [Motion](https://motion-project.github.io/)
- [Raspberry Pi OS](https://www.raspberrypi.org/)

## Usage

1. Edit the motion.conf file to detect motion based on your location. The process for doing this is beyond the scope of this readme but you can view the docs [here](https://motion-project.github.io/motion_guide.html)
2. Create a folder on your Raspberry Pi ~/Pictures/motion
3. cd to the project folder and type 'npm start' to run the server
4. start motion either with 'sudo motion' or in daemon mode
5. optionally you can run a chron job to delete photos on the pi every hour or so

## Support
If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)
