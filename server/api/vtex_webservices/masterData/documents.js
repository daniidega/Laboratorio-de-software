var Client = require('node-rest-client').Client,
    client = new Client();

/**
 * Esta función carga la información del documento en el master data de vtex.
 * El documento se crea a partir del tipo de entidad que se desa cargar,
 * por ejemplo: para crear un documento de tipo cliente se pasa como parámetro
 * el tipo CL.
 * 
 * @param {String} cuenta nombre de la cuenta de vtex
 * @param {String} data_entity tipo de documento que se va a crear 
 * @param {Json} request solicitud hacia vtex
 * @param {Json} res respuesta de la url del servidor de node js
 * 
 */
exports.getDocument = function(cuenta,data_entity,request,res){
    client.post("https://"+cuenta+".vtexcommercestable.com.br/api/dataentities/"+data_entity+"/documents", request, 
        function (data,response){         
            console.log("Código respuesta de vtex: " + res.statusCode);
            res.json(data);  
    }).on('error',function(err){
        console.log("Hubo un error con la solicitud", err.request.options);
        console.log("Código respuesta de vtex: " + res.statusCode);
    });
};


