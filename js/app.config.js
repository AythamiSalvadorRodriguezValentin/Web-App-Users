angular.module('Agend_User',['ngRoute']).config(config);
config.$inject = ['$routeProvider'];
function config($routeProvider){
    $routeProvider
        .when('/',{
            controller:'HomeController',
            templateUrl:'/views/home.html',
            controllerAs:'HomeCtrl'
        })
        .when('/user/:id',{
            controller:'UserController',
            templateUrl:'/views/user.html',
            controllerAs:'userCtrl',
            resolve:{
                User : UserLocalFactory
            }
        })
        .otherwise({redirectTo : '/'});
};
UserLocalFactory.$inject = ['$route','UserLocalProvider'];
function UserLocalFactory($route,UserLocalProvider){
    return UserLocalProvider.getUser($route.current.params.id);
}