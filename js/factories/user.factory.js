(function() {
    'use strict';
    ////////////////////////////////////////////////////////////
    angular
        .module('Agend_User')
        .factory('UserLocalProvider', UserLocalProvider);
    ////////////////////////////////////////////////////////////
    UserLocalProvider.$inject = [];
    function UserLocalProvider() {
        var service = {
            getUsersAll:getUsersAll,
            getUser:getUser,
            addUser:addUser,
            updateUser:updateUser,
            deleteUser:deleteUser
        };
        return service;
        /////////////////////////////////////////// FUCTION USERS ///////////////////////////////////////////
        /**
         * Devuelve una array de usuarios (lista de usuario).
         */
        function getUsersAll() {
            return ('usersList' in localStorage) ? JSON.parse(localStorage.getItem('usersList')) : [];
        };
        /**
         * 
         * @param {*} id 'String': identificador de un usuario.
         * El identificador se genera automáticamente al añadir un usuario nuevo.
         * Devuelve un usuario a través de su indentificador. 
         */
        function getUser(id){
            let users = getUsersAll();
            for (let i = 0; i < users.length; i++) {
                const u = users[i];
                if (u.id == id) return u;
            }
        };
        /**
         * 
         * @param {*} user 'Object': es un objecto que contiene todos los datos de un usuario.
         * Se genera automáticamente un identificador al añadir un usuario nuevo.
         * Esta función añade un usuario a la lista de usuarios.
         */
        function addUser(user){
            let users = getUsersAll();
            user.id = randId();
            users.push(user);
            localStorage.setItem('usersList',JSON.stringify(users));
            return user;
        };
        /**
         * 
         * @param {*} user 'Object': es un objecto que contiene todos los datos de un usuario.
         * Esta función actualiza un usuario existente en la lista de usuarios.
         */
        function updateUser(user){
            let users = getUsersAll();
            for (let i = 0; i < users.length; i++) {
                const u = users[i];
                if (u.id == user.id){
                    users[i] = user;
                    break;
                }  
            }
            localStorage.setItem('usersList',JSON.stringify(users));
        };
        /**
         * 
         * @param {*} id 'String': identificador de un usuario.
         * Esta función elimina un usuario de la lista de usuarios.
         * El identificador se genera automáticamente al añadir un usuario nuevo.
         * ¡Es necesario confirmar en pantalla!
         * 
         */
        function deleteUser(id){
            let users = getUsersAll();
            for (let i = 0; i < users.length; i++) {
                const u = users[i];
                if (u.id == id) {
                    users.splice(i,1);
                    break;
                }
            }
            localStorage.setItem('usersList',JSON.stringify(users));
        };
        /////////////////////////////////////////// OTHER FUCTION /////////////////////////////////////////
        function randId(){
            return Math.random().toString(36).substr(2, 10);
        }
    }
})();