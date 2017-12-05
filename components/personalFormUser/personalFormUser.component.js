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
                userId: '=',
                form: '='
            },
        });

    PersonalUserController.$inject = ['UserLocalProvider'];
    function PersonalUserController(ULP) {
        /////////////////////////////////////////////////////////////
        var $PUS = this;
        $PUS.user.name = "Pepe";
        /////////////////////////////////////////////////////////////
        $PUS.$onInit = function() {

        };
        $PUS.$onChanges = function(changesObj) {
            
        };
        $PUS.$onDestroy = function() {

        };
        /////////////////////////////////////////////////////////////
        
    }
})();