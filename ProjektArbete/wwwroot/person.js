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
                        p[i].firstName + " " + p[i].lastName + " [" + p[i].party.toUpperCase() + "]",
                    Id:
                        p[i].id
                });

            }

            myArr = getName;
            //console.log(getName);
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
            //console.log(re);
            r = ChangeTheFormatOfYear(re, "parliamentaryYear");
            console.log(r);
            listOfPartyVotes = ByYear("2014", "2017", r, "parliamentaryYear");
            //console.log(listOfPartyVotes);
            CountingTogether(listOfPartyVotes);
            //console.log(listofPartForX);
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
            console.log(r);
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
        //console.log(myArr);
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

// funktion för att få bild med hjälp av intressent id
function GetPicture(id) {
    var pictureIt = GetPersonFromDataRiksdagen(id);
    
    var foreft = pictureIt[0].person.tilltalsnamn + ' ' + pictureIt[0].person.efternamn;
    $('#personInfo').remove();
    var content = '<div id="personInfo" class="center">';
    content += '<h1>' + foreft + '</h1>';
    content += '<img id="theImg"; src="' + pictureIt[0].person.bild_url_192 + '" alt="' + foreft +'" >';
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
    if (ar.length > 0) {
        var alt = [{ vote: "Ja", pro: 0 }, { vote: "Nej", pro: 0 }, { vote: "Avstår", pro: 0 }, { vote: "Frånvarande",pro :0 }];
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
        console.log(alt);
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
                    text: GetFullPartyName(r[0].party) + 's röstning'
                }
            }
        });
    }

}