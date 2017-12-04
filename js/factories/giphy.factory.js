(function() {
    'use strict';

    angular
        .module('APP_FAV')
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
            return response.data.data;
        };
        function errorFuction(response){
            return response;
        }
    }
})();