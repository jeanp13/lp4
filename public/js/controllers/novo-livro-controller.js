/* Controller criado para efetuar o cadastro do livro */
angular.module('biblioteca')
        .controller('NovoLivroController', function ($scope, $routeParams, recursoLivro) {
            /* objeto scope no qual vou pendurar meus objetos que vou usar no html*/
            $scope.livro = {};
            
            /* declaração variáveis que vão armazenar mensagem de sucesso ou 
             * falha, e printar no html. 
             */
            $scope.mensagem_sucesso = '';
            $scope.mensagem_falha = '';
            
            /* Com minha injeção recursoLivro, é possível obter o meu objeto 
             * $resource já vem configurado, com isto eu não preciso criar urls e 
             * concatenar ids. Deixando meu código mais enxuto, mais bonito,
             * mais fácil de dar manutenção e menos propenso a cometer falhas
             */

            /* O id do livro é passado por parâmetro e salvo no curinga livroId
             * que deve ter o mesmo nome e escrita no main.js onde determinamos
             * as rotas: "$routeProvider.when('/livros/edit/:livroId'"
             * O routeParams permite eu obter o id passado.
             */
            if ($routeParams.livroId) {
                /* A partir do meu recursoLivro consigo obter o meu objeto por
                 * meio do verbo http get passando um id por parâmetro  
                 */
                recursoLivro.get({livroId: $routeParams.livroId}, function (livro) {
                    $scope.livro = livro;
                }, function (erro) {
                    console.log(erro);
                });

            }

            /* função chamada na diretiva ng-sumit quando for dado um sumit no 
             * nosso formulário será executado este método
             */
            $scope.submeter = function () {
                /* se o meu formulário válido, ou seja sem nenhum erro, executo 
                 * a função de cadastro novo livro
                 */
                if ($scope.formulario.$valid) {
                    /* Eu verifoco se existe _id, se existir é pq é um objeto já
                     * salvo e quero alterar, se não existir, é pq é um objeto 
                     * novo e quero inserir.
                     */
                    if ($scope.livro._id) {
                        recursoLivro.update({livroId: $scope.livro._id}, $scope.livro, function () {
                            $scope.mensagem_sucesso = 'Alteração Realizada com Sucesso!';
                        }, function (erro) {
                            console.log(erro);
                            $scope.mensagem_falha = 'Alteração não realizada!';
                        });

                    } else {
                        /* o meu objeto injetado http é responsável por chamar 
                         * no servidor o método de cadastrar livro, e passamos 
                         * tbm o nosso objeto scope.livro 
                         */
                        recursoLivro.save($scope.livro, function () {
                            $scope.livro = {};
                            $scope.mensagem_sucesso = 'Cadastro Realizado com Sucesso!';
                        }, function (erro) {
                            console.log(erro);
                            $scope.mensagem_falha = 'Cadastro não realizado!';
                        });

                    }
                }
            };

        });