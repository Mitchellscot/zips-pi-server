const express = require('express');
const router = express.Router();
//if you decide to add a database later...
//const pool = require('../modules/pool');

router.get('/', (req, res) =>{
    let response = "Hello Mitchell";
    res.send(response);
})

module.exports = router;