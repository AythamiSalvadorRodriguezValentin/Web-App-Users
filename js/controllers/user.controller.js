(function() {
    'use strict';
    ////////////////////////////////////////////////////////////
    angular
        .module('Agend_User')
        .controller('UserController', UserController);
    ////////////////////////////////////////////////////////////
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
        /**
         * 
         * @param {*} type 'String': 'gif' o 'marvel'
         * @param {*} id 'String': identificador del gif o marvel que deseas eliminar de favoritos.
         * ¡Es necesario confirmar que desea eliminarlo: 'Y' o 'N'!
         */
        function deleteTypeFav(type, id){
            let arrayType = [];
            let YN = prompt("¿Estas seguro que deseas eliminar el '" + type + "' ? Introduce 'Y' o 'N'");
            if (YN == 'Y') {
                if(type == 'Giphy') arrayType = vm.user.giphy;
                else if(type == 'Marvel') arrayType = vm.user.marvel;
                else return;
                for (let i = 0; i < arrayType.length; i++) {
                    if (arrayType[i].id == id){
                        arrayType.splice(i,1);
                        vm.user[type] = arrayType;
                        ULP.updateUser(vm.user);
                        break;
                    }
                }
            }
        }
        /**
         * 
         * @param {*} type 'String': 'gifs' o 'marvel' --> Esta funciona elimina todos los gifs o marvel del usuario.
         */
        function deleteAllType(type){
            let YN = prompt("¿Estas seguro que desea eliminar todos los '" + type + "' ? Introduce 'Y' o 'N'")
            if (YN === 'Y') {
                if(type === 'gifs') vm.user.giphy = [];
                else if(type === 'marvel') vm.user.marvel = [];
                ULP.updateUser(vm.user);
            }
        }
    }
})();