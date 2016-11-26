var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
      imeiOrigem:{
        type: String,
        required: true
      },
      imagemCompleta:{
        type: String,
        required: true
      },
      nomeImagem:{
        type: String,
        required: true
      },
      letraUm:{
        type: String,
        required: false
      },
      letraDois:{
        type: String,
        required:false
      },
      letraTres:{
        type:String,
        required: false
      },
      numeroUm:{
        type:String,
        required: false
      },
      numeroDois:{
        type:String,
        required: false
      },
      numeroTres:{
        type:String,
        required: false
      },
      numeroQuatro:{
        type:String,
        required: false
      },
      resultado:{
        type:String,
        required:false
      },
      dataImagem:{
        type: Date,
        required: false
      }
    });

    return mongoose.model('Imagem', schema);
};
