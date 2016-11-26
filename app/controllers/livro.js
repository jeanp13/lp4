module.exports = function (app) {
    var Livro = app.models.livro;

    var controller = {}
    controller.create = function (req, res) {
        req.body.aluguel = req.body.aluguel || null;

        Livro.create(req.body).then(
                function (response) {
                    res.status(201).json(response);
                },
                function (error) {
                    console.log(error);
                    res.status(500).json(error);
                });
    };

    controller.findAll = function (req, res) {
        Livro.find().populate('aluguel').exec().then(
                function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status(500).json(error);
                });
    };

    controller.findOne = function (req, res) {
        var id = req.params.id;
        Livro.findById(id).exec().then(
                function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status(404).json(error);
                });
    };

    controller.delete = function (req, res) {
        var id = req.params.id;
        Livro.remove({"_id": id}).exec().then(
                function () {
                    res.status(204).end();
                },
                function (error) {
                    res.status(500).json(error);
                });
    };

    controller.update = function (req, res) {
        var _id = req.body._id;

        req.body.aluguel = req.body.aluguel || null;
        Livro.findByIdAndUpdate(_id, req.body).exec().then(
                function (response) {
                    Livro.findById(_id).exec().then(
                            function (response) {
                                res.json(response);
                            },
                            function (error) {
                                res.status(404).json(error);
                            });
                },
                function (error) {
                    res.status(500).json(error);
                }
        );
    };
    return controller;
};
