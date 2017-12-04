(function() {
    'use strict';

    angular
        .module('APP_FAV')
        .controller('HomeController', HomeController);

    HomeController.$inject = ["$scope","UserLocalProvider"];
    function HomeController($scope,ULP) {
        ////////////////////////// VAR SCOPE ///////////////////////
        $scope.usersList = [];
        $scope.user = {};
        ////////////////////////// FUCTION SCOPE ///////////////////
        $scope.addUser = addUser;
        $scope.showUser = showUser;
        $scope.editUser = editUser;
        $scope.deleteUser = deleteUser;
        ////////////////////////// INIT ////////////////////////////
        activate();
        ////////////////////////// FUCTION INIT ////////////////////
        function activate() {
            $scope.usersList = ULP.getUsersAll();
        };
        ////////////////////////// FUCTION /////////////////////////
        function addUser(){
            $scope.user = ULP.addUser($scope.user);
            $scope.usersList.push($scope.user);
            $scope.user = {};
        }
        function showUser(id){
        };
        function editUser(id){
            $scope.user = ULP.getUser(id);
        };
        function deleteUser(id){
            ULP.deleteUser(id);
            for (let i = 0; i < $scope.usersList.length; i++) {
                const u = $scope.usersList[i];
                if (u.id == id){
                    usersList.splice(i,1);
                    break;
                }
            }
        };
    }
})();