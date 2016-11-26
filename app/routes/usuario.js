
module.exports = function (app) {

    // módulo de controller que contém nossas regras de negócio.
    var controller = app.controllers.usuario;
    path = require('path');
    app.route('/v1/usuarios')
            .get(controller.findAll)
            .post(controller.create);

    app.route('/v1/usuarios/:id')
            .get(controller.findOne)
            .delete(controller.delete)
            .put(controller.update);
    app.all('/*', function (req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });
};
