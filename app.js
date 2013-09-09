var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    io = require('socket.io');
 //  esta el server de node js
var app = express();
// Todos los entornos los midleware's necesarios
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
// Unicamente entorno de desarrollo
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.send('<h1>Por favor llame 65755850 para implentacion de un servicio @chalasoft</h1>');
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('RUNING SERVER ON ' + app.get('port'));
});
// Estas io listen al server :D
var serverSocket = io.listen(server); // activa el socket con la aplicacion
//console.dir(serverSocket);

// Esta es la routes de usuario
routesUsuario = require('./routes/RoutesUsuarios')(app);
// Este es el operador
routesOperador = require('./routes/RoutesOperador')(app, serverSocket); // este es el modulo operador
// Esta es la ruta
routesRuta = require('./routes/RoutesRutaOperador')(app);
// Esta es el detalle de detalle de operador 
routesDetalle = require('./routes/RoutesDetalleOperador')(app);
//connectar a la base de datos MongoDB 
mongoose.connect('mongodb://localhost/trakerSalesDataBasev1');

/*server_socket.sockets.on('connection', function (socket) {
	socket.on('nuevoUsuario', function(data){
		console.dir(data);
	});
});*/


