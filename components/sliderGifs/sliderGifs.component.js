(function() {
    'use strict';
    ////////////////////////////////////////////////////////////
    // Usage:
    // Se utiliza para mostrar un array de imágenes en un 
    // contenedor. 
    // Se utiliza para los gifs.
    // Se utiliza en la aplicacion Agend_User.
    // Creates:
    // Se creo para manejar imágenes y peticiones de gifs.
    // Requiere del componente: gifsContainer.component.js
    ////////////////////////////////////////////////////////////
    angular
        .module('Agend_User')
        .component('sliderGifs', {
            templateUrl: '/components/sliderGifs/SliderGifs.html',
            controller: SliderGifs,
            controllerAs: '$ctrl',
            bindings: {
                gifs: '<',
                arrowLeft: '<',
                arrowRight: '<',
                getGifs: '&',
                checkGif: '&',
                addGifFav: '&'
            }
        });
    ////////////////////////////////////////////////////////////
    SliderGifs.$inject = [];
    function SliderGifs() {
        var $ctrl = this;
        ////////////////////////////////////////////////////////////
        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();