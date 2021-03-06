angular.module('todoService', [])

    // super simple service
    // each function returns a promise object
    .factory('Services', ['$http', function ($http) {
        return {
            getUser: function () {
                return $http.get('/api/info/');
            },
            createUser: function (userData) {
                return $http.post('/api/createUser', userData);
            },
            login: function (userData) {
                return $http.post('/api/login', userData);
            },
            deposit: function (userData) {
                return $http.post('/api/deposit', userData);
            },
            withdraw: function (userData) {
                return $http.post('/api/withdraw', userData);
            },
            transfer: function (userData) {
                return $http.post('/api/transfer', userData);
            },
            buy1: function (userData) {
                return $http.post('/api/buy1', userData);
            },
            buy2: function (userData) {
                return $http.post('/api/buy2', userData);
            },
            getBuyRecord: function (userData) {
                return $http.post('/api/buyRecord', userData);
            },
        }
    }]);