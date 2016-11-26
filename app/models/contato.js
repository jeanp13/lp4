/*
 * Módulo Contato responsável por manter a consistência no banco NoSQL
 */

//cria o mongoose para poder criar os esquemas e regras
var mongoose = require('mongoose');

module.exports = function() {
    /*
     * Permite criar um esquema que vai gerenciar e manipular os documentos
     * da base de dados. Aqui vamos declarar todos os atributos da nossa 
     * entidade e mapear com nossos documentos do banco.
     */
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            
            //permite determinar que não haverá emails repetidos
            index: {
                unique: true
            }
        },
        
        //relacionamento, passando referência
        emergencia: {
            type: mongoose.Schema.ObjectId,
            ref: 'Contato'
        }
    });

    //retorna uma instância da nossa entidade / modelo para manipulação
    return mongoose.model('Contato', schema);
};