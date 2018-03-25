const express = require('express');
const app = express();
const fileRoute = require('../../uploads/');
const fileUpload = require('express-fileupload');
const router = express.Router();

app.use(fileUpload());

module.exports = () => {

};

router.post('/upload',(req, res) => {
    if (req.fields) {
        var uploadFile = req.files.uploadFile;
        var fileName = uploadFile.name;

        uploadFile.mv('../../uploads/' + fileName, (err) => {
            if (err) {
                res.json({ 'response': res.status(500) });
                res.send(err);
                res.end('response');
            } else {
                res.send('File uploaded!');
            }
        });
    }     
});

module.exports = router;