(function() {
    'use strict';

    angular
        .module('APP_FAV')
        .controller('HomeController', HomeController);

    HomeController.$inject = ["$location","UserLocalProvider","GiphyServerProvider"];
    function HomeController($location,ULP,GSP) {
        let vm = this;
        ///////////////////// VAR SCOPE USER ///////////////////////
        vm.usersList = [];
        vm.user = {};
        vm.edit = false;
        vm.showView = 0;
        ///////////////////// FUCTION SCOPE USER ///////////////////
        vm.changeView = changeView;
        vm.addNewUser = addNewUser;
        vm.showUser = showUser;
        vm.editUser = editUser;
        vm.modifyUser = modifyUser;
        vm.removeUser = removeUser;
        vm.checkValid = checkValid;
        ////////////////////// NAV PERFIL USER //////////////////////
        vm.go = go;
        ///////////////////// VAR SCOPE USER ///////////////////////
        vm.giphyList = [];
        vm.search_giphy = '';
        // Recent: true; Trending: false
        vm.rectOrTrend = true;
        ///////////////////// FUCTION SCOPE GIPHY //////////////////
        vm.getGiphies = getGiphies;
        vm.changeRectOrTrend = changeRectOrTrend;
        ///////////////////////// USER GIPHY ///////////////////////
        vm.addGifsFav = addGifsFav;
        vm.deleteGifsFav = deleteGifsFav;
        ////////////////////////// INIT ////////////////////////////
        activate();
        ////////////////////////// FUCTION INIT ////////////////////
        function activate() {
            vm.usersList = ULP.getUsersAll();
        };
        ////////////////////////// FUCTION USER ////////////////////
        function changeView(view){
            vm.showView = view;
        }
        function addNewUser(){
            vm.user = ULP.addUser(vm.user);
            vm.usersList.push(vm.user);
            vm.user = {};
        }
        function showUser(id){
        };
        function editUser(id){
            vm.user = ULP.getUser(id);
            vm.edit = true;
        };
        function modifyUser(){
            ULP.updateUser(vm.user);
            vm.edit = false;
            for (let i = 0; i < vm.usersList.length; i++) {
                const u = vm.usersList[i];
                if (u.id == vm.user.id) vm.usersList[i] = vm.user;
            }
            vm.user = {};
        };
        function removeUser(user){
            let userName = prompt("Estas seguro que deseas elimiar el usuario? " + user.name);
            if (userName == user.name) {
                ULP.deleteUser(user.id);
                for (let i = 0; i < vm.usersList.length; i++) {
                    const u = vm.usersList[i];
                    if (u.id == user.id){
                        vm.usersList.splice(i,1);
                        break;
                    }
                }
            }
        };
        function checkValid(){
            if((typeof vm.user.giphy =='object') && vm.formUser.$valid){
                if(vm.user.giphy.length>0) return true;
                else return false;
            } else return false;
        }
        ////////////////////// NAV PERFIL USER //////////////////////
        function go(id){
            let url = "/user/" + id;
            $location.path(url);
        };
        ////////////////////////// FUCTION GIPHY ////////////////////
        function getGiphies(){
            if(vm.rectOrTrend){
                GSP.getGifsRecents(vm.search_giphy).then(successFuction).catch(errorFuction);
            } else {
                GSP.getGifsTrending(vm.search_giphy).then(successFuction).catch(errorFuction);
            }
        };
        function successFuction(response){
            vm.giphyList = response;
        };
        function errorFuction(response){
            console.error(response);
        };
        function changeRectOrTrend(bool){
            vm.rectOrTrend = bool;
        }
        ////////////////////////// USER GIPHY ///////////////////////
        function addGifsFav(Giphy){
            if(typeof vm.user.giphy =='undefined') vm.user.giphy = [];
            if (!vm.user.giphy.includes(Giphy)) vm.user.giphy.push(Giphy);
            ULP.updateUser(vm.user);
        }
        function deleteGifsFav(Giphy){
            for (let i = 0; i < vm.user.giphy.length; i++) {
                const u = vm.user.giphy[i];
                if (u.id == Giphy.id) {
                    vm.user.giphy.splice(i,1);
                    break;
                }
            }
            ULP.updateUser(vm.user);
        }
    }
})();