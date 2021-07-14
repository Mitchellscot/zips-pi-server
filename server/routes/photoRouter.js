const express = require('express');
const router = express.Router();
const { exec } = require("child_process");
const cors = require('cors');
const getFileName = require('../modules/filename');
var whiteList = ['https://bzt-photos.herokuapp.com', undefined];
const corsOptions = {
  origin: function (origin, callback){
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed!'));
    }
  },
  optionsSucessStatus: 201
};

router.get('/', cors(corsOptions), (req, res) =>{
    const fileName = getFileName();
    exec(`raspistill -o /home/mitch/Pictures/motion/${fileName}.jpg -w 2592 -h 1944 -ex antishake -t 1000 --ISO 100 -br 40`, (error, stderr)=>{
        if (error){
            console.log(`error: ${error.message}`);
            res.sendStatus(500);
            return
        }
        if (stderr){
            console.log(`stderr: ${stderr}`);
            res.sendStatus(500);
            return;
        }
    });
    res.sendStatus(200);
})

module.exports = router;
