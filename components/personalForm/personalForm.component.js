(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Agend_User')
        .component('personalForm', {
            templateUrl: '/components/personalForm/personalForm.html',
            controller: PersonalUserController,
            controllerAs: '$ctrl',
            bindings: {
                user: '=',
                form: '='
            },
        });

    PersonalUserController.$inject = [];
    function PersonalUserController() {
        var $ctrl = this;
        ////////////////
        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();