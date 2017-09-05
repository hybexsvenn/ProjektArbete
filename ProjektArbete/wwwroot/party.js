var chartChoosenParty = function (id) {
    $.ajax({
        url: "/Api/Party/"+id,
        type: 'GET',
        dataType: 'json',
        success: function (r) {
            var thisParty = r;
            var ctx = document.getElementById("pieChart");
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Ja", "Nej", "Avstår", "Frånvarande"],
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                            data: [thisParty.vote.yes, thisParty.vote.no, thisParty.vote.refrain, thisParty.vote.abscense]
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