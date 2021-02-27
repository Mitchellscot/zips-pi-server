const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');

function imageWatcher() {
    let imageUrl = '';
    //bring in s3 bucket
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
    );

    //identify the path of the photos
    const path = "/home/mitch/Pictures/motion";

    //watch to see if any are created, if they are created, do the following actions

        fs.watch(path, async (eventType, filename) => {

            //full name and path of the image created
            const nameAndPath = path + "/" + filename

            //if it exists, do the following
            if (fs.existsSync(nameAndPath)) {

                //get contents of the file
                const fileContent = await fs.readFileSync(nameAndPath);

                //upload parameters
                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: filename,
                    Body: fileContent,
                    ContentType: "image/jpeg"
                }

                //this part is still being sorted
                let uploadPromise = s3.upload(params).promise();
                return uploadPromise.then(function (data) {
                    console.log('Success', data.Location);

                    //after uploading the file, delete the image
                    fs.unlink(`/home/mitch/Pictures/motion/${filename}`, (err) => {
                        if (err) throw err;
                    })

                    //post the image to the database (will need to update this URL later)
                    axios.post("http://192.168.0.78:5000/api/image", {
                        url: imageUrl
                    }).then((response) => {
                        console.log(`response from the post: ${response.data}`);
                    }).catch((error) => {
                        console.log(`error making the post to the DB: ${error}`)
                    })


                }).catch(function (err) {
                    console.log(err);
                });
            }


        });
    }

    module.exports = imageWatcher;