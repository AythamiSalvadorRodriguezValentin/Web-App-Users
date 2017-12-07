(function() {
    'use strict';

    angular
        .module('Agend_User')
        .controller('UserController', UserController);

    UserController.$inject = ['User','UserLocalProvider'];
    function UserController(User,ULP) {
        var vm = this;
        ////////////////////////// VAR USER ////////////////////////
        vm.user = {};
        //////////////////////// USER TYPE FAV /////////////////////
        vm.deleteTypeFav = deleteTypeFav;
        vm.deleteAllType = deleteAllType;
        ///////////////////////// INIT /////////////////////////////
        activate();
        ///////////////////////// FUCTION INIT /////////////////////
        function activate(){
            vm.user = User;
        }
        //////////////////////// USER TYPE FAV /////////////////////
        function deleteTypeFav(type, data){
            let arrayType = [];
            let YN = prompt("¿Estas seguro que deseas eliminar el '" + type + "' ? Introduce 'Y' o 'N'");
            if (YN == 'Y') {
                if(type == 'Giphy') arrayType = vm.user.giphy;
                else if(type == 'Marvel') arrayType = vm.user.marvel;
                else return;
                for (let i = 0; i < arrayType.length; i++) {
                    if (arrayType[i].id == data.id){
                        arrayType.splice(i,1);
                        vm.user[type] = arrayType;
                        ULP.updateUser(vm.user);
                        break;
                    }
                }
            }
        }
        function deleteAllType(type){
            let YN = prompt("¿Estas seguro que desea eliminar todos los '" + type + "' ? Introduce 'Y' o 'N'")
            if (YN == 'Y') {
                if(type == 'Giphy') vm.user.giphy = [];
                else if(type == 'Marvel') vm.user.marvel = [];
            }
        }
    }
})();