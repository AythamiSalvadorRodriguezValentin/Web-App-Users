(function() {
    'use strict';

    angular
        .module('Agend_User')
        .controller('HomeController', HomeController);

    HomeController.$inject = ["$location","UserLocalProvider","GiphyServerProvider","MarvelServerProvider"];
    function HomeController($location,ULP,GSP,MSP) {
        let vm = this;
        ////////////////////////// VAR USER ////////////////////////
        vm.usersList = [];
        vm.user = {};
        vm.edit = false;
        vm.showView = 'User';
        //////////////////////// FUCTION USER //////////////////////
        vm.resetVar = resetVar;
        vm.addNewUser = addNewUser;
        vm.editUser = editUser;
        vm.modifyUser = modifyUser;
        vm.removeUser = removeUser;
        ////////////////////// NAV PERFIL USER /////////////////////
        vm.go = go;
        ///////////////////////// VAR GIPHY ////////////////////////
        vm.giphyList = [];
        vm.search_giphy = {};
        vm.typeGiphy = 'search';
        ///////////////////////// VAR MARVEL ///////////////////////
        vm.marvelListSelect = [];
        vm.search_marvel = {};
        vm.marvelList = [];
        vm.typeMarvel = '';
        //////////////////////// USER TYPE FAV /////////////////////
        vm.getTypesUser = getTypesUser;
        vm.addTypeFav = addTypeFav;
        vm.deleteTypeFav = deleteTypeFav;
        vm.checkTypeUser = checkTypeUser;
        ///////////////////////// INIT /////////////////////////////
        activate();
        ///////////////////////// FUCTION INIT /////////////////////
        function activate() {
            vm.resetVar();
            vm.usersList = ULP.getUsersAll();
            vm.marvelListSelect = MSP.getTypes();
        };
        //////////////////////// FUCTION USER //////////////////////
        function resetVar(){
            vm.user = {name:'', email:'', phone:'', photo:'', giphy:[], marvel:[]};
            vm.search_giphy = {text:'', type:'', offset:false, direction:false};
            vm.search_marvel = {text:'', type:'', offset:false, direction:false}
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
        ////////////////////// NAV PERFIL USER /////////////////////
        function go(id){
            let url = "/user/" + id;
            $location.path(url);
        };
        //////////////////////// USER TYPE FAV /////////////////////
        function getTypesUser(type, offset, direction){
            if (type == 'Giphy') {
                vm.search_giphy.offset = offset;
                vm.search_giphy.direction = direction;
                vm.search_giphy.type = vm.typeGiphy;
                if(vm.typeGiphy == 'search') GSP.getGifsType(vm.search_giphy).then(response => vm.giphyList = response).catch(errorFuction);
                else if(vm.typeGiphy == 'trending') GSP.getGifsType(vm.search_giphy).then(response => vm.giphyList = response).catch(errorFuction);
            } else if (type == 'Marvel'){
                vm.search_marvel.offset = offset;
                vm.search_marvel.direction = direction;
                vm.search_marvel.type = vm.typeMarvel;
                MSP.getMarvelFct(vm.search_marvel).then(response => vm.marvelList = response).catch(errorFuction);
            }
        };
        function errorFuction(response){
            console.error(response);
        };
        function addTypeFav(type, data){
            let isIn = false;
            let arrayType = [];
            if(type == 'Giphy') arrayType = vm.user.giphy;
            else if(type == 'Marvel') arrayType = vm.user.marvel;
            else return;
            for (let i = 0; i < arrayType.length; i++) {
                if (arrayType[i].id == data.id){
                    isIn = true;
                    break;
                }
            }
            if(!isIn){
                arrayType.push(data);
                vm.user[type] = arrayType;
                ULP.updateUser(vm.user);
            }
        }
        function deleteTypeFav(type, data){
            let arrayType = [];
            if(type == 'Giphy') arrayType = vm.user.giphy;
            else if(type == 'Marvel') arrayType = vm.user.marvel;
            else return;
            for (let i = 0; i < arrayType.length; i++) {
                if (arrayType[i].id == data.id){
                    arrayType.splice(i,1);
                    vm.user[type] = arrayType;
                    ULP.updateUser(vm.user);
                    break;
                }
            }
        }
        function checkTypeUser(type, ident){
            if(!vm.edit) return;
            let arrayType = [];
            if(type == 'Giphy') arrayType = vm.user.giphy;
            else if(type == 'Marvel') arrayType = vm.user.marvel;
            else return;
            for (let i = 0; i < arrayType.length; i++) {
                if(arrayType[i].id == ident) return true;
            }
            return false;
        }
    }
})();