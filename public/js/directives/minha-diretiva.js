/*
 * Criar um módulo chamado 'minhasDiretrizes' por meio da variável angular que possui todo core do Angular,
 * eu crio uma diretiva por meio do método .directive('nomeDiretiva' function)
 * o function da diretiva deve retornar um ddo (directive definition object) que possui toda configuração da sua diretiva
 
 * O objetivo da diretiva é criar um novo elemento chamado <meu-painel> </meu-painel> que vai me permitir fazer reuso do código em várias
 *partes do meu projeto
 */
angular.module('minhasDiretrizes', [])
        .directive('meuPainel', function () {

            // variável ddo com a configuração da diretiva
            var ddo = {};

            // configura sua diretiva para ser do tipo E - Elemento e A - Atributo
            ddo.restric = "EA";

            /* dentro da minha diretiva eu perco a referência do meu LivroController   <h2 class="text-center"> {{livro.nome}} </h2>
             * por isto é necessário criar um escopo para atribuir o valor da minha variável LivroController a minha diretiva
             * Meu painel será desta forma <meu-painel valor="{{livro.nome}}"> onde 'valor' passado como atributo no meu elemento (diretiva)
             * e nome scopo vou receber uma string como valor por meio do @
             */
            ddo.scope = {
                nome: '@valor'
            };

            /*
             * O angular subistitui o fragmento do DOM <meu-painel> </meu-painel> pela marcação da nossa diretiva
             * Com isto perdemos todos os elementos filhos. Para o Angular preservar o conteúdo original da diretiva,
             * precisamos usar o mecanismo de transclusão
             */
            ddo.transclude = true;

            //endereço do template para ser subistituido o elemento <meu-painel> </meu-painel>
            ddo.templateUrl = 'js/directives/meu-painel.html';

            //retorna objeto de configração da diretiva
            return ddo;
        })
        .directive('minhaFoto', function () {
            var ddo = {};
            ddo.restric = "EA";
            ddo.scope = {
                url: '@url',
                nome: '@nome'
            };

            ddo.templateUrl = 'js/directives/minha-foto.html';
            return ddo;
        });
