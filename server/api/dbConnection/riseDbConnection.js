const mysql = require('mysql');

/**
 * Configuración de conexión de la base de datos de ventures
 */
module.exports = function() {
  return mysql.createConnection({
    host: 'madiautos.com.co',
    user: 'm3d1au7o_riseSC',
    password: 'L^=B)U[n-%Eq',
    database: 'm3d1au7o_devRISE',
  });
}