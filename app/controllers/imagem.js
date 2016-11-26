module.exports = function (app) {
    var Imagem = app.models.imagem;

    var controller = {}

    controller.create = function (req, res) {
        req.body.resultado = req.body.resultado || null;
        var placa = req.body;
        Imagem.create(req.body).then(
                function (response) {

                    var d = new Date();
                    var n = d.getFullYear()
                    + '_' + d.getMonth()
                    + '_' + d.getDate()
                    + '_' + d.getHours()
                    + '_' + d.getMinutes()
                    + '_' + d.getSeconds()
                    + '_' + d.getMilliseconds();
var path = '/home/jean/';
  console.log(n);
  var fs = require('fs');
                    //var data = placa.imagemCompleta;
                    //  , path = location.pathname
                      //, dir = path.substring(path.indexOf('/', 1)+1, path.lastIndexOf('/'));
/*
CRIAR NO IONIC
                       fileName = Imagem.imeiOrigem
                                  + '_' + d.getFullYear()
                                  + '_' + d.getMonth()
                                  + '_' + d.getDate()
                                  + '_' + d.getHours()
                                  + '_' + d.getMinutes()
                                  + '_' + d.getSeconds()
                                  + '_' + d.getMilliseconds()
                                  + '.jpg' + ;
*/
                      //dir = dir + '/placas';
                      dir = '/home/jean';
                      if (!fs.existsSync(dir)) {
                        fs.mkdir(dir);
                      }
/*
                      fs.writeFile(dir+'/'+Imagem.nomeImagem, data, {encoding: 'base64'}, function(err){
                      console.log(err);
                      res.status(500).json(err);
                    });

*/
  //                var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
  //                + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
  //                + "3gAAAABJRU5ErkJggg==";
                  // strip off the data: url prefix to get just the base64-encoded bytes
                  var data = placa.imagemCompleta.replace(/^data:image\/\w+;base64,/, "");
                  var buf = new Buffer(placa.imagemCompleta, 'base64');
                  console.log(placa.nomeImagem);
                  fs.writeFile(dir+'/'+placa.nomeImagem, buf,
                  //  fs.writeFile(dir+"/test", "Hey thdfgfdgfgdfsere!",
                  function(err) {
                    if(err) {
                        console.log(err);
                        res.status(500).json(error);
                    }

});
                    res.status(201).json(response);
                },
                function (error) {
                    console.log(error);
                    res.status(500).json(error);
                });
    };

    controller.findAll = function (req, res) {
        Imagem.find().populate('resultado').exec().then(
                function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status(500).json(error);
                });
    };

    controller.findOne = function (req, res) {
        var id = req.params.id;
        Imagem.findById(id).exec().then(
                function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status(404).json(error);
                });
    };
    controller.findByIMEI = function (req, res) {
        var id = req.params.id;
        Imagem.findOne({"imeiDispositivo": id}).exec().then(
                function (response) {
                    res.json(response);
                },
                function (error) {
                    res.status(404).json(error);
                });
    };

    controller.delete = function (req, res) {
        var id = req.params.id;
        Imagem.remove({"_id": id}).exec().then(
                function () {
                    res.status(204).end();
                },
                function (error) {
                    res.status(500).json(error);
                });
    };

    controller.update = function (req, res) {
        var _id = req.body._id;

        req.body.resultdo = req.body.resultado || null;
        Imagem.findByIdAndUpdate(_id, req.body).exec().then(
                function (response) {
                    Imagem.findById(_id).exec().then(
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
