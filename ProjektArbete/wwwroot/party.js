var listofPartForX = [];
var r;

var chartChoosenParty = function (id) {
    $.ajax({
        url: "/Api/Party/"+id,
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (re) {
            r = ChangeTheFormatOfYear(re, "year");
            listOfPartyVotes = ByYear("2014", "2017", r, "year");
            CountingTogether(listOfPartyVotes)
        }
    });
    GenerateChartParty(listofPartForX);
};

function CountingTogether(r) {
    for (var i = 0; i < r.length; i++) {
        if (ifExist(r[i].vote, listofPartForX, "rost")) {
            var a = functiontofindIndexByKeyValue(listofPartForX, "rost", r[i].vote);
            var t = listofPartForX[a].pro;
            listofPartForX[a].pro = ((t + r[i].percentageAbsence) / 2)
        }
        else {
            listofPartForX.push({ rost: r[i].vote, pro: r[i].percentageAbsence });
        }
    }
}


function GenerateChartParty(ar) {
    console.log(ar);
    $('#pieChart').remove();
    $('#divCanvas').append(' <canvas id="pieChart" width="400" height="200"></canvas>');
    var ctx = document.getElementById("pieChart");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [ar[0].rost, ar[1].rost, ar[2].rost, ar[3].rost],
            datasets: [
                {
                    label: "Population (millions)",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                    data: [ar[0].pro.toFixed(2), ar[1].pro.toFixed(2), ar[2].pro.toFixed(2), ar[3].pro.toFixed(2)]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: GetFullPartyName(r[0].party) + 's röstning'
            }
        }
    });
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
            listOfPartyVotes = ByYear(sliderStart, sliderEnd, r, "year");
            CountingTogether(listOfPartyVotes)
            GenerateChartParty(listofPartForX);
            temp = false;
        }
    });
})