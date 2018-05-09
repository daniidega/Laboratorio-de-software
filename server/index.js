const express = require('express');
const app = express();
const Converter = require("csvtojson").Converter;
const converter = new Converter({});
const morgan = require('morgan');
const masterDataRoutes = require('./api/routes/masterDataRoutes');
const fileUpload = require('express-fileupload');
const riseRoutes = require('./api/routes/riseRoutes');
//const utils = require('./api/utils/utils');
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(fileUpload());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ruta para cargar archivos
app.post('/upload', function (req, res) {
  console.log(req.body);
  console.log(req.files);
  if (req.files) {

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var sampleFile = req.files.upload,
      fileName = sampleFile.name;

    sampleFile.mv("./uploads/" + fileName, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        res.send('File uploaded!');
      }
    });
  }
});

/*converter.fromFile("./uploads/qafacol_CP2.csv", function (err, result) {
  // if an error has occured then handle it
  if (err) {
    console.log("An Error Has Occured");
    console.log(err);
  }
  // create a variable called json and store
  // the result of the conversion
  var json = JSON.stringify(result);
  console.log(json);
});

/**
 * Este middleware crea un objeto json con la solicitud
 * del cliente para enviarla a las url
 */
app.use(function (req, res, next) {
  var data = "";
  req.on('data', function (chunk) {
    data += chunk
  });

  req.on('end', function () {
    req.body = data;
    next();
  });
  console.log(req.method);
  console.log("Data " + data);
});

//app.use(riseRoutes);
//masterDataRoutes(app);

app.listen(port, function () {
  console.log('Rise server listen on port: ' + port);
});
