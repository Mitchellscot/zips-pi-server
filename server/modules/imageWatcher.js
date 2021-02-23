const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

function imageWatcher() {
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
    );
    const path = "/home/mitch/Pictures/motion";
    fs.watch(path, (eventType, filename) => {
        const nameAndPath = path + "/" + filename
        if (fs.existsSync(nameAndPath)) {
            const fileContent = fs.readFileSync(nameAndPath);
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: filename,
                Body: fileContent,
                ContentType: "image/jpeg"
            }
            var putObjectPromise = s3.upload(params).promise();
            putObjectPromise.then(function(data) {
                let imageUrl = data.Locationl
                console.log('Success', imageUrl);
                fs.unlink(`/home/mitch/Pictures/motion/${filename}`, (err) => {
                    if (err) throw err;
                })
              }).catch(function(err) {
                console.log(err);
              });    
        }
    });
}




module.exports = imageWatcher;