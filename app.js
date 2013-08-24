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

// Esta es la routes de usuario
routesUsuario = require('./routes/RoutesUsuarios')(app);
// Este es el operador
routesOperador = require('./routes/RoutesOperador')(app);
// Esta es la ruta
routesRuta = require('./routes/RoutesRutaOperador')(app);
// Esta es el detalle de detalle de operador 
routesDetalle = require('./routes/RoutesDetalleOperador')(app);
//connectar a la base de datos MongoDB 
mongoose.connect('mongodb://localhost/trakerSalesDataBasev1');

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('RUNING SERVER ON ' + app.get('port'));
});
// Estas io listen al server :D
io.listen(server);
