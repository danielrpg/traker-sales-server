// App routes
module.exports = function(app){
	var Persona = require('../models/Persona');
	var Usuario = require('../models/Usuario');

	// Crear una nueva persona y gurdar esta
	persona = function(req, res){
		var persona = new Persona({nombre:req.body.nombre, apellido:req.body.apellido, latitud:req.body.latitud, longitud:req.body.longitud});
		persona.save();
		res.end();
	};
	// Lista todas las personas
	list = function(req, res){
		Persona.find(function(err, gente){
			res.send(gente);
		});
	};
	// Encontrar una persona en especifico por id
	find = function(req, res){
		Persona.findOne({_id:req.params.id}, function(error, persona){
			res.send(persona);
		})
	};
	// Esto es el metodo que actualiza la persona
	actualizarPersona = function(req, res){
		Persona.findOne({_id:req.params.id}, function(error, persona){
			//console.dir(persona);
			persona.nombre = req.body.nombre;
			persona.apellido = req.body.apellido;
			persona.latitud = req.body.latitud;
			persona.longitud = req.body.longitud;
			//console.log(persona);
			persona.save(function(err){
				if(!err){
					res.send({complet:true});
					console.log('Persona Actualizada');
				}else{
					res.send({complet:false});
					console.log(err);
				}
			})
		})
	};
	// Metodo que se encarga de eliminar una persona
	eliminarPersona = function(req, res){
		Persona.findOne({_id:req.params.id}, function(error, persona){
			console.dir(persona);
			persona.remove(function(){
				console.log('Persona Eliminada');
				res.send({complet:true});
			});
		})
	};
	/** Este es el metodo que permite */
	setCurrentPosition = function(){
		
	};
	// Estos son los links para poder acceder en la base de datos
	app.post('/persona', persona);
	app.post('/setCurrentPosition', setCurrentPosition);
	app.get('/listaPersonas', list);
	app.get('/persona/:id', find);
	app.put('/persona/:id', actualizarPersona);
	app.delete('/persona/:id', eliminarPersona);
}   
