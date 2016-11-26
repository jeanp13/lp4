/*
 * Controller do Livro, no devem ser inseridos todas as regras de negócio da nossa entidade Livro
 *Como boa prática de programação Angular, todos os nomes controllers deve começar com letra maiúscula e todas palavras também terão a primeira letra maiúscula
 * 1º nossa variável global angular de novo 'biblioteca' cria um Controller pelo método .controller('nomeController', function)
 * $scope é um objeto injetado pelo angular que permite "pendurar" nossas variáveis que serão acessadas na view (HTML)
 */

/* Não preciso mais injetar $http no meu controler ou $resource apenas o meu 
 * serviço criado recursoLivro
 */
angular.module('biblioteca').controller('LivroController', function ($scope, recursoLivro) {

    // String vazia que recebe os dados do teclado para o filtro da busca
    $scope.filtro = '';
    $scope.mensagem_sucesso = '';

    //Array livros contendo lista de livros com seus atributos
    //Atributos mapeados que vão subistituir as "lacunas" do HTML
    $scope.livros = [];

    $scope.remover = function (livro) {
        recursoLivro.delete({livroId: livro._id}, function () {
            var indexLivro = $scope.livros.indexOf(livro);
            $scope.livros.splice(indexLivro, 1);
            $scope.mensagem_sucesso = 'removido com sucesso!';
        }, function (erro) {
            console.log(erro);
        });
    };

    /* requisição http com o verbo get o servidor retorna a requisição pedida fazendo uso da metodologia REST, tornando a nossa aplicação RESTFUL */
    recursoLivro.query(function (livros) {
        $scope.livros = livros;
    }, function (erro) {
        console.log(erro);
    });


});
