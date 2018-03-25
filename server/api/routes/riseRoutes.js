const fileUpload = require('express-fileupload');

module.exports = (app) => {
  app.use(fileUpload());
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  app.post('/upload', (req, res) => {
    console.log('ruta de carga');
    console.log(req.body);
    if (req.fields) {
      console.log('ruta de carga2');
      var uploadFile = req.files.uploadFile;
      var fileName = uploadFile.name;
      
      uploadFile.mv('./cargas/' + fileName, (err) => {
        if (err) {
          //res.json({ 'response': res.status(500) });
          res.send(err);
          res.end('response');
        } else {
          res.send('File uploaded!');
        }
      });
    } else {
      //res.send(res.status);
      res.send(500);
      res.end('Finaliza el servicio');
    }
  });
};