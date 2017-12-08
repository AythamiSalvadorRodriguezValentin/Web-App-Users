(function() {
    'use strict';
    ////////////////////////////////////////////////////////////
    angular
        .module('Agend_User')
        .controller('HomeController', HomeController);

    HomeController.$inject = ["$location","UserLocalProvider"];
    function HomeController($location,ULP) {
        let vm = this;
        ////////////////////////// VAR USER ////////////////////////
        vm.usersList = [];
        vm.user = {};
        vm.edit = false;
        vm.showView = 'User';
        vm.formUser = {};
        vm.navList = [];
        vm.search = '';
        //////////////////////// FUCTION USER //////////////////////
        vm.resetVar = resetVar;
        vm.addNewUser = addNewUser;
        vm.editUser = editUser;
        vm.modifyUser = modifyUser;
        vm.removeUser = removeUser;
        vm.checkValid = checkValid;
        ////////////////////// NAV PERFIL USER /////////////////////
        vm.showUser = showUser;
        ///////////////////////// INIT /////////////////////////////
        activate();
        ///////////////////////// FUCTION INIT /////////////////////
        function activate() {
            vm.resetVar();
            vm.usersList = ULP.getUsersAll();
            vm.navList = ['User','Gifs','Marvel'];
        };
        //////////////////////// FUCTION USER //////////////////////
        function resetVar(){
            vm.user = {name:'', email:'', phone:'', photo:'', giphy:[], marvel:[]};
        };
        function addNewUser(){
            vm.user = ULP.addUser(vm.user);
            vm.usersList.push(vm.user);
            vm.formUser.$setPristine();
            vm.resetVar();
        };
        function editUser(id){
            vm.edit = false;
            vm.resetVar();
            vm.user = ULP.getUser(id);
            vm.edit = true;
        };
        function modifyUser(){
            vm.edit = false;
            ULP.updateUser(vm.user);
            for (let i = 0; i < vm.usersList.length; i++) {
                const u = vm.usersList[i];
                if (u.id == vm.user.id) vm.usersList[i] = vm.user;
            }
            vm.formUser.$setPristine();
            vm.resetVar();
        };
        function removeUser(user){
            let userName = prompt("Estas seguro que deseas elimiar el usuario? " + user.name);
            if (userName == user.name) {
                ULP.deleteUser(user.id);
                for (let i = 0; i < vm.usersList.length; i++) {
                    if (vm.usersList[i].id == user.id) {vm.usersList.splice(i,1); break;}
                }
            }
        };
        function checkValid(){
            if (vm.formUser.$valid 
                && vm.user.giphy.length > 0
                && vm.user.marvel.length > 0) return true;
            else return false;
        }
        ////////////////////// NAV PERFIL USER /////////////////////
        function showUser(id){
            let url = "/user/" + id;
            $location.path(url);
        };
        ////////////////////////////////////////////////////////////
    }
})();