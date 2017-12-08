(function() {
    'use strict';
    ////////////////////////////////////////////////////////////
    // Usage:
    // 
    // Creates:
    // 
    ////////////////////////////////////////////////////////////
    angular
        .module('Agend_User')
        .component('userCardPersonal', {
            templateUrl: '/components/userCardPersonal/userCardPersonal.html',
            controller: UserCardPersonalController,
            controllerAs: '$ctrl',
            bindings: {
                usersList: '<',
                showUser: '&',
                editUser: '&',
                removeUser: '&',
            },
        });
    ////////////////////////////////////////////////////////////
    UserCardPersonalController.$inject = [];
    function UserCardPersonalController() {
        var $ctrl = this;
        ////////////////////////////////////////////////////////////
        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();