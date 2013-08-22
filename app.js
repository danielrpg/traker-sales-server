var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');
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
// Esta es la forma de enrutar las peticiones 
routesPersona  = require('./routes/RoutesPersona')(app);
// Esta es la routes de usuario
routesUsuario = require('./routes/RoutesUsuarios')(app);
//connectar a la base de datos MongoDB 
mongoose.connect('mongodb://localhost/trakerDataBase');

http.createServer(app).listen(app.get('port'), function(){
  console.log('RUNING SERVER ON ' + app.get('port'));
});
