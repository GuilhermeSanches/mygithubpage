var ServiceUtil = angular.module('Interceptor', []);

ServiceUtil.factory('TokenInterceptor', function ($q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = $window.sessionStorage.token;
            }
            return config;
        },

        requestError: function (rejection) {
            return $q.reject(rejection);
        },
        
        response: function (response) {
            if (response !== null && response.status == 200 && $window.sessionStorage.token && !$window.localStorage.isLogged) {
                $window.localStorage.isLogged = true;
            }
            return response || $q.when(response);
        },
        
        responseError: function (rejection) {
            if (rejection !== null && rejection.status === 401 && ($window.sessionStorage.token || $window.localStorage.isLogged)) {
                delete $window.sessionStorage.token;
                $window.localStorage.isLogged = false;
                delete $window.localStorage.client;
                window.localStorage.removeItem('client');
                $location.path("/login");
            }

            return $q.reject(rejection);
        }
    };
});