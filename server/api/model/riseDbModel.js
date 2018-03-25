var dbConnection = require('../dbConnection/riseDbConnection'),
    connection = dbConnection();

/**
 * Devuelve la información de las llaves de integración de las tiendas de vtex.
 * Esta información se filtra de acuerdo a la tienda que se quiera consultar.
 * 
 * @param {String} accountName 
 * @param {Function} callback función para devolver la información 
 */
exports.consultarTabla = function(accountName, callback){
    try {           
        connection.query("SELECT * FROM  `tiendasVtex` WHERE  `nombre_cuenta` = '"+accountName+"'", (error, result, fields)=>{
            if (error) {                             
                try { throw error;} 
                catch (error) {
                    console.log("Error: " + error);
                    callback(error, null);
                }
            } else {
                callback(null, result);                
            }
        });  
        //connection.end(); 
    } catch (error) {
        console.log("Error al ejecutar la consulta", error);
    }    
};




