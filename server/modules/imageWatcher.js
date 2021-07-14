const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const path = "/home/mitch/Pictures/motion";

function imageWatcher() {
    let imageUrl = '';
    const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: 'us-east-2'
    });

    fs.watch(path, async (eventType, filename) => {

        const nameAndPath = path + "/" + filename

        if (fs.existsSync(nameAndPath)) {

            const fileContent = fs.readFileSync(nameAndPath);

            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: filename,
                Body: fileContent,
                ContentType: "image/jpeg",
                ACL: 'public-read'
            }

            s3.upload(params, async (error, data) => {
                try {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(data.Location);
                        let url = data.Location;
                        if (imageUrl !== url && url.endsWith(".jpg")) {
                            imageUrl = url;
                            await axios.post("http://bzt-photos.herokuapp.com/api/image", {
                                url: data.Location
                            }).then((response) => {
                                console.log(`${response.data}`);
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
