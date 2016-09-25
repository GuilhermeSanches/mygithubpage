var App = window.angular.module('App', ['ngMaterial', 'ngRoute', 'serviceLogin', 'Interceptor', 'serviceHome', 'ngMd5', 'angularMoment']);

App.config(function ($routeProvider, $httpProvider, $mdThemingProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
    $mdThemingProvider.theme('docs-dark');

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            access: { requiredAuthentication: true }
        })

        .when('/report', {
            templateUrl: 'views/reportDate.html',
            controller: 'ReportCtrl',
            access: { requiredAuthentication: true }
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            access: { requiredAuthentication: false }
        })

        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl',
            access: { requiredAuthentication: false }
        })

        .otherwise({
            redirectTo: '/'
        });
});


App.run(function ($rootScope, $location, $route, $window, amMoment) {
    var nextPath = $location.path();
    var nextRoute = $route.routes[nextPath];
    amMoment.changeLocale('ptBr');
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if (nextRoute.access) {
            if (nextRoute.access.requiredAuthentication && $window.localStorage.isLogged == 'false' || !$window.localStorage.isLogged) {
                $location.path("/login");
            }
        } else {
            $location.path("/login");
        }
    });
});


App.value('API', 'https://api-energymonitor.rhcloud.com/api/v1');


