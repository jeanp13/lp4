/*
 * Módulo responsável por gerenciar os roteamentos da aplicação e a partir
 * de uma url e o que será feito em seguida.
 */
module.exports = function (app) {
    
    // módulo de controller que contém nossas regras de negócio.
    var controller = app.controllers.contato;
    
    /*
     * método responsável por ler a url e a partir do método HTTP executar 
     * a função do controller adequada
     */
    app.route('/contatos')
        .get(controller.findAll)
        .post(controller.create)
        .put(controller.update);

    /*
     * Permite criar um arota no qual passa o id de uma entidade, no caso um 
     * contato
     */
    app.route('/contatos/:id')
        .get(controller.findOne)
        .delete(controller.delete);


}