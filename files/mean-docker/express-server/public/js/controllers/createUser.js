angular.module('createUserController', [])

    .controller('userController', ['$scope', '$http', 'Services', function ($scope, $http, Services) {
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
            if ($scope.formData.name != undefined && $scope.formData.password != undefined && $scope.formData.password2 != undefined) {
                $scope.loading = true;
                if ($scope.formData.password === $scope.formData.password2) {
                    Services.createUser($scope.formData)
                        .success(function (data) {
                            $scope.loading = false;
                            $scope.formData = {}; // clear the form so our user is ready to enter another
                            $scope.users = data; // assign our new list of todos
                            window.location.href = "./login.html"
                        });
                } else alert("两次密码必须一致")
            } else alert("请完善信息")
        };
    }]);