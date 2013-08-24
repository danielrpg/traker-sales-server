var mongoose = require('mongoose'),
	Schema  = mongoose.Schema;

// Este es el esquema de usuarios
var operadorSchema = new Schema({
	nombre : String,
	apellido : String,
	email : String,
	usuario : String,
	password : String,
	direccion : String,
	celular : String,
	codigo_operador : String
});

// Esta es la exportacion de Schema
module.exports = mongoose.model('Operador', operadorSchema);