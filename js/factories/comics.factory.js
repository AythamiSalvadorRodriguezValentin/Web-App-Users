(function() {
    'use strict';

    angular
        .module('APP_FAV')
        .factory('UserLocalProvider', UserLocalProvider);

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
        function getUsersAll() {
            return ('usersList' in localStorage) ? JSON.parse(localStorage.getItem('usersList')) : [];
        };
        function getUser(id){
            let users = getUsersAll();
            for (let i = 0; i < users.length; i++) {
                const u = users[i];
                if (u.id == id) return u;
            }
        };
        function addUser(user){
            let users = getUsersAll();
            user.id = randId();
            users.push(user);
            localStorage.setItem('usersList',JSON.stringify(users));
            return user;
        };
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