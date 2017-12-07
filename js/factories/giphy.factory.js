(function() {
    'use strict';

    angular
        .module('Agend_User')
        .factory('GiphyServerProvider', GiphyServerProvider);

    GiphyServerProvider.$inject = ['$http'];
    function GiphyServerProvider($http) {
        let GSP = this;
        ///////////////////////// VAR FACTORY GIPHY /////////////////////////
        GSP.offsetGiphy = 0;
        GSP.numberGifs = 8;
        ////////////////////// RETURN FACTORY FUCTION ///////////////////////
        var service = {
            getGifsById:getGifsById,
            getGifsType:getGifsType,
        };
        return service;
        /////////////////////////// FUCTION GYPHY ///////////////////////////
        function getGifsById(data_id) {
            let url = 'https://api.giphy.com/v1/gifs/';
            let data = data_id;
            let apikey = '&api_key=7jnRALOECevpKEne61XACCAhBWBgz348';
            return $http
                    .get(url + data + apikey)
                    .then(successFuction)
                    .catch(errorFuction);
        }
        /**
         * 
         * @param {*} object { type: }
         */
        function getGifsType(object, options) {
            let url = 'https://api.giphy.com/v1/gifs/' + object.type + '?&q=';
            let data = object.text;
            let apikey = '&api_key=7jnRALOECevpKEne61XACCAhBWBgz348';
            let offset = "&offset=";
            if(object.offset){
                if(object.direction) GSP.offsetGiphy += GSP.numberGifs;
                else {
                    if(GSP.offsetGiphy > GSP.numberGifs) GSP.offsetGiphy -= GSP.numberGifs;
                    else GSP.offsetGiphy = 0;
                }
            } else GSP.offsetGiphy = 0;
            return $http
                    .get(url + data + apikey + offset + GSP.offsetGiphy)
                    .then(successFuction)
                    .catch(errorFuction);
        }
        function successFuction(response){
            let giphyListFct = response.data.data;
            let giphyList = [];
            for (let i = 0; i < giphyListFct.length; i++) {
                const g = giphyListFct[i];
                let object = {};
                object.id = g.id;
                object.photo = g.images.downsized.url;
                if(!giphyList.includes(object)) giphyList.push(object);
                if(giphyList.length >= GSP.numberGifs) break;
            }
            return giphyList;
        };
        function errorFuction(response){
            return response;
        }
    }
})();