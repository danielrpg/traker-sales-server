// App routes
module.exports = function(app, serverSocket){
	var Operador = require('../models/Operador'); // Este es el model de este objeto
    var listaOp = [];
    serverSocket.sockets.on('connection', function (socket) {
		socket.on('nuevoUsuario', function(data, callback){
			if(listaOp.indexOf(data.login) != -1){
				callback(false);
			}else{
				callback(true);
				socket.login = data.login;
				socket.codigo_op = data.codigo_op
				socket.latitude = data.latitude;
				socket.longitude = data.longitude;
				listaOp.push(data.login);
				serverSocket.sockets.emit('newUserConnected', {login:socket.login,codigo_op:socket.codigo_op, latitude:socket.latitude, longitude:socket.longitude});
				console.log('Los operadores conectados: '+listaOp+' <<<<<<<<<<<<<<<<<<< ');	
			}
		});
		socket.on('compartirPoscion', function(data){
			serverSocket.sockets.emit('compartirPoscion', {lat:data.lat, lon:data.lon, cod_op:data.cod_op, login:socket.login});
		});
		socket.on('disconnect', function(){
			if(!socket.login) return;
			if(listaOp.indexOf(socket.login) > -1){
				listaOp.splice(listaOp.indexOf(socket.login), 1);
			}
			serverSocket.sockets.emit('userDisconnected',{login:socket.login, codigo_op:socket.codigo_op});
			console.log('Los operadores conectados son: '+listaOp+' <<<<<<<<<<<<<<<<<<< ');
		});
	});
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
		var codigo_op = 'CODIGO_OP_'+randomString(); // me crea un codigo de operador unico
		var operador = new Operador({nombre:req.body.nombre, apellido:req.body.apellido,email:req.body.email,usuario:req.body.usuario,password:req.body.password, direccion:req.body.direccion,celular:req.body.celular, codigo_operador:codigo_op}); // crea un objeto operador
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
			//console.dir(operador);
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
					//console.log('Persona Actualizada');
				}else{
					res.send({complet:false});
					//console.log(err);
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
       /* serverSocket.sockets.on('connection', function (socket) {
			socket.on('nuevoUsuario', function(data){
				console.dir(data);
				console.log('Esta es una prueba');
			});
		});*/
        Operador.findOne({usuario:req.params.log,password:req.params.pass},function(err, operador){
        	//console.dir(operador.codigo_operador);
			if(!err){
				//console.log(serverSocket.sockets);
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
