// App routes
module.exports = function(app){
	var RutaOperador = require('../models/RutaOperador'); // Este es el model de este objeto
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
	rutaOperador = function(req, res){
		var cod_ruta = 'CODIGO_RUTA_'+randomString();
		var rutaOperador = new RutaOperador({detalle:req.body.detalle,
			                                 fechaInicio:req.body.fechaInicio,
			                                 fechaFin:req.body.fechaFin,
			                                 origenLatitud:req.body.origenLatitud,
			                                 origenLongitud:req.body.origenLongitud,
			                             	 destinoLatitud:req.body.destinoLatitud,
			                             	 destinoLongitud:req.body.destinoLongitud,
			                             	 codigo_operador:req.body.codigo_operador,
			                             	 codigo_ruta : cod_ruta});
		rutaOperador.save();
		res.send();
	};
	/** Esta es la lista de los operadores **/
	listaRutaOperadores = function(req, res){
		RutaOperador.find(function(err, operadores){
			res.send(operadores);
		});
	};
	app.post('/rutaOperador', rutaOperador);
	app.get('/listaRutaOperadores', listaRutaOperadores);
}