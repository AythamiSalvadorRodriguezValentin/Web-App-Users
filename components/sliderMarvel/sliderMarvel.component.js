(function() {
    'use strict';
    ////////////////////////////////////////////////////////////
    // Usage:
    // Se utiliza para mostrar un array de imágenes en un 
    // contenedor. 
    // Se utiliza para los marvel.
    // Se utiliza en la aplicacion Agend_User.
    // Creates:
    // Se creo para manejar imágenes y peticiones de marvel.
    // Requiere del componente: marvelContainer.component.js
    ////////////////////////////////////////////////////////////
    angular
        .module('Agend_User')
        .component('sliderMarvel', {
            templateUrl: '/components/sliderMarvel/sliderMarvel.html',
            controller: SliderMarvel,
            controllerAs: '$ctrl',
            bindings: {
                marvels: '<',
                arrowLeft: '<',
                arrowRight: '<',
                getMarvel: '&',
                checkMarvel: '&',
                addMarvelFav: '&'
            },
        });
    ////////////////////////////////////////////////////////////
    SliderMarvel.$inject = [];
    function SliderMarvel() {
        var $ctrl = this;
        ////////////////////////////////////////////////////////////
        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();