(function() {
    'use strict';

    angular
        .module('APP_FAV')
        .controller('UserController', UserController);

    UserController.$inject = ['User'];
    function UserController(User) {
        var vm = this;
        vm.user = {};
        activate();
        ////////////////
        function activate() {
            vm.user = User;
        }
    }
})();