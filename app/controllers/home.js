/*
 * Controller criado apenas para ilustrar como podemos gerenciar as regras de 
 * negócio da nossa aplicação
 */

module.exports = function(){
    var controller = {};
    controller.index = function(req, res){
       res.render('index', {nome:'Projeto Alfa'});
    };
    return controller;
}