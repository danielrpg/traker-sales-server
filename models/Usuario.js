var mongoose = require('mongoose'),
	Schema  = mongoose.Schema;

// Este es el esquema de usuarios
var usuarioSchema = new Schema({
	nombre : String,
	email : String,
	usuario : String,
	password : String,
	latitude : String,
	longitude : String
});

// Esta es la exportacion de Schema
module.exports = mongoose.model('Usuario', usuarioSchema);