var app = angular.module("myApp", []);



app.controller("testController", function ($scope) {
    $scope.testValue = 'Hej yada';
    $scope.foo = true;
    $scope.hover = false;
    $scope.onClickValuekk = function () {
        $scope.foo = !$scope.foo;
    };
    //$scope.mouseoverImage = function () {
    //    $scope.logos = { "opacity": "0.3" };
    //};
    //$scope.mouseoverThisImage = function () {
    //    $scope.hover = true;
    //};

    //$scope.mouseoverOut = function () {
    //    $scope.logos = { "opacity": "1" };
    //    $scope.hover = false;
    //};

    $scope.loadPartyData = function () {
        $scope.showPartyBarChart = true;
        $scope.value = kalle();
    };
});




var kalle = function () {
    $.ajax({
        url: "/Data/Person",
        type: 'GET',
        dataType: 'json',
        success: function (r) {
            var ar = r[0];
            var ctx = document.getElementById("pieChart");
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [r[0].firstName, r[1].firstName, r[2].firstName, "1", "3"],
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                            data: [r[0].id*100, 5267, 734, 784, 433]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Predicted world population (millions) in 2050'
                    }
                }
            });
        }
    });


    //var ctx = document.getElementById("pieChart");
    //var myPieChart = new Chart(ctx, {
    //    type: 'pie',
    //    data: data,
    //    options: options
    //}); 
    //}
    //});
};