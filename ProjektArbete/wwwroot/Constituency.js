﻿var listOfConstituency;
var specificConstituency;
var listOfPartyVotes;
var listofPartForX = [];
var r;

var x;





function GetConstituency(name) {
    $.ajax({
        url: "/API/Constituency/" + name,
        type: 'GET',
        success: function (response) {
            console.log(response);
            specificConstituency = response;
            if (specificConstituency !== undefined) {
                doStuffe();
            }

        }
    });
}

function doStuffe() {
    //console.log($scope.showPersonBarChart);
    r = ChangeTheFormatOfYear(specificConstituency, "year");
    console.log(r);
    listOfPartyVotes = ByYear("2014", "2017", r, "year");
    console.log(listOfPartyVotes);
    CountingTogether(listOfPartyVotes);
    console.log(listofPartForX);
    GenerateChartConstituency(listofPartForX);
    //$scope.searchBar = false;
}

$(document).ready(function () {
    if (sliderStart === undefined) {
        sliderStart = 2014;
        sliderEnd = 2016;
    }
    $("#date").val(ChangeTheBackFormatOfYear(sliderStart) + " - " + ChangeTheBackFormatOfYear(sliderEnd));

    var temp = false;
    $("#slider-range").mousedown(function () {
        temp = true;
    });
    $("body").mouseup(function () {
        if (temp === true) {
            console.log(r);
            listOfPartyVotes = ByYear(sliderStart, sliderEnd, r, "year");
            CountingTogether(listOfPartyVotes);
            GenerateChartConstituency(listofPartForX);

            temp = false;
        }
    });
});

function CountingTogether(r) {
    listofPartForX = [];
    for (var i = 0; i < r.length; i++) {
        if (ifExist(r[i].vote, listofPartForX, "rost")) {
            var a = functiontofindIndexByKeyValue(listofPartForX, "rost", r[i].vote);
            var t = listofPartForX[a].pro;
            listofPartForX[a].pro = t + r[i].percentageAbsence;
            listofPartForX[a].divNum += 1;
        }
        else {
            listofPartForX.push({ rost: r[i].vote, pro: r[i].percentageAbsence, divNum: 1 });
        }
    }
    for (i = 0; i < listofPartForX.length; i++) {
        listofPartForX[i].pro = listofPartForX[i].pro / listofPartForX[i].divNum;
    }
}


app.controller("testController", function ($scope) {
    function geo(lat, long) {
        $.ajax({
            url: "/API/ConstituencyAsync/" + lat + ";" + long,
            type: 'GET',
            success: function (response) {
                console.log(response);
                listOfConstituency = response.constituencyList;
                SetList();
                specificConstituency = response.constituencyVM;
                if (specificConstituency !== undefined) {
                    doStuffe();
                    $scope.showSpecificConstituency = true;
                }
            }
        });
    }
    $(document).ready(function () {
        $scope.showSpecificConstituency = false;
        getLocation();
    });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        geo(position.coords.latitude, position.coords.longitude);
    }
    $scope.listOfSearch = listOfConstituency;

    $scope.search = "";

    function SetList() {
        $scope.listOfSearch = listOfConstituency;
        console.log(listOfConstituency);
    }


    $scope.selectedConstituency = function (id) {
        $scope.showSpecificConstituency = true;
        GetConstituency(id);
        $scope.searchBar = false;
    };
    $scope.change = function (search) {
        if (search.length > 1) {
            $scope.searchBar = true;
        } else {
            $scope.searchBar = false;
        }
    };
});

function GenerateChartConstituency(ar) {
    if (ar.length > 0) {
        var alt = [{ vote: "Ja", pro: 0 }, { vote: "Nej", pro: 0 }, { vote: "Avstår", pro: 0 }, { vote: "Frånvarande", pro: 0 }];
        var num = [];
        for (var i = 0; i < ar.length; i++) {
            if (ar[i].rost === alt[0].vote) {
                alt[0].pro = ar[i].pro;
            }
            else if (ar[i].rost === alt[1].vote) {
                alt[1].pro = ar[i].pro;
            }
            else if (ar[i].rost === alt[2].vote) {
                alt[2].pro = ar[i].pro;
            }
            else if (ar[i].rost === alt[3].vote) {
                alt[3].pro = ar[i].pro;
            }
        }
        //console.log(specificConstituency);
        $('#pieJChart').remove();
        $('#divPersonCanvas').append('<canvas id="pieJChart" width="400" height="200"></canvas>');
        var ctx = document.getElementById("pieJChart");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [alt[0].vote, alt[1].vote, alt[2].vote, alt[3].vote],
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                        data: [alt[0].pro, alt[1].pro, alt[2].pro, alt[3].pro]
                    }
                ]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    text: specificConstituency[0].constituency + 's röstning'
                }
            }
        });
    }

}
