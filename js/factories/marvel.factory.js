(function() {
    'use strict';

    angular
        .module('Agend_User')
        .factory('MarvelServerProvider', MarvelServerProvider);

    MarvelServerProvider.$inject = ['$http'];
    function MarvelServerProvider($http) {
        let MSP = this;
        ///////////////////////// VAR FACTORY GIPHY /////////////////////////
        MSP.offsetMarvel = 0;
        MSP.numberMarvel = 3;
        ////////////////////// RETURN FACTORY FUCTION ///////////////////////
        var service = {
            getMarvelFct:getMarvelFct,
            getTypes:getTypes
        };
        return service;
        ////////////////////////////////////////////////////////////////////////////////
        function getMarvelFct(object) {
            let path = 'http://gateway.marvel.com/v1/public/';
            let apikey = '?ts=1&apikey=efb02361aedaa8eddcc39bd180263ecb&hash=8f7e5e249517eb6fb5f3adb6eb92a554';
            let initType = (object.type == 'comics' || object.type == 'series') ? '&titleStartsWith=' : '&nameStartsWith=';
            let offset = "&offset=";
            if(object.offset){
                if(object.direction) MSP.offsetMarvel += MSP.numberMarvel;
                else {
                    if(MSP.offsetMarvel > MSP.numberMarvel) MSP.offsetMarvel -= MSP.numberMarvel;
                    else MSP.offsetMarvel = 0;
                }
            } else MSP.offsetMarvel = 0;
            return $http
                    .get(path + object.type + apikey + initType + object.text + offset + MSP.offsetMarvel)
                    .then(succesFuction)
                    .catch(errorFuction);
        };
        function succesFuction(response){
            let marvel = response.data.data.results;
            let marvelList = [];
            for (let i = 0; i < marvel.length; i++) {
                const m = marvel[i];
                const object = {};
                object.id = m.id;
                object.title = m.title;
                object.photo = m.thumbnail.path + '.' + m.thumbnail.extension;
                if(!marvelList.includes(object)) marvelList.push(object);
                if(marvelList.length >= MSP.numberMarvel) break;
            }
            return marvelList;
        };
        function errorFuction(response){
            return response;
        };
        function getTypes(){
            return ['comics','characters','events','series'];
        }
    }
})();