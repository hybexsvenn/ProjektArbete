var chartChoosenParty = function (id) {
    $.ajax({
        url: "/Api/Party/"+id,
        type: 'GET',
        dataType: 'json',
        success: function (r) {
            for (var i = 0; i < r.length; i++) {
                if (ifExist(r[i].vote)) {
                    var a = functiontofindIndexByKeyValue(listofPartForX, "rost", r[i].vote);
                    var t = listofPartForX[a].pro;
                    listofPartForX[a].pro = ((t + r[i].percentageAbsence) / 2)
                }
                else {
                    listofPartForX.push({ rost: r[i].vote, pro: r[i].percentageAbsence });
                }
            }


            console.log(listofPartForX);
            console.log(r);
            var thisParty = r;
            $('#pieChart').remove();
            $('#divCanvas').append(' <canvas id="pieChart" width="400" height="200"></canvas>');
            var ctx = document.getElementById("pieChart");
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [listofPartForX[0].rost, listofPartForX[1].rost, listofPartForX[2].rost, listofPartForX[3].rost],
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                            data: [listofPartForX[0].pro, listofPartForX[1].pro, listofPartForX[2].pro, listofPartForX[3].pro]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: r[0].party + ' röstning'
                    }
                }
            });
        }
    });
};

var listofPartForX = [];

function ifExist(inValu) {
    if (listofPartForX.length === 0) {
        return false;
    }
    else {
        for (var i = 0; i < listofPartForX.length; i++) {
            if (inValu === listofPartForX[i].rost) { return true; }
        }
        return false;
    }
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i][key] === valuetosearch) {
            return i;
        }
    }
    return null;
}