/*
 * Módulo responsável por iniciar a conexão usando o mymap mongoose
 */
var mongoose = require('mongoose');


module.exports = function(uri){
    
    //função responsável por conectar a base de dados
    mongoose.connect(uri);

    //conjunto de testes que verifica se realmente houve a conexão ou falhas
    mongoose.connection.on('connected', function() {
        console.log('Mongoose! Conectado em ' + uri);
    });

    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose! Desconectado de ' + uri);
    });

    mongoose.connection.on('error', function(erro) {
        console.log('Mongoose! Erro na conexão: ' + erro);
    });

    //após aplicação ser encerrada é necessário desconectar o banco
    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose! Desconectado pelo término da aplicação');
            process.exit(0);
        });
    });

}