angular.module('biblioteca').controller('UsuarioController',
        function ($scope, $http) {
            $scope.usuarios = [];

            $http.get('/v1/usuarios')
                    .success(function (usuarios) {
                        $scope.usuarios = usuarios;
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
        });