// Ejemplo mongoose Schema (Persoan class)
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Este es el esquema de persona
var personaSchema = new Schema({
	nombre : String,
	apellido : String,
	latitud : String,
	longitud : String
});

//Esta es la esportacion de schema
module.exports = mongoose.model('Persona', personaSchema); 