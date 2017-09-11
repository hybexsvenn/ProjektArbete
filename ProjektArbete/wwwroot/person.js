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




var chartChoosenPerson = function (id) {
    GetPicture(id);
    $.ajax({
        url: "/Api/Party/V",
        type: 'GET',
        dataType: 'json',
        success: function (r) {
            console.log(r);
            var thisParty = r;
            $('#pieJChart').remove();
            $('#divPersonCanvas').append('<canvas id="pieJChart" width="400" height="200"></canvas>');
            var ctx = document.getElementById("pieJChart");
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Ja", "Nej", "Avstår", "Frånvarande"],
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                            data: [12, 13, 14, 15]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: thisParty.party + 's röstning'
                    }
                }
            });
        }
    });
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

    $scope.selectedPerson = function (id) {
        $scope.showPersonBarChart = true;
        chartChoosenPerson(id);
    }

    $scope.change = function (search) {
        if (search.length > 1) {
            $scope.searchBar = true;
        } else {
            $scope.searchBar = false;
        }
    };
});

// funktion för att få bild med hjälp av intressent id
function GetPicture(id) {
    var pictureIt = GetPersonFromDataRiksdagen(id);
    $('#theImg').remove();
    $('#forImg').append('<img id="theImg"; src="' + pictureIt + '" alt="" style="width:200px;height:200px;">');
}


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