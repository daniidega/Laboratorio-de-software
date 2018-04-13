var express = require('express'),
    routes = require('./api/routes/masterDataRoutes')
    morgan = require('morgan'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(morgan("dev"));

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
routes(app);

/**
 * Muestra el puerto de escucha del servidor
 */
app.listen(port, function () {
    console.log('Rise server listen on port: ' + port);
});
