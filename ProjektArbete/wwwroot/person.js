//$(document).ready(function () {
//    foo();
//});
var myArr;

//$(document).ready(
function foo() {
    $.ajax({
        url: "/Api/Person",
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (p) {
            var getName = [];

            for (var i = 0; i < 3; i++) {
                //getName = p[i].firstName + " " + getName;
                getName.push(p[i].firstName);
            }

            //console.log(getName);

            //getName.split(" ");

            myArr = getName;

            console.log(getName);

        }

    });
}
//foo();
//});
app.controller("testController", function ($scope) {

    //console.log(myArr);
    //while (myArr === undefined) {

        if (myArr === undefined) {
            console.log(myArr);
            foo();
            //$scope.listOftodo = myArr;

        }
        else {

            $scope.listOftodo = myArr;
            $scope.search = "";
            $scope.showPer = !$scope.showPer;
        }
    //}
    $scope.listOftodo = myArr;

    $scope.search = "";
    $scope.showPer = !$scope.showPer;

});



//$(document).ready(function () {
//    $.ajax({
//        url: "/Api/Person",
//        type: 'GET',
//        dataType: 'json',
//        success: function (p) {
//            var ctx = document.getElementById("personChart").getContext('2d');
//            var myChart = new Chart(ctx, {
//                type: 'bar',
//                data: {
//                    labels: [p[0].firstName],
//                    datasets: [{
//                        label: 'Närvaro',
//                        data: [p[0].abscense],
//                        backgroundColor: [
//                            'rgba(255, 99, 132, 0.2)',
//                            'rgba(54, 162, 235, 0.2)',
//                            'rgba(255, 206, 86, 0.2)',
//                            'rgba(75, 192, 192, 0.2)',
//                            'rgba(153, 102, 255, 0.2)',
//                            'rgba(153, 102, 255, 0.2)',
//                            'rgba(153, 102, 255, 0.2)',
//                            'rgba(255, 159, 64, 0.2)'
//                        ],
//                        borderColor: [
//                            'rgba(255,99,132,1)',
//                            'rgba(54, 162, 235, 1)',
//                            'rgba(255, 206, 86, 1)',
//                            'rgba(75, 192, 192, 1)',
//                            'rgba(153, 102, 255, 1)',
//                            'rgba(153, 102, 255, 1)',
//                            'rgba(153, 102, 255, 1)',
//                            'rgba(255, 159, 64, 1)'
//                        ],
//                        borderWidth: 1
//                    }]
//                },
//                options: {
//                    scales: {
//                        yAxes: [{
//                            ticks: {
//                                beginAtZero: true
//                            }
//                        }]
//                    }
//                }
//            });
//        }
//    });
//});