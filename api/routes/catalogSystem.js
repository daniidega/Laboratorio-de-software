'use strict';

var Client = require('node-rest-client').Client,
    masterDataModel = require('../model/masterDataModel'),
    vtexHeadersConfig = require('../model/vtexModel'),
    masterDataDocument = require('../vtex_webservices/masterData/documents');

var client = new Client(),
    args = masterDataModel.encabezado,
    apiKey = "vtexappkey-kungfudigital-TTNBVW",
    apiToken = "PDAGPYMUPHSOEBSNASTAHTDEMKCUQYEQUIRXJQCVDDNWPNDPVQXTWQXWAVTEWSDQCBTVKVDJPXWEFGPZHMZAALUDLUWOWXZKZWUNTIFAMNDYUSQUFUXJTDPQGQKPYPNR",    
    headers = vtexHeadersConfig.headers(apiKey,apiToken);

module.exports = {};