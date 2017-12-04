(function() {
    'use strict';

    angular
        .module('Agend_User')
        .controller('HomeController', HomeController);

    HomeController.$inject = ["$location","UserLocalProvider","GiphyServerProvider","MarvelServerProvider"];
    function HomeController($location,ULP,GSP,MSP) {
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
        vm.RecentsTrending = RecentsTrending;
        ///////////////////////// USER GIPHY ///////////////////////
        vm.addGifsFav = addGifsFav;
        vm.deleteGifsFav = deleteGifsFav;
        vm.checkGiphyUser = checkGiphyUser;
        ///////////////////////// VAR MARVEL ///////////////////////
        vm.marvelListSelect = [];
        vm.search_marvel = '';
        vm.marvelList = [];
        vm.typeMarvel = '';
        ////////////////////////// FUCTION MARVEL ////////////////////
        vm.getMarvel = getMarvel;
        ////////////////////////// USER MARVEL ///////////////////////
        vm.addMarvelFav = addMarvelFav;
        vm.deleteMarvelFav = deleteMarvelFav;
        vm.checkMarvelUser = checkMarvelUser;
        ////////////////////////// INIT ////////////////////////////
        activate();
        ////////////////////////// FUCTION INIT ////////////////////
        function activate() {
            vm.usersList = ULP.getUsersAll();
            vm.marvelListSelect = MSP.getTypeCharacters();
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
                    if (vm.usersList.includes(user)) vm.usersList.splice(i,1);
                }
            }
        };
        function checkValid(){
            if(vm.formUser.$valid) return true;
            else return false;
        }
        ////////////////////// NAV PERFIL USER //////////////////////
        function go(id){
            let url = "/user/" + id;
            $location.path(url);
        };
        ////////////////////////// FUCTION GIPHY ////////////////////
        function getGiphies(){
            if(vm.rectOrTrend) GSP.getGifsRecents(vm.search_giphy).then(response => vm.giphyList = response).catch(errorFuction);
            else  GSP.getGifsTrending(vm.search_giphy).then(response => vm.giphyList = response).catch(errorFuction);
            vm.search_giphy = '';
        };
        function errorFuction(response){
            console.error(response);
        };
        function RecentsTrending(bool){
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
                if(vm.user.giphy.includes(Giphy)) vm.user.giphy.splice(i,1);
            }
            ULP.updateUser(vm.user);
        }
        function checkGiphyUser(Giphy){
            if(typeof vm.user.giphy =='undefined') vm.user.giphy = [];
            return vm.user.giphy.includes(Giphy);
        }
        ////////////////////////// FUCTION MARVEL ////////////////////
        function getMarvel(){
            MSP.getMarvelFct(vm.typeMarvel, vm.search_marvel).then(response => vm.marvelList = response).catch(errorFuction);
            vm.search_marvel = '';
        };
        ////////////////////////// USER MARVEL ///////////////////////
        function addMarvelFav(Marvel){
            if(typeof vm.user.marvel =='undefined') vm.user.marvel = [];
            if (!vm.user.marvel.includes(Marvel)) vm.user.marvel.push(Marvel);
            ULP.updateUser(vm.user);
        }
        function deleteMarvelFav(Marvel){
            for (let i = 0; i < vm.user.marvel.length; i++) {
                if (vm.user.marvel.includes(Marvel)) vm.user.marvel.splice(i,1);
            }
            ULP.updateUser(vm.user);
        }
        function checkMarvelUser(Marvel){
            if(typeof vm.user.marvel =='undefined') vm.user.marvel = [];
            return vm.user.marvel.includes(Marvel);
        }
    }
})();