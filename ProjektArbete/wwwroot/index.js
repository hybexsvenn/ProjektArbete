var r = [];
var sliderStart;
var sliderEnd;
var listOfPartbetweenStartAndEndYear = [];
var listofPartForX;

$(document).ready(function () {
    $.ajax({
        url: "/Api/Index",
        type: 'GET',
        dataType: 'json',
        success: function (re) {
            listofPartForX = [];
            for (var i = 0; i < re.length; i++) {
                if (re[i].party === "-") {

                }
                else {
                    re[i].year = re[i].year.substring(0, re[i].year.length - 3);
                    r.push(re[i]);
                }
            }
            ByYear("2014", "2017");
            GetProcentByParty(listOfPartbetweenStartAndEndYear);
            GenerateChartIndex(listofPartForX);
        }
    });
    $("#date").val("2014/15 - 2016/17");
    var temp = false;
    $("#slider-range").mousedown(function () {
        temp = true;
    });
    $("body").mouseup(function () {
        if (temp === true) {
            ByYear(sliderStart, sliderEnd);
            GetProcentByParty(listOfPartbetweenStartAndEndYear);
            GenerateChartIndex(listofPartForX);
            temp = false;
        }
    });
});

function ByYear(start, end) {
    for (var i = 0; i < r.length; i++) {
        if (r[i].year >= start && r[i].year <= end) {
            listOfPartbetweenStartAndEndYear.push({ party: r[i].party, percentageAbsence: r[i].percentageAbsence })
        }
    }
}

function GetProcentByParty(ret) {

    for (var i = 0; i < ret.length; i++) {
        if (ifExist(ret[i].party, listofPartForX, "party")) {
            var a = functiontofindIndexByKeyValue(listofPartForX, "party", ret[i].party);
            var t = listofPartForX[a].partyA;
            listofPartForX[a].partyA = ((t + ret[i].percentageAbsence) / 2)
        }
        else {
            listofPartForX.push({ party: ret[i].party, partyA: ret[i].percentageAbsence });
        }
    }
}

$(function () {
    $("#slider-range").slider({
        range: true,
        min: 2003,
        max: 2017,
        values: [2013, 2015],
        slide: function (event, ui) {
            $("#date").val(ui.values[0] + "/" + ((ui.values[0] % 100) + 1) + " - " + ui.values[1] + "/" + ((ui.values[1] % 100) + 1));         
            sliderStart = ui.values[0];
            sliderEnd = ui.values[1];
        }
    });

    $("#slider-range").mousedown(function () {
        $("#date").append("<span style='color:#00f;'>Mouse down.</span>");
    });
});

function GenerateChartIndex(indata) {
     $('#myChart').remove();
     $('#indexDivCanvas').append(' <canvas id="myChart" width="400" height="200"></canvas>');
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [indata[0].party, indata[1].party, indata[2].party, indata[3].party, indata[4].party, indata[5].party, indata[6].party, indata[7].party],
            datasets: [{
                label: 'Närvaro',
                data: [100 - indata[0].partyA, 100 - indata[1].partyA, 100 - indata[2].partyA, 100 - indata[3].partyA, 100 - indata[4].partyA, 100 - indata[5].partyA, 100 - indata[6].partyA, 100 - indata[7].partyA],
                backgroundColor: [
                    'rgba(237, 28, 36, 0.8)',
                    'rgba(237, 27, 52, 0.8)',
                    'rgba(83, 160, 69, 0.8)',
                    'rgba(1, 106, 58, 0.8)',
                    'rgba(0, 106, 179, 0.8)',
                    'rgba(0, 93, 160, 0.8)',
                    'rgba(13, 157, 219, 0.8)',
                    'rgba(37, 34, 85, 0.8)'
                ],
                borderColor: [
                    'rgba(237, 28, 36, 1)',
                    'rgba(237, 27, 52, 1)',
                    'rgba(83, 160, 69, 1)',
                    'rgba(1, 106, 58, 1)',
                    'rgba(0, 106, 179, 1)',
                    'rgba(0, 93, 160, 1)',
                    'rgba(13, 157, 219, 1)',
                    'rgba(37, 34, 85, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
  