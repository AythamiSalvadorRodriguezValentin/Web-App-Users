(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

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
            },
        });

    SliderGifs.$inject = [];
    function SliderGifs() {
        var $ctrl = this;
        ////////////////
        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();