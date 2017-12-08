(function() {
    'use strict';
    ////////////////////////////////////////////////////////////
    // Usage:
    // Este componente permite visualizar gifs y añadir gifs a 
    // un usuario en favoritos. Se usa en Agend_User
    // Creates:
    // Este componente permite descargar gifs de la API Giphy 
    // y añadir a un usuario los gifs que más le guste.
    ////////////////////////////////////////////////////////////
    angular
        .module('Agend_User')
        .component('gifsContainer', {
            templateUrl: '/components/gifsContainer/gifsContainer.html',
            controller: GifsContainerController,
            controllerAs: '$ctrl',
            bindings: {
                user: '='
            }
        });
    ////////////////////////////////////////////////////////////
    GifsContainerController.$inject = ['GiphyServerProvider','UserLocalProvider'];
    function GifsContainerController(GSP,ULP) {
        var $ctrl = this;
        ///////////////////////// VAR TYPE ////////////////////////
        $ctrl.user = {};
        $ctrl.giphyList = [];
        $ctrl.search_giphy = {};
        $ctrl.typeGiphy = 'search';
        $ctrl.directionArrow = 0;
        $ctrl.ArrowLeft = true;
        $ctrl.ArrowRight = true;
        //////////////////////// USER TYPE FAV /////////////////////
        $ctrl.getGifs = getGifs;
        $ctrl.addGifFav = addGifFav;
        $ctrl.deleteGifFav = deleteGifFav;
        $ctrl.checkGif = checkGif;
        ////////////////////////////////////////////////////////////
        $ctrl.$onInit = function() {
            $ctrl.user = {name:'', email:'', phone:'', photo:'', giphy:[], marvel:[]};
            $ctrl.search_giphy = {text:'', type:'', offset:'', direction:''};
        };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
        //////////////////////// USER TYPE FAV /////////////////////
        function getGifs(offset, direction){
            $ctrl.ArrowRight = false;
            $ctrl.search_giphy.offset = offset;
            $ctrl.search_giphy.direction = direction;
            $ctrl.search_giphy.type = $ctrl.typeGiphy;
            if($ctrl.typeGiphy == 'search') GSP.getGifsType($ctrl.search_giphy,8).then(response => $ctrl.giphyList = response).catch(errorFuction);
            else if($ctrl.typeGiphy == 'trending') GSP.getGifsType($ctrl.search_giphy,8).then(response => $ctrl.giphyList = response).catch(errorFuction);
            if (offset == 'si'){
                if(direction == 'right') $ctrl.directionArrow++; 
                else $ctrl.directionArrow--;
                if($ctrl.directionArrow > 0) $ctrl.ArrowLeft = false;
                else $ctrl.ArrowLeft = true;
            } else{
                $ctrl.directionArrow = 0;
                $ctrl.ArrowLeft = true;
            }
        };
        function errorFuction(response){
            console.error(response);
        };
        function addGifFav(data){
            let isIn = false;
            for (let i = 0; i < $ctrl.user.giphy.length; i++) {
                if ($ctrl.user.giphy[i].id == data.id){
                    isIn = true;
                    break;
                }
            }
            if(!isIn){
                $ctrl.user.giphy.push(data);
                ULP.updateUser($ctrl.user);
            }
        }
        function deleteGifFav(data){
            for (let i = 0; i < $ctrl.user.giphy.length; i++) {
                if ($ctrl.user.giphy[i].id == data.id){
                    $ctrl.user.giphy.splice(i,1);
                    ULP.updateUser($ctrl.user);
                    break;
                }
            }
        }
        function checkGif(ident){
            for (let i = 0; i < $ctrl.user.giphy.length; i++) {
                if($ctrl.user.giphy[i].id == ident) return true;
            }
            return false;
        }
    }
})();