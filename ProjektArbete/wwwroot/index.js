


$(document).ready(function () {
    $.ajax({
        url: "/Api/Index",
        type: 'GET',
        dataType: 'json',
        success: function (r) {
            console.log(r);
            var V = [];
            for (var i = 0; i < r.length; i++) {
                if (r[i].party === "-") {

                } else if (r[i].party === "V") {
                    V.push(r[i].percentageAbsence);
                }
            }
            var VP = 0;
            for (var i = 0; i < V.length; i++) {
                VP += V[i];
            }
            var VPP = VP / V.length;

            console.log(V.length);
            console.log(VP);
            console.log(VPP);
            






            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [r[0].party, r[1].party, r[2].party, r[3].party, r[4].party, r[5].party, r[6].party, r[7].party],
                    datasets: [{
                        label: 'Närvaro',
                        data: [r[0].percentageAbsence, r[1].percentageAbsence, r[2].percentageAbsence, r[3].percentageAbsence, r[4].percentageAbsence, r[5].percentageAbsence, r[6].percentageAbsence, r[7].percentageAbsence],
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
    });
});

