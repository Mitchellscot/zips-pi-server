const express = require('express');
const router = express.Router();
const { exec } = require("child_process");
const cors = require('cors');

router.get('/', cors(), (req, res) =>{
    var date = new Date();
    let filename = date.toISOString();
    exec(`raspistill -o /home/mitch/Pictures/motion/${filename}.jpg -w 2592 -h 1944 -ex antishake -t 1000 --ISO 100 -br 40`, (error, stdout, stderr)=>{
        if (error){
            console.log(`error: ${error.message}`);
            return
        }
        if (stderr){
            console.log(`stderr: ${stderr}`);
            return;
        }
        if (stdout)
        {
            console.log(`stdout: ${stdout}`);
        }
    });
    res.sendStatus(200);
})

module.exports = router;
