(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

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

    SliderMarvel.$inject = [];
    function SliderMarvel() {
        var $ctrl = this;
        ////////////////
        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();