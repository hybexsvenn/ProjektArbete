﻿var myArr;
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
                    p[i].firstName + " " + p[i].lastName + " [" + p[i].party.toUpperCase() + "]",
                    Id:
                    p[i].id
                });
            }
            myArr = getName;
        }
    });
}

var listOfPartyVotes;
var listofPartForX = [];
var r;

var chartChoosenPerson = function (id) {
    GetPicture(id);
    $.ajax({
        url: "/Api/SinglePerson/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (re) {
            r = ChangeTheFormatOfYear(re, "parliamentaryYear");
            listOfPartyVotes = ByYear("2014", "2017", r, "parliamentaryYear");
            CountingTogether(listOfPartyVotes);
            GenerateChartPerson(listofPartForX);
        }
    });
};

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
            listOfPartyVotes = ByYear(sliderStart, sliderEnd, r, "parliamentaryYear");
            CountingTogether(listOfPartyVotes);
            GenerateChartPerson(listofPartForX);

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
            listofPartForX[a].pro = t + r[i].abscense;
            listofPartForX[a].divNum += 1;
        }
        else {
            listofPartForX.push({ rost: r[i].vote, pro: r[i].abscense, divNum: 1 });
        }
    }
    for (i = 0; i < listofPartForX.length; i++) {
        listofPartForX[i].pro = listofPartForX[i].pro / listofPartForX[i].divNum;
    }
}

app.controller("testController", function ($scope) {
    if (myArr === undefined) {
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

var forN;

// funktion för att få bild med hjälp av intressent id
function GetPicture(id) {
    var pictureIt = GetPersonFromDataRiksdagen(id);
    forN = pictureIt[0].person.tilltalsnamn;
    var foreft = pictureIt[0].person.tilltalsnamn + ' ' + pictureIt[0].person.efternamn;
    $('#personInfo').remove();
    var content = '<div id="personInfo" class="center">';
    content += '<h1>' + foreft + '</h1>';
    content += '<img id="theImg" style="border: 1px solid grey"; src="' + pictureIt[0].person.bild_url_192 + '" alt="' + foreft + '" >';
    content += '<p style="font-size: 10px">Foto: Riksdagsförvaltningen</p>';
    content += '<div id="infoContent">';
    content += '<label>Namn:</label>' + ' ' + foreft;
    content += '<br /><label>Parti:</label>' + ' ' + GetFullPartyName(pictureIt[0].person.parti);
    content += '<br /><label>Valkrets:</label>' + ' ' + pictureIt[0].person.valkrets;
    content += '<br /><label>Status:</label>' + ' ' + pictureIt[0].person.status;
    content += '</div>';
    content += '</div>';

    $('#personAPI').append(content);
}

// Funktion för graf
function GenerateChartPerson(ar) {
    $('#pieJChart').remove();
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
        $('#divPersonCanvas').append('<canvas id="pieJChart" width="800" height="400"></canvas>');
        var ctx = document.getElementById("pieJChart");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [alt[0].vote, alt[1].vote, alt[2].vote, alt[3].vote],
                datasets: [
                    {
                        backgroundColor: ["#41B24E", "#B23933", "#ffd952", "#572B65"],
                        data: [alt[0].pro.toFixed(2), alt[1].pro.toFixed(2), alt[2].pro.toFixed(2), alt[3].pro.toFixed(2)]
                    }
                ]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    text: forN + 's röster',
                    fontSize: 20,
                    fontFamily: "'Comfortaa', cursive"                    
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var indice = tooltipItem.index;
                            return data.labels[indice] + ': ' + data.datasets[0].data[indice] + '%';
                        }
                    }
                }
            }
        });
    } else {
        $("#divPersonCanvas").append('<p id="pieJChart" style="text-align: center; margin: 15%;">Det finns ingen data. Testa byta år.</p>');
    }
}