// Este es el enrutador de usuarios
module.exports = function(app){
	var OperadorDetalle = require('../models/OperadorDetalle');
	var RutaOperador  = require('../models/RutaOperador')
	// Este es el metodo inicial de la posicion actual
	setCurrentPosition = function(req, res){
		res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
		RutaOperador.findOne({codigo_operador:req.body.codigo_operador}, function(err,ruta){
			console.dir(ruta);
			var operadorDetalle = new OperadorDetalle({codigo_operador:req.body.codigo_operador,latitud:req.body.latitude,longitud:req.body.longitude,codigo_ruta:ruta.codigo_ruta});
			operadorDetalle.save();
			res.send();
		});
		//var operadorDetalle = new OperadorDetalle({req.body.});
	};

	listaDetallePosicionOperador = function(req, res){
		OperadorDetalle.find(function(err, operadoresDetalles){
			res.send(operadoresDetalles);
		});
	};
	app.post('/setCurrentPosition', setCurrentPosition);
	app.get('/listaDetallePosicionOperador', listaDetallePosicionOperador);
}