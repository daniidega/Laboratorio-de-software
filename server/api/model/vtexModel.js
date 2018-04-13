/**
 * Crea la configuración con las llaves de integración de las tinedas
 * Envía el api_key y el api_token
 * 
 * @param {Data Base row} data 
 */
exports.headers = function(data){
    var jsonHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/vnd.vtex.ds.v10+json",
            "x-vtex-api-appKey": data[0].api_key,
            "x-vtex-api-appToken": data[0].api_token
    }
    return jsonHeaders;
};