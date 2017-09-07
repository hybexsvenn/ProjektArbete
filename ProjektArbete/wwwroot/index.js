﻿$(document).ready(function () {
    $.ajax({
        url: "/Api/Index",
        type: 'GET',
        dataType: 'json',
        success: function (r) {
            console.log(r);
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
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
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

