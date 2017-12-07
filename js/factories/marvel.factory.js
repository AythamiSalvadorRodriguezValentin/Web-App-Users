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
        MSP.arrayMarvel = [];
        MSP.peticiones = 0;
        MSP.object = {};
        ////////////////////// RETURN FACTORY FUCTION ///////////////////////
        var service = {
            getMarvelFct:getMarvelFct,
            getTypes:getTypes
        };
        return service;
        ////////////////////////////////////////////////////////////////////////////////
        /**
         * 
         * @param {*} click si es la primera vez, el offset debe estar en 'false' y el click en 'false'; en caso contrario, el click debe estar 
         * en 'true' para saber que deseas utilizar el offset.
         * @param {*} object {text: marvel que deseas buscar, type: desear buscar un 'comics' 'characters' 'series' o 'events', offset: debe 
         * estar a 'false' si es la primera búsqueda y 'true' si vas a buscar más marvel, direction: 'true' para buscar más marvel o 'false' para 
         * regresar a los anteriores}
         * @param {*} options numero de marvel que deseas buscar.
         */
        function getMarvelFct(click,object,options) {
            if(typeof options === 'number' && options >= 1) MSP.numberMarvel = options;
            if(click){
                if(object.direction) MSP.peticiones += MSP.numberMarvel;
                else{
                    if (MSP.peticiones >= MSP.numberMarvel) MSP.peticiones -= MSP.numberMarvel;
                    else MSP.peticiones = MSP.numberMarvel;
                }
            }
            if(MSP.object.offset){
                if(MSP.object.direction) MSP.offsetMarvel += MSP.numberMarvel;
                else {
                    if(MSP.offsetMarvel > MSP.numberMarvel) MSP.offsetMarvel -= MSP.numberMarvel;
                    else MSP.offsetMarvel = 0;
                }
            } else{
                if(!click) MSP.peticiones = MSP.numberMarvel;
                MSP.offsetMarvel = 0;
                MSP.arrayMarvel = [];
                MSP.object = object;
            }
            let path = 'http://gateway.marvel.com/v1/public/';
            let apikey = '?ts=1&apikey=efb02361aedaa8eddcc39bd180263ecb&hash=8f7e5e249517eb6fb5f3adb6eb92a554';
            let initType = (MSP.object.type == 'comics' || MSP.object.type == 'series') ? '&titleStartsWith=' : '&nameStartsWith=';
            let limit = "&limit=" + MSP.numberMarvel;
            let offset = "&offset=";
            
            return $http
                    .get(path + MSP.object.type + apikey + initType + MSP.object.text + limit + offset + MSP.offsetMarvel)
                    .then(succesFuction)
                    .catch(errorFuction);
        };
        function succesFuction(response){
            let marvel = response.data.data.results;
            if(MSP.arrayMarvel.length >= MSP.peticiones){
                let returnArrayMarvel = [];
                for (let i = 0; i < MSP.arrayMarvel.length; i++) {
                    if (i >= (MSP.peticiones - MSP.numberMarvel) && i < MSP.peticiones) {
                        returnArrayMarvel.push(MSP.arrayMarvel[i]);
                    }
                }
                return returnArrayMarvel;
            } else{
                for (let i = 0; i < marvel.length; i++) {
                    const m = marvel[i];
                    const object = {};
                    let isIn = false;
                    object.id = m.id;
                    object.title = m.title;
                    object.photo = m.thumbnail.path + '.' + m.thumbnail.extension;
                    for (let i = 0; i < MSP.arrayMarvel.length; i++) {
                        let index = object.photo.indexOf('image_not_available');
                        if (MSP.arrayMarvel[i].id == object.id) isIn = true;
                        if(index != -1) isIn = true;
                    }
                    if(!isIn) MSP.arrayMarvel.push(object);
                    if(MSP.arrayMarvel.length == MSP.peticiones) break;
                }
                if(MSP.arrayMarvel.length == MSP.peticiones){
                    let returnArrayMarvel = [];
                    for (let i = 0; i < MSP.arrayMarvel.length; i++) {
                        if (i >= (MSP.peticiones - MSP.numberMarvel) && i < MSP.peticiones) {
                            returnArrayMarvel.push(MSP.arrayMarvel[i]);
                        }
                    }
                    return returnArrayMarvel;
                }
                else{
                    if(MSP.object.offset){
                        if(!MSP.object.direction){
                            if(MSP.offsetMarvel < MSP.numberMarvel) MSP.object.direction = true;
                        }
                    } else {
                        MSP.object.offset = true;
                        MSP.object.direction = true;
                    }
                    MSP.object.click = false;
                    return getMarvelFct(false,MSP.object);
                }
            }
        };
        function errorFuction(response){
            return response;
        };
        function getTypes(){
            return ['comics','characters','events','series'];
        }
    }
})();