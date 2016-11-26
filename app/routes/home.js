//módulo de teste apenas para ilustrar como funciona as rotas do Express
module.exports = function(app){
    var controller = app.controllers.home;
    app.get('/', controller.index);
};
