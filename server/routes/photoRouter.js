const express = require('express');
const router = express.Router();
const { exec } = require("child_process");

router.get('/', (req, res) =>{
    var date = new Date();
    let filename = date.toISOString();
    exec(`raspistill -t 500  -o /home/mitch/Pictures/motion/${filename}.jpg`, (error, stdout, stderr)=>{
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