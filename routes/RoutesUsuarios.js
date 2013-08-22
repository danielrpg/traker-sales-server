// Este es el enrutador de usuarios
module.exports = function(app){
	var Usuario = require('../models/Usuario');
	// Crear un nuevo usuario
	nuevoUsuario = function(req, res){
		var usuario = new Usuario({nombre:req.body.nombre, email:req.body.email, usuario:req.body.usuario, password:req.body.password, latitude:req.body.latitude, longitude:req.body.longitude});
		usuario.save();
		res.end();
	};
	// Metodo para hacer login de usuario
	loginUsuario = function(req, res){
		res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
		Usuario.findOne({usuario:req.params.login,password:req.params.password},function(err, usuario){
			if(!err){
				res.send({complet:true});
				console.log('Usuario en el sistema');
			}else{
				
				res.send({complet:false});
				console.log(err);
			}
		});
	};
	// Esta es la lista de usuarios
	listaUsuarios = function(req, res){
		Usuario.find(function(err, usr){
			res.send(usr);
		});
	};
	/** Este es el metodo que actualiza la posicion */
	//Estos 
	app.post('/usuario', nuevoUsuario);
	app.get('/loginUsuario/:login/:password', loginUsuario);
	app.get('/listaUsuarios', listaUsuarios);
}