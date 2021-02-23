const fs = require('fs');
const AWS = require('aws-sdk');


function imageWatcher() {
    const s3 = new AWS.S3({
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
    }

    );
    const path = PATH;
    fs.watch(path, (eventType, filename) => {
        const nameAndPath = path + "/" + filename
        if (fs.existsSync(nameAndPath)) {
            const fileContent = fs.readFileSync(nameAndPath);
            const params = {
                Bucket: BUCKET_NAME,
                Key: filename,
                Body: fileContent,
                ContentType: "image/jpeg"
            }
            s3.upload(params, (error, data) => {
                if (error) {
                    throw error;
                }
                console.log(`Image store in this url ${data.Location}`);
            }).then(
                fs.unlink(`/home/mitch/Pictures/motion/${filename}`, (err) => {
                    if (err) throw err;
                })
            )

        }
    });
}

module.exports = imageWatcher;