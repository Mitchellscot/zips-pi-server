require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;
const cors = require('cors');
app.use(cors());
const https = require('https');
const fs = require('fs');

var key = fs.readFileSync('/home/mitch/zips.key');
var cert = fs.readFileSync('/home/mitch/zips.crt');
var options = {
	key: key,
	cert: cert
};

const photoRouter = require('./routes/photoRouter');
const imageWatcher = require('./modules/imageWatcher');

imageWatcher();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/photos', photoRouter);

var server = https.createServer(options, app);

server.listen(PORT, ()=>{
	console.log('listening on port', PORT);
});

