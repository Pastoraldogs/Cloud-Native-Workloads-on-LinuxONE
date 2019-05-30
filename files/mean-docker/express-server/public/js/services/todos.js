angular.module('todoService', [])

    // super simple service
    // each function returns a promise object
    .factory('Services', ['$http', function ($http) {
        return {
            get: function () {
                return $http.get('/api/todos');
            },
            create: function (todoData) {
                return $http.post('/api/todos', todoData);
            },
            delete: function (id) {
                return $http.delete('/api/todos/' + id);
            },
            getUser: function () {
                return $http.get('/api/info/');
            },
            createUser: function (userData) {
                return $http.post('/api/createUser', userData);
            },
            login: function (userData) {
                return $http.post('/api/login', userData);
            },
            deposit: function () {
                return $http.post('/api/deposit', userData);

            }
        }
    }]);