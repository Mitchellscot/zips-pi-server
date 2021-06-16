const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const { info } = require('console');

function imageWatcher() {
    let imageUrl = '';
    //bring in s3 bucket
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    });
    s3.config.update({ region: 'us-east-2' });
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
                ContentType: "image/jpeg",
                ACL: 'public-read'
            }
            //upload file
            s3.upload(params, async (error, data) => {
                try {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(data.Location);
                        let url = data.Location;
                        //post to the database when callbacks are done
                        if (imageUrl !== url && url.endsWith(".jpg")) {
                            imageUrl = url;
                            await axios.post("http://192.168.1.67:5000/api/image", {
                                url: data.Location
                            }).then((response) => {
                                console.log(`response from the post: ${response.data}`);
                                /*fs.unlink(`/home/mitch/Pictures/motion/${filename}`, (err) => {
                                if (err) {
                                console.log(err);
                                }
                            })*/
                            }).catch((error) => {
                                console.log(`error making the post to the DB: ${error}`)
                            })
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            })
        }
    });
}

module.exports = imageWatcher;
