(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Agend_User')
        .component('marvelContainer', {
            templateUrl: '/components/marvelContainer/marvelContainer.html',
            controller: MarvelContainerController,
            controllerAs: '$ctrl',
            bindings: {
                user: '='
            }
        });

    MarvelContainerController.$inject = ['MarvelServerProvider','UserLocalProvider'];
    function MarvelContainerController(MSP,ULP) {
        var $ctrl = this;
        ///////////////////////// VAR TYPE ////////////////////////
        $ctrl.marvelListSelect = [];
        $ctrl.search_marvel = {};
        $ctrl.marvelList = [];
        $ctrl.typeMarvel = '';
        $ctrl.directionArrow = 0;
        $ctrl.ArrowLeft = true;
        $ctrl.ArrowRight = true;
        //////////////////////// USER TYPE FAV /////////////////////
        $ctrl.getMarvel = getMarvel;
        $ctrl.addMarvelFav = addMarvelFav;
        $ctrl.deleteMarvelFav = deleteMarvelFav;
        $ctrl.checkMarvel = checkMarvel;
        ////////////////////////////////////////////////////////////
        $ctrl.$onInit = function() {
            $ctrl.marvelListSelect = MSP.getTypes();
            $ctrl.user = {name:'', email:'', phone:'', photo:'', giphy:[], marvel:[]};
            $ctrl.search_marvel = {text:'', type:'', offset:'', direction:'' , click:true}
        };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
        //////////////////////// USER TYPE FAV /////////////////////
        function getMarvel(offset, direction){
            $ctrl.ArrowRight = false;
            $ctrl.search_marvel.offset = offset;
            $ctrl.search_marvel.direction = direction;
            $ctrl.search_marvel.type = $ctrl.typeMarvel;
            MSP.getMarvelFct('on',$ctrl.search_marvel,3).then(response => $ctrl.marvelList = response).catch(errorFuction);
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
        function addMarvelFav(data){
            let isIn = false;
            for (let i = 0; i < $ctrl.user.marvel.length; i++) {
                if ($ctrl.user.marvel[i].id == data.id){
                    isIn = true;
                    break;
                }
            }
            if(!isIn){
                $ctrl.user.marvel.push(data);
                ULP.updateUser($ctrl.user);
            }
        }
        function deleteMarvelFav(data){
            for (let i = 0; i < $ctrl.user.marvel.length; i++) {
                if ($ctrl.user.marvel[i].id == data.id){
                    $ctrl.user.marvel.splice(i,1);
                    ULP.updateUser($ctrl.user);
                    break;
                }
            }
        }
        function checkMarvel(ident){
            for (let i = 0; i < $ctrl.user.marvel.length; i++) {
                if($ctrl.user.marvel[i].id == ident) return true;
            }
            return false;
        }
        ////////////////////////////////////////////////////////////
    }
})();