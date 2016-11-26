var mongoose = require('mongoose');

module.exports = function(){
    var schema = mongoose.Schema({
      nome:{
        type: String,
        required: true
      },
      autor:{
        type: String,
        required:true
      },
      img:{
        type:String,
        required: true
      },

      //relacionamento, passando referência
      aluguel: {
          type: mongoose.Schema.ObjectId,
          ref: 'Usuario'
      }
    });

    return mongoose.model('Livro', schema);
};
