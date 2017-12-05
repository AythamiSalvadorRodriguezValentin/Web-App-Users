(function() {
    'use strict';

    angular
        .module('Agend_User')
        .factory('GiphyServerProvider', GiphyServerProvider);

    GiphyServerProvider.$inject = ['$http'];
    function GiphyServerProvider($http) {
        var service = {
            getGifsById:getGifsById,
            getGifsRecents:getGifsRecents,
            getGifsTrending:getGifsTrending
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
        function getGifsRecents(data_recent, _offset) {
            let url = 'https://api.giphy.com/v1/gifs/search?&q=';
            let data = data_recent;
            let apikey = '&api_key=7jnRALOECevpKEne61XACCAhBWBgz348';
            let offset = '&offset=';
            return $http
                    .get(url + data + apikey + offset + _offset)
                    .then(successFuction)
                    .catch(errorFuction);
        }
        function getGifsTrending(data_trending, _offset) {
            let url = 'https://api.giphy.com/v1/gifs/trending?&q=';
            let data = data_trending;
            let apikey = '&api_key=7jnRALOECevpKEne61XACCAhBWBgz348';
            let offset = '&offset=';
            return $http
                    .get(url + data + apikey + offset + _offset)
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
                if(giphyList.length >= 9) break;
            }
            return giphyList;
        };
        function errorFuction(response){
            return response;
        }
    }
})();