﻿var r = [];
//var sliderStart;
//var sliderEnd;
var listOfPartbetweenStartAndEndYear = [];
var listofPartForX = [];

$(document).ready(function () {
    $.ajax({
        url: "/Api/Index",
        type: 'GET',
        dataType: 'json',
        success: function (re) {
            console.log(re);
            for (var i = 0; i < re.length; i++) {
                if (re[i].party !== "-") { r.push(re[i]); }
            }
            console.log(r);
            r = ChangeTheFormatOfYear(r, "year");
            console.log(r);
            listOfPartbetweenStartAndEndYear = ByYear("2014", "2017", r, "year");
            console.log(listOfPartbetweenStartAndEndYear);
            GetProcentByParty(listOfPartbetweenStartAndEndYear);
            console.log(listofPartForX);
            GenerateChartIndex(listofPartForX);
        }
    });
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
            listOfPartbetweenStartAndEndYear = [];
            console.log(r);
            listOfPartbetweenStartAndEndYear = ByYear(sliderStart, sliderEnd, r, "year");
            console.log(listOfPartbetweenStartAndEndYear);
            GetProcentByParty(listOfPartbetweenStartAndEndYear);
            console.log(listofPartForX);
            GenerateChartIndex(listofPartForX);
            temp = false;
        }
    });
});

function GetProcentByParty(ret) {
    listofPartForX = [];
    for (var i = 0; i < ret.length; i++) {
        if (ifExist(ret[i].party, listofPartForX, "party")) {
            var a = functiontofindIndexByKeyValue(listofPartForX, "party", ret[i].party);
            var t = listofPartForX[a].partyA;
            listofPartForX[a].partyA = (t + ret[i].percentageAbsence) / 2;
        }
        else {
            listofPartForX.push({ party: ret[i].party, partyA: ret[i].percentageAbsence });
        }
    }
}

//$(function () {
//    $("#slider-range").slider({
//        range: true,
//        min: 2003,
//        max: 2017,
//        values: [2013, 2015],
//        slide: function (event, ui) {
//            $("#date").val(ChangeTheBackFormatOfYear(ui.values[0]) + " - " + ChangeTheBackFormatOfYear(ui.values[1]));         
//            sliderStart = ui.values[0];
//            sliderEnd = ui.values[1];
//        }
//    });

//    $("#slider-range").mousedown(function () {
//        $("#date").append("<span style='color:#00f;'>Mouse down.</span>");
//    });
//});

function GenerateChartIndex(indata) {
    console.log(indata);
    if (indata.length === 7) {
        indata.push({ party: "SD", partyA: 100 });
    }
    $('#myChart').remove();
    $('#indexDivCanvas').append(' <canvas id="myChart" width="400" height="200"></canvas>');
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [indata[0].party, indata[1].party, indata[2].party, indata[3].party, indata[4].party, indata[5].party, indata[6].party, indata[7].party],
            datasets: [{
                label: 'Närvaro',
                data: [(100 - indata[0].partyA).toFixed(2), (100 - indata[1].partyA).toFixed(2), (100 - indata[2].partyA).toFixed(2), (100 - indata[3].partyA).toFixed(2), (100 - indata[4].partyA).toFixed(2), (100 - indata[5].partyA).toFixed(2), (100 - indata[6].partyA).toFixed(2), (100 - indata[7].partyA).toFixed(2)],
                backgroundColor: [
                    'rgba(237, 28, 36, 0.8)',
                    'rgba(237, 27, 52, 0.8)',
                    'rgba(83, 160, 69, 0.8)',
                    'rgba(1, 106, 58, 0.8)',
                    'rgba(0, 106, 179, 0.8)',
                    'rgba(0, 93, 160, 0.8)',
                    'rgba(13, 157, 219, 0.8)',
                    'rgba(255, 216, 0, 0.8)'
                ],
                borderColor: [
                    'rgba(237, 28, 36, 1)',
                    'rgba(237, 27, 52, 1)',
                    'rgba(83, 160, 69, 1)',
                    'rgba(1, 106, 58, 1)',
                    'rgba(0, 106, 179, 1)',
                    'rgba(0, 93, 160, 1)',
                    'rgba(13, 157, 219, 1)',
                    'rgba(255, 216, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }]
            }
        }
    });
}
