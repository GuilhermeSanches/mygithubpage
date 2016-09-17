App.controller('LoginCtrl', ['$scope', 'UserService', '$location',
    function ($scope, UserService, $location) {
        $(document).ready(function () {
            $('ul.tabs').tabs();
        });
        $(document).ready(function () {
            $('ul.tabs').tabs('select_tab', 'login');
        });

        $scope.login = function (user) {
            UserService.login(user.username, user.pass).then(function (results) {
                window.localStorage.setItem("isLogged", "true");
                window.localStorage.setItem("client", JSON.stringify(results.data.result));
                window.sessionStorage.setItem("token", results.data.result.token);
                $location.path("/");
            }, function (err) {
                console.log("erro:" + err.data);
            });
        };
    }]);