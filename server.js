/*
 * módulo http responśavel por subir nosso servidor
 * app é o módulo que permite criar uma instância do express
 */
var http = require('http'),
    app = require('./config/express')();
    //permite conectar no banco de nome 'estudo'
require('./config/database.js')('mongodb://jean13go:lp412345@ds111188.mlab.com:11188/heroku_gj4t69d9');

/*
 * cria um evento de ficar escutando a porta selecionada pela varíavel de
 * ambiente
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Server listen at port ' + app.get('port'));
});
