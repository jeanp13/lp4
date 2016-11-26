module.exports = function(app){
  var controller = app.controllers.livro;

  app.route('/v1/livros')
    .post(controller.create)
    .get(controller.findAll);

  app.route("/v1/livros/:id")
    .get(controller.findOne)
    .delete(controller.delete)
    .put(controller.update);

};
