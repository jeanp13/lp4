/*
 * Definição dos serviços que pode ser injetado, como qualquer recurso Angular
 * Podemos esconder a complexidade do $resource criando um serviço que retorne 
 * já configurado. Temos um módulo chamado meuServiços que terá como dependência
 * o módulo ngResource.
 */
angular.module('meusServicos', ['ngResource'])
        /* A função factory cria um serviço passando o nome e um afunção que deve retornar
         * um objeto. Em nosso caso retonar o ngResource já configurado.
         */
        .factory('recursoLivro', function ($resource) {
            /* 
             *Por default o serviço $resource não da suporte ao verbo PUT, e é
             *por meio deste verbo HTTP que nosso servidor irá distinguir entre 
             *inclusão (POST) e alteração (PUT) de recurso. E como $resource
             *não suporta o verbo PUT, podemos criá-lo.
             *
             *O serviço $resource recebe mais dois parâmetros além da URL com 
             *o curinga. O primeiro, que passamos null, é utilizado quando 
             *queremos enviar os parâmetros através de query string, isto é, 
             *a URL é construída utilizando ?parametro=valor, algo que não 
             *usaremos. O segundo, um objeto com todas as novas ações que 
             *desejamos adicionar ao nosso recurso. Em nosso caso, adicionamos 
             *a ação update, que possui como parâmetro um objeto que indica qual 
             *método será utilizado, em nosso caso PUT.
   
             */
            return $resource('/v1/livros/:livroId', null, {
                update: {
                    method: 'PUT'
                }
            });
        });