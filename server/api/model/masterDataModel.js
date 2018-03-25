// ---------------------------------------------------------------------------------------------------------
// | Crea los modelos de datos para ser enviados hacia los servicios web de vtex desde el cliente
// | 
// |
// |
// |
// |
// ---------------------------------------------------------------------------------------------------------

exports.encabezado = {    
    headers: { 
        "Content-Type": "application/json",
        "Accept": "application/vnd.vtex.ds.v10+json",
        "x-vtex-api-appKey": "vtexappkey-kungfudigital-TTNBVW",
        "x-vtex-api-appToken": "PDAGPYMUPHSOEBSNASTAHTDEMKCUQYEQUIRXJQCVDDNWPNDPVQXTWQXWAVTEWSDQCBTVKVDJPXWEFGPZHMZAALUDLUWOWXZKZWUNTIFAMNDYUSQUFUXJTDPQGQKPYPNR"        
    }
};

exports.body = function(name){
    console.log("Holaaaa !!!!" + name);
};

/**
 * Crea la configuración de las llaves de integración de las tiendas de vtex
 * @param {*} apiKey 
 * @param {*} apiToken 
 */
exports.headers = function(apiKey,apiToken){
    var headers ={ 
        "Content-Type": "application/json",
        "Accept": "application/vnd.vtex.ds.v10+json",
        "x-vtex-api-appKey": apiKey,
        "x-vtex-api-appToken": apiToken
    }
    return headers;
};
