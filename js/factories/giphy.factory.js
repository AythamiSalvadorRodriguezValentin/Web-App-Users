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
            let url = 'https://api.giphy.com/v1/gifs/' + data_id + '?api_key=7jnRALOECevpKEne61XACCAhBWBgz348';
            return $http
                    .get(url)
                    .then(successFuction)
                    .catch(errorFuction);
        }
        function getGifsRecents(data_recent) {
            let url = 'https://api.giphy.com/v1/gifs/search?api_key=7jnRALOECevpKEne61XACCAhBWBgz348&q=' + data_recent;
            return $http
                    .get(url)
                    .then(successFuction)
                    .catch(errorFuction);
        }
        function getGifsTrending(data_trending) {
            let url = 'https://api.giphy.com/v1/gifs/trending?api_key=7jnRALOECevpKEne61XACCAhBWBgz348&q=' + data_trending;
            return $http
                    .get(url)
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
            }
            return giphyList;
        };
        function errorFuction(response){
            return response;
        }
    }
})();