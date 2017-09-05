var app = angular.module("myApp", []);

app.controller("testController", function ($scope) {
    $scope.testValue = 'Hej yada';
    $scope.foo = true;
    $scope.hover = false;
    $scope.onClickValuekk = function () {
        $scope.foo = !$scope.foo;
    };
    $scope.loadPartyData = function (id) {
        $scope.showPartyBarChart = true;
        $scope.value = chartChoosenParty(id);


    };
});




