var myArr;
function foo() {
    $.ajax({
        url: "/Api/Person",
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (p) {
            var getName = [];

            for (var i = 0; i < p.length; i++) {
                getName.push({
                    person:
                    (p[i].firstName + " " + p[i].lastName + " [" + p[i].party.toUpperCase() + "]"),
                    Id: p[i].id
                });

            }

            myArr = getName;
            console.log(getName);
        }
    });
}

function selectedPerson(id) {
    console.log(id);
};


app.controller("testController", function ($scope) {

    if (myArr === undefined) {
        console.log(myArr);
        foo();
    }
    else {
        $scope.listOfSearch = myArr;
        $scope.search = "";
    }
    $scope.listOfSearch = myArr;
    $scope.search = "";


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