// App routes
module.exports = function(app){
	var Operador = require('../models/Operador'); // Este es el model de este objeto


    randomString = function() {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 8;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		return randomstring;
	};

	// Crear una nueva persona y gurdar esta
	operador = function(req, res){
		var codigo_op = 'CODIGO_OP_'+randomString();
		var operador = new Operador({nombre:req.body.nombre, apellido:req.body.apellido,email:req.body.email,usuario:req.body.usuario,password:req.body.password, direccion:req.body.direccion,celular:req.body.celular, codigo_operador:codigo_op});
		operador.save();
		res.end();
	};
	// Lista todas las personas
	listaOperadores = function(req, res){
		Operador.find(function(err, operadores){
			res.send(operadores);
		});
	};
	// Encontrar una persona en especifico por id
	buscarXId = function(req, res){
		Operador.findOne({_id:req.params.id}, function(error, operador){
			console.dir(operador);
			res.send(operador);
		})
	};
	// Esto es el metodo que actualiza la persona
	actualizarOperador = function(req, res){
		Operador.findOne({_id:req.params.id}, function(error, operador){
			operador.nombre = req.body.nombre;
			operador.apellido = req.body.apellido;
			operador.email = req.body.email;
			operador.usuario = req.body.usuario;
			operador.password = req.body.password;
			operador.direccion = req.body.direccion;
			operador.celular = req.body.celular;
			operador.save(function(err){
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
	eliminarOperador = function(req, res){
		Operador.findOne({_id:req.params.id}, function(error, operador){
			console.dir(operador);
			operador.remove(function(){
				console.log('Persona Eliminada');
				res.send({complet:true});
			});
		})
	};
	/** Metodo que permite loguear al operador **/
	loginOperador = function(req, res){
		res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
        Operador.findOne({usuario:req.params.log,password:req.params.pass},function(err, operador){
        	console.dir(operador.codigo_operador);
			if(!err){
				res.send({complet:true,codigo_operador:operador.codigo_operador});
				console.log('Usuario en el sistema');
			}else{
				res.send({complet:false});
				console.log(err);
			}
		});
	};
	/** Este es el metodo que permite */
	/*setCurrentPosition = function(){
		
	};*/
	// Estos son los links para poder acceder en la base de datos
	app.post('/operador', operador);
//	app.post('/setCurrentPosition', setCurrentPosition);
	app.get('/listaOperadores', listaOperadores);
	app.get('/operador/:id', buscarXId);
	app.get('/loginOperador/:log/:pass', loginOperador); // Esto es para loguear al operador
	app.put('/operador/:id', actualizarOperador);
	app.delete('/operador/:id', eliminarOperador);
}   
