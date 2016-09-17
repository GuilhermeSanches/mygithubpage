angular.module('serviceHome', []).factory('HomeService', function ($http, API) {
    return {
        getHistory: function () {
            var client = window.localStorage.getItem('client');
            return $http.get(API + '/clients/' + JSON.parse(client).id_user + '/history');
        },
        getLastConsumtion: function () {
            var client = window.localStorage.getItem('client');
            return $http.get(API + '/clients/' + JSON.parse(client).id_user + '/consumption');
        }
    };
});

