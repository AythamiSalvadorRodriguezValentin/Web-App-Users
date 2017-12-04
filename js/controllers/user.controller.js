(function() {
    'use strict';

    angular
        .module('Agend_User')
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