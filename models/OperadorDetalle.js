var mongoose = require('mongoose'),
	Schema  = mongoose.Schema;

// Este es el esquema de usuarios
var operadorDetalleSchema = new Schema({
	codigo_operador : String,
	latitud : String,
	longitud : String,
	codigo_ruta : String
});

// Esta es la exportacion de Schema
module.exports = mongoose.model('OperadorDetalle', operadorDetalleSchema);