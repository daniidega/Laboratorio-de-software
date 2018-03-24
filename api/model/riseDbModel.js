var dbConnection = require('../dbConnection/riseDbConnection'),
    pool = dbConnection();

/**
 * Devuelve la información de las llaves de integración de las tiendas de vtex.
 * Esta información se filtra de acuerdo a la tienda que se quiera consultar.
 * 
 * @param {String} accountName 
 * @param {Function} callback función para devolver la información 
 */
exports.consultarTabla = function(accountName, callback){
    try {
        pool.getConnection(function(err, connection){
            connection.connect(function(error){
                if(!error){
                    console.log("Base de datos conectada");
                }else{
                    console.log("Error al conectarse en la base de datos    ");
                }
            });
    
            connection.query('SELECT 1', function (error, results, fields) {
                if (error){
                    try {
                        console.log("validando el error ...");
                    } catch (error) {
                        console.log("Error en la consulta QUERY", error);
                    }
                }
              });
            connection.query("SELECT * FROM  `tiendasVtex` WHERE  `nombre_cuenta` = '"+accountName+"'", (error, result, fields)=>{
                connection.release();
                if (error) {                                 
                    console.log("QUERY ERROR: ", error);
                    callback(null,error);

                } else {
                    callback(null, result);                
                }
            });     
        });           
    } catch (error) {
        console.log("Error al ejecutar la consulta", error);
    }    
};




