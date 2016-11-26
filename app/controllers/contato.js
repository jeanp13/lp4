/*
 * Módulo repsonsável por gerenciar as regras de negócio dos nossos modelos
 */

module.exports = function (app) {

    //cria uma instância do models Contato por meio do middleware express-load
    var Contato = app.models.contato;

    var controller = {}

    /*req é uma informação que contem a requição HTTP que disparou o evento
     * em resposta ao req, vc usa o res pra enviar uma reposta HTTP desejada. 
     */
    controller.findAll = function (req, res) {


        /*
         * Método (query mongoose) que busca e apresenta todos os elementos do 
         * meu documento, o método populate permite substituir a referência na 
         * entidade pelos valores do mesmo.
         */
        Contato.find().populate('emergencia').exec().then(
                //query mongoose 
                        function (response) {
                            res.json(response);
                        },
                        function (error) {
                            res.status(500).json(error);
                        }
                );

            };

    /*
     * Método (query mongoose) que busca e apresenta um elemento cujo o id
     * foi passado por parâmetro 
     */
    controller.findOne = function (req, res) {

        /*
         * Método que recupera o parâmetro 'id'
         */
        var id = req.params.id;

        /*
         * findById passa o id por parâmetro e retorna duas respostas:
         *   -error, e eu já manipulo para enviar um 404 - não encontrado
         *   -sucesso: verfico se não é vazio, se for envio 404 - não encontrado
         *   -caso não seja vazio envio a resposta por json
         */
        Contato.findById(id).exec().then(
                function (response) {
                    if (!response) {
                        res.status(404).json("Contato não foi localizado!");
                    }
                    res.json(response);
                },
                function (error) {
                    res.status(404).json(error);
                }
        );
    };

    /*
     * Método (query mongoose) que busca e apresenta um elemento cujo o id
     * foi passado por parâmetro e exluir da base de dados
     */
    controller.delete = function (req, res) {

        /*
         * recupera o id passado na url por parâmetro
         */
        var id = req.params.id;

        /*
         * o remove passa o _id por parâmetro e retorna duas respostas:
         *   -error, e eu já manipulo para enviar o erro por json
         *   -sucesso: envio um 204: o servidor cumprimiu o pedido, mas nao
         *   precisa retornar uma entidade para o corpo. E a posição do doc.
         *   não deve ser alterada. 
         */
        Contato.remove({"_id": id}).exec().then(
                function () {
                    // 204 means no content
                    res.status(204).end();
                },
                function (error) {
                    res.status(500).json(error);
                }
        );

    };

    controller.create = function (req, res) {

        /*
         * teste para variável não ir não definida, se variável nao existir
         * sera setado o valor null
         */
        req.body.emergencia = req.body.emergencia || null;

        /*
         * req.body atualiza todas as agregações evitando assim inconsistência
         * nos dados. E o próprio método se encarrega de atualizar as chaves.
         * Retorna dois resultados:
         *  -error: manipulo e envio erro 500 para o servidor, enviando também
         *  a mensagem via json
         *  -sucesso: e manipulo para enviar a mensagem 201, que a entidade foi
         *  criada com sucesso
         */
        Contato.create(req.body).then(
                function (response) {
                    // 201 means that post was created
                    res.status(201).json(response);
                },
                function (error) {
                    console.log(error);
                    res.status(500).json(error);
                }
        );
    };

    /*
     * Método criado para alterar entidade passada 
     */
    controller.update = function (req, res) {
        //_id vai estar setado no body da página
        var _id = req.body._id;

        /*
         * teste para variável não ir não definida, se variável nao existir
         * sera setado o valor null
         */
        req.body.emergencia = req.body.emergencia || null;

        /*
         * Altera a entidade passando o objectID por parâmetro e os dados da 
         * entidade. Se sucesso, ele busca a entidade e envia por json. Caso
         * falhe é manipulado o erro 500 e enviado o erro via json. 
         */
        Contato.findByIdAndUpdate(_id, req.body).exec().then(
                function (response) {
                    Contato.findById(_id).exec().then(
                            function (response) {
                                if (!response) {
                                    res.status(404).json("Contato não foi localizado!");
                                }
                                res.json(response);
                            },
                            function (error) {
                                res.status(404).json(error);
                            }
                    );
                },
                function (error) {
                    res.status(500).json(error);
                }
        );
    };
    
    //retorna para estância do controller
    return controller;

}