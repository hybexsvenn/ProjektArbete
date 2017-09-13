var listofPartForX = [];
var ret;

var chartChoosenParty = function (id) {
    $.ajax({
        url: "/Api/Party/" + id,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (re) {
            ret = ChangeTheFormatOfYear(re, "year");
            sliderFirstDateSet = FirstDate(ret, "year");
            sliderLastDateSet = LastDate(ret, "year");
            listOfPartyVotes = ByYear("2014", "2017", ret, "year");
            CountingTogether(listOfPartyVotes);
        }
    });
    GenerateChartParty(listofPartForX);
};

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
    for (var j = 0; j < listofPartForX.length; j++) {
        listofPartForX[j].pro = listofPartForX[j].pro / listofPartForX[j].divNum;
    }
}


function GenerateChartParty(ar) {
    console.log(ar);
    $('#pieChart').remove();
    if (ar.length === 4) {
        $('#divCanvas').append(' <canvas id="pieChart" width="400" height="200"></canvas>');
        var ctx = document.getElementById("pieChart");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [ar[0].rost, ar[1].rost, ar[2].rost, ar[3].rost],
                //labels: [ar[0].rost, ar[1].rost, ar[2].rost, ar[3].rost],
                datasets: [
                    {
                        label: "Population (millions)",
                        //backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                        backgroundColor: ["#FFBC50", "#572B65", "#41B24E", "#B23933"],
                        data: [ar[0].pro.toFixed(2), ar[1].pro.toFixed(2), ar[2].pro.toFixed(2), ar[3].pro.toFixed(2)]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: GetFullPartyName(ret[0].party) + 's röstning'
                }
            }
        });
    } else {
        $('#divCanvas').append(' <canvas id="pieChart" width="400" height="200"></canvas>');
        ctx = document.getElementById("pieChart");
    }
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
            listOfPartyVotes = ByYear(sliderStart, sliderEnd, ret, "year");
            CountingTogether(listOfPartyVotes);
            console.log(listOfPartyVotes);
            GenerateChartParty(listofPartForX);
            temp = false;
        }
    });
});