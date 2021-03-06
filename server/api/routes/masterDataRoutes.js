'use strict';

var Client = require('node-rest-client').Client,
    masterDataModel = require('../model/masterDataModel'),
    vtexHeadersConfig = require('../model/vtexModel'),
    masterDataDocument = require('../vtex_webservices/masterData/documents'),
    model = require('../model/riseDbModel'),
    vtexWebServices = require('../vtex_webservices/masterData/documents'),
    dbConnection = require('../dbConnection/riseDbConnection');

/**
 * Master Data Vtex URL'S
 * 
 * Exporta las url´s de los servicios del master data de vtex 
 * para ser utilizados al lanzar el servidor
 * 
 * @param {Function} app función de expresss para usar los verbos de envío de la url
 */
module.exports = function(app) {    

    /** 
     * Variables de conexión a la base de datos y cliente REST
    */
    var client = new Client(),
        connection = dbConnection();

    /**
     * Abre la conexión a la base de datos 
     */
    connection.connect(function(error){
        if(!error){
            console.log("Base de datos conectada");
        }else{
            console.log("Error al conectarse en la base de datos    ");
        }
    });

    /**
     * Url de prueba de consuumo del servicio
     */
    app.get('/saludo',function(req,res) {
        model.consultarTabla("patprimo",(err,data)=>{
            if (err) {
                console.log("ERROR", err);
            } else {           
                console.log(data);
                res.json({ "Respuesta: ":"200"});
                res.end("respuesta");
            }
        });
    });

    /**
     * ----------------------------------------------------------------------------------------------
     * Documents.
     * Se crean todas las con los webservices disponibles
     * ----------------------------------------------------------------------------------------------  
     */

    /**
     * Esta url crea un registro en el master data de vtex
     * de acuerdo al tipo de documento que se quiera cargar
     */
    app.post('/master_data/:data_entity_name/crear_documento', (req, res, next)=>{                                
        
        console.log("------------------------------------------------");
        console.log("CREACION DE DOCUMENTOS EN EL MASTER DATA");
        console.log("------------------------------------------------");

        try {
            var stringBody = req.body,
                json = JSON.stringify(stringBody),
                str = req.body.replace(/'/g, '"'),
                nombreCuentaVtex = JSON.parse(str).accountName;

            console.log("Request: " +"\n"+ str);
            console.log("Nombre cuenta tienda: " + nombreCuentaVtex);

            /**
             * Realiza la consulta a la base de datos para consultar las llaves
             * de integración de la tienda de
             */
            model.consultarTabla(nombreCuentaVtex,(err,result)=>{
                if (err) {
                    console.log("ERROR", err);
                } else {
                    try {
                        var headers = vtexHeadersConfig.headers(result),
                        cuenta = result[0].nombre_cuenta, // Cuenta de la tienda de vtex en la DB
                        data_entity = req.params.data_entity_name, // Define el tipo de documento que se va a crear                                                
                        request = { data: req.body, headers }; // Vtex Request

                        console.log("request: " + JSON.stringify(request) + "\n");
                        console.log("Ip: " + req.ip);
                                            
                        vtexWebServices.getDocument(cuenta,data_entity,request,res); // Carga el documento en vtex
                    } catch (error) {
                        console.log("Error al llamar el servicio de vtex: " + error);
                    }
                }
            });     
        } catch (error) {
            console.error("Error con el servicio de Rise: " + error);            
            res.end("ERROR: " + error);
        }            
    }).on('error',function(err){
        console.log("Hubo un error con la solicitud del servidor de Rise: ", err.request.options);
    });

    /**
     * 
     */
    app.get('/master_data/documento/:data_entity_name/:idDocumento', (req,res,next) => {
        var id = req.params.idDocumento,
            dataEntity = req.params.data_entity_name;

        console.log("headers" + args);
        console.log(headers);

        client.get("https://kungfudigital.vtexcommercestable.com.br/api/dataentities/"+dataEntity+"/documents/"+id, headers,
            function(data, response){    
                console.log(data);
                res.json(data);
            })
    });

    // --------------------------------------------------------------------------------------------------------------
    app.get('/master_data/documentos/:data_entity_name/:idDocumento/:all_fields', (req,res,next) => {
        var id = req.params.idDocumento,
            dataEntity = req.params.data_entity_name,
            all_fields = req.params.all_fields,
            fields = "";

        if(all_fields != null || all_fields != "" ){
            fields = "?_fields=_all";
        }

        client.get("https://kungfudigital.vtexcommercestable.com.br/api/dataentities/"+dataEntity+"/documents/"+id+ fields, args,
            function(data, response){    
                console.log(data);
                res.json(data);
            })
    });

    // ----------------------------------------------------------------------------------------------
    // Search API routes
    // ----------------------------------------------------------------------------------------------

    // List all documents by data entity
    app.get('/master_data/documentos/:data_entity_name', (req,res,next) => {
        var dataEntity = req.params.data_entity_name;
        client.get("https://kungfudigital.vtexcommercestable.com.br/api/dataentities/"+ dataEntity +"/search", args,
        function(data, response){
            console.log(data);
            res.json(data);
        })
    });
};
