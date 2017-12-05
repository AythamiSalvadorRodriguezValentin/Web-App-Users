(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Agend_User')
        .component('personalFormUser', {
            templateUrl: '/components/personalFormUser/personalFormUser.html',
            controller: PersonalUserController,
            controllerAs: '$PUS',
            bindings: {
                user: '=',
                form: '='
            },
        });

    PersonalUserController.$inject = ['GiphyServerProvider'];
    function PersonalUserController(GiphyServerProvider) {
        var $PUS = this;
        ////////////////
        $PUS.$onInit = function() {
            $PUS
        };
        $PUS.$onChanges = function(changesObj) {

        };
        $PUS.$onDestroy = function() {

        };
    }
})();