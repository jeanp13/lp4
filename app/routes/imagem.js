module.exports = function(app){
  var controller = app.controllers.imagem;

  app.route('/obterImagem')
    .post(controller.create)
    .get(controller.findAll);

  app.route("/obterImagem/:id")
    .get(controller.findByIMEI)
    .delete(controller.delete)
    .put(controller.update);

};
