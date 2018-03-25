var express = require('express'),
    routes = require('./api/routes/masterDataRoutes')
    morgan = require('morgan'),
    app = express(),
    fileUpload = require('express-fileupload'),
    Converter = require("csvtojson").Converter,
    converter = new Converter({}),
    port = process.env.PORT || 3000;


const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./api/routes/masterDataRoutes');
const port = process.env.PORT || 3000;

    fileUpload = require('express-fileupload'),
    Converter = require("csvtojson").Converter,
    converter = new Converter({}),
    

app.use(morgan("dev"));

app.use(fileUpload());
// ruta para cargar archivos
app.post('/upload', function(req, res) {
    if (req.files){

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        var sampleFile = req.files.foo,
            fileName = sampleFile.name;

        sampleFile.mv("./uploads/"+fileName, function(err) {
            if (err){
                console.log(err);
                return res.status(500).send(err);
            } else {
                res.send('File uploaded!');  
            }                    
        });

    }            
  });

  converter.fromFile("./uploads/qafacol_CP2.csv",function(err,result){
    // if an error has occured then handle it
    if(err){
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

/**
 * Carga las rutas del servidor hacia el cliente
 */
//routes(app);

/**
 * Muestra el puerto de escucha del servidor
 */
app.listen(port, function () {
    console.log('Rise server listen on port: ' + port);
});
