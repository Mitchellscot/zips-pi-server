require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

const photoRouter = require('./routes/photoRouter');
const imageWatcher = require('./modules/imageWatcher');

imageWatcher();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/photos', photoRouter);

app.listen(PORT, ()=>{
	console.log('listening on port', PORT);
})

