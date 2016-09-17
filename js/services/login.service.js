var Services = angular.module('serviceLogin', []);

Services.factory('UserService', function ($http, API) {
    return {
        login: function (username, password) {
            return $http.post(API + '/login', { username: username, pass: password });
        }
    };
});

