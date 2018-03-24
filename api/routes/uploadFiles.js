const Converter = require("csvtojson").Converter;
const fileUpload = require('express-fileupload');
const router = require('express').Router();

var converter = new Converter({});

router.post('/upload', (req,res)=>{
    var sampleFile = req.files.foo;
    var fileName = sampleFile.name;

    sampleFile.mv("./uploads/"+fileName, function(err) {
        if (err){
            console.log(err);
            res.json({"response": res.status(500)});
            res.send(err);
            res.end("response");
        } else {
            res.json({ "response: ":"200"});
            res.send('File uploaded!');
            res.end("response");
        }                    
    });
});