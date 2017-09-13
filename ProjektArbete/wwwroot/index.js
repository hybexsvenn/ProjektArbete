var r = [];
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
            for (var i = 0; i < re.length; i++) {
                if (re[i].party !== "-") { r.push(re[i]); }
            }
            r = ChangeTheFormatOfYear(r, "year");
            listOfPartbetweenStartAndEndYear = ByYear("2014", "2017", r, "year");
            GetProcentByParty(listOfPartbetweenStartAndEndYear);
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

function GenerateChartIndex(indata) {
    if (indata.length === 7) {
        indata.push({ party: "SD", partyA: 100 });
    }
    $('#myChart').remove();
    $('#indexDivCanvas').append(' <canvas id="myChart" width="500" height="200"></canvas>');
    var ctx = document.getElementById("myChart").getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [indata[0].party, indata[1].party, indata[2].party, indata[3].party, indata[4].party, indata[5].party, indata[6].party, indata[7].party],
            datasets: [{
                label: 'Närvaro',
                data: [(100 - indata[0].partyA).toFixed(2), (100 - indata[1].partyA).toFixed(2), (100 - indata[2].partyA).toFixed(2), (100 - indata[3].partyA).toFixed(2), (100 - indata[4].partyA).toFixed(2), (100 - indata[5].partyA).toFixed(2), (100 - indata[6].partyA).toFixed(2), (100 - indata[7].partyA).toFixed(2)],
                backgroundColor: [
                    'rgba(218, 41, 28, 0.8)',
                    'rgba(237, 27, 52, 0.8)',
                    'rgba(83, 160, 69, 0.8)',
                    'rgba(1, 106, 58, 0.8)',
                    'rgba(0, 106, 179, 0.8)',
                    'rgba(0, 94, 161, 0.8)',
                    'rgba(82, 189, 236, 0.8)',
                    'rgba(251, 199, 0, 0.8)'
                ],
                borderColor: [
                    'rgba(218, 41, 28 1)',
                    'rgba(237, 27, 52, 1)',
                    'rgba(83, 160, 69, 1)',
                    'rgba(1, 106, 58, 1)',
                    'rgba(0, 106, 179, 1)',
                    'rgba(0, 94, 161, 1)',
                    'rgba(82, 189, 236, 1)',
                    'rgba(251, 199, 0, 1)'
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
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel + ' %';
                    },
                    title: function (tooltipItem, data) {
                        tooltipItem[0].xLabel = GetFullPartyName(tooltipItem[0].xLabel);

                        return 'Närvaro för ' + tooltipItem[0].xLabel;
                    }
                }
            }
        }
    });
}
