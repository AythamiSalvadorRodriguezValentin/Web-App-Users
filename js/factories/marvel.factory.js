(function() {
    'use strict';

    angular
        .module('Agend_User')
        .factory('MarvelServerProvider', MarvelServerProvider);

    MarvelServerProvider.$inject = ['$http'];
    function MarvelServerProvider($http) {
        var service = {
            getMarvelFct:getMarvelFct,
            getTypeCharacters:getTypeCharacters
        };
        return service;
        ////////////////////////////////////////////////////////////////////////////////
        function getMarvelFct(typeCharacters, titleComic) {
            let path = 'http://gateway.marvel.com/v1/public/';
            let apikey = '?ts=1&apikey=efb02361aedaa8eddcc39bd180263ecb&hash=8f7e5e249517eb6fb5f3adb6eb92a554';
            let type = '';
            if (typeCharacters == 'comics' || typeCharacters == 'series') type = '&titleStartsWith=';
            else type = type = '&nameStartsWith=';
            let url  =  path + typeCharacters + apikey + type + titleComic;
            return $http
                    .get(url)
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
            }
            return marvelList;
        };
        function errorFuction(response){
            return response;
        };
        function getTypeCharacters(){
            return ['comics','characters','events','series'];
        }
    }
})();