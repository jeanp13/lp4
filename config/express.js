/*
 * Módulo 
 */

/*Referência ao módulo do Express por meio da função require. Função require tem
 * como objetivo carregar módulos externos necessários. 
 * A variável express armazena uma funçao que, ao ser chamada, retorna uma
 * instância do express
 */
var express = require('express');

/*
 * Evita ter excessos de require, a partir deste middleware é possível ao invés
 * de chamar app/controllers.contato.js (pelo require). app.controllers.contato
 */
var load = require('express-load');

/*
 * middleware responsável para descompactar os dados de uma requisição de 
 * entrada e ser acessível por meio do req.body
 */
var bodyParser = require('body-parser');

/*
 * Tudo que for adicionado dentro do module.exports estará visível fora do 
 * módulo
 */
module.exports = function () {

    /*
     * 
     */
    var app = express();
    
    /*varíavel ambiente criada (chave, valor) para permitir setar a porta */
    app.set('port', 3000);

    /*
     * Permite que os arquivos na pasta public estarão disponíveis no navegador
     * para o usuário, por meio da função app.use()
     */
    app.use(express.static('./public'));

    /* Permite criar templates engine, assim não haverá misturas de códigos (js)
     * e html e css
     */
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    /*
     * Permite acessar os dados da requisição através do req.body 
     */
    app.use(bodyParser.urlencoded({extended: true}));
    
    //popula req.body com os parâmetros do POST
    app.use(bodyParser.json());
    app.use(require('method-override')());

    /*
     * A função carrega todos os scripts dentro das pastas app/models
     * app/controllers e app/routes
     */
    load('models', {cwd: 'app'})
            .then('controllers')
            .then('routes')
            .into(app);
    return app;
};
