angular.module('APP_FAV',['ngRoute']).config(config);
config.$inject = ['$routeProvider'];
function config($routeProvider){
    $routeProvider
        .when('/',{
            controller:'HomeController',
            templateUrl:'/views/home.html',
            controllerAs:'HomeCtrl'
        })
        .otherwise({redirectTo : '/'});
};