var mongoose = require('mongoose'),
	Schema  = mongoose.Schema;

// Este es el esquema de usuarios
var rutaOperadorSchema = new Schema({
	detalle : String,
	fechaInicio : {type: Date, default: Date.now}, 
	fechaFin : {type: Date, default: Date.now},
	origenLatitud : String,
	origenLongitud : String,
	destinoLatitud :String,
	destinoLongitud : String,
	codigo_operador : String,
	codigo_ruta : String
});

// Esta es la exportacion de Schema
module.exports = mongoose.model('RutaOperador', rutaOperadorSchema);