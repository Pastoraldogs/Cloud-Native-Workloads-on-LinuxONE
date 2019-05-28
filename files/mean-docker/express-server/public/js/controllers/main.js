angular.module('todoController', [])

    // inject the Todo service factory into our controller
    .controller('mainController', ['$scope', '$http', 'Services', function ($scope, $http, Services) {
        $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Services.get()
            .success(function (data) {
                $scope.todos = data;
                $scope.loading = false;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.text != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Services.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data; // assign our new list of todos
                    });





            }


        };

        // DELETE ==================================================================
        // delete a todo after checking it
        $scope.deleteTodo = function (id) {
            $scope.loading = true;

            Services.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function (data) {
                    $scope.loading = false;
                    $scope.todos = data; // assign our new list of todos
                });
        };
    }])
    .controller('userController', ['$scope', '$http', 'Todos', function ($scope, $http, Todos) {
        $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Services.getUser()
            .success(function (data) {
                $scope.users = data;
                $scope.loading = false;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createUser = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.name != undefined && $scope.formData.password != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Services.createUser($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.users = data; // assign our new list of todos
                    });

            }

        };
    }]);