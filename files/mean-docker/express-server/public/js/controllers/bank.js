angular.module('bankController', [])

    .controller('bankUserController', ['$scope', '$http', 'Services', function ($scope, $http, Services) {
        $scope.formData = {};
        $scope.state = window.location.search;
        $scope.existUser = false
        $scope.userData = {};
        $scope.loading = true;
        var tempList = $scope.state.split("&")
        $scope.formData.name = tempList[0].split("=")[1]
        $scope.formData.password = tempList[1].split("=")[1]
        Services.login($scope.formData)
            // if successful creation, call our get function to get all the new todos
            .success(function (data) {
                $scope.loading = false;
                $scope.userData = data[0];
                if ($scope.userData.length !== 0) {
                    $scope.existUser = true
                } else
                    $scope.existUser = false
            });
        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.deposit = function () {
            if ($scope.formData.name != undefined && $scope.formData.password != undefined && $scope.formData.amount != undefined) {
                $scope.loading = true;
                Services.deposit($scope.formData)
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.userData = data[0];
                        $scope.formData.amount = 0
                    });
            }
        };

        $scope.withdraw = function () {
            if ($scope.formData.name != undefined && $scope.formData.password != undefined && $scope.formData.amount != undefined) {
                $scope.loading = true;
                Services.withdraw($scope.formData)
                    .success(function (data) {
                        $scope.loading = false;
                        $scope.userData = data[0];
                        $scope.formData.amount
                    });
            }
        };
    }]);