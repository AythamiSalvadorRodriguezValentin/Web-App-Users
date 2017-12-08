(function() {
    'use strict';
    // Usage:
    // 
    // Creates:
    // 
    angular
        .module('Agend_User')
        .component('naveBarSearch', {
            templateUrl: '/components/naveBarSearch/naveBarSearch.html',
            controller: NavBarSearchController,
            controllerAs: '$ctrl',
            bindings: {
                logoImg: '@',
                logoAlt: '@',
                showLogo: '<',
                navList: '<',
                search: '=',
                showSearch: '<',
                searchPlaceholder: '@',
                showView: '=',
            },
        });
    NavBarSearchController.$inject = [];
    function NavBarSearchController() {
        var $ctrl = this;
        ////////////////
        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();