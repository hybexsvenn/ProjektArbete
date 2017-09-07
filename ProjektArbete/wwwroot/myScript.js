$(document).ready(function main() {
    $('.partyLogo').hover(function () {
        $('.partyLogo').not(this).toggleClass('opacityLogos');
    });

    fixNavBar();
});

function fixNavBar() {
    $(".navbar-nav").children('li').each(function () {

        var myHref = $(this).children('a').first().attr('href');

        if (window.location.href.endsWith(myHref)) {
            $(this).addClass('active');
        }
        else {
            $(this).removeClass('active');
        }
    });
}

// Range slider
var dataForIndex;

$(function () {

    $("#slider-range").slider({
        range: true,
        min: 2003,
        max: 2017,
        values: [2014, 2017],
        slide: function (event, ui) {
            $("#date").val(ui.values[0] + " - " + ui.values[1]);
            dataForIndex  = ui.values[0] + ";" + ui.values[1];
        }
    });

    $("#date").val($("#slider-range").slider("values", 0) +
        $("#slider-range").slider("values", 1));

    $("#slider-range").mousedown(function () {
        $("#date").append("<span style='color:#00f;'>Mouse down.</span>");
    });

    //$('li a').click(function (e) {
    //    var $this = $(this);
    //    if (!$this.hasClass('active')) {
    //        $this.addClass('active');
    //    }
    //    e.preventDefault();
    //});

});

$(document).ready(function () {
    $("#date").val("2014 - 2017");
    var temp = false;
    $("#slider-range").mousedown(function () {
        temp = true;
    });

        $("body").mouseup(function () {
            if (temp === true) {
                $.ajax({
                    url: "/Api/Index/" + dataForIndex,
                    type: 'GET',
                    dataType: 'json',
                    success: function (r) {
                        console.log(r);
                        $('#myChart').remove();
                        $('#indexDivCanvas').append(' <canvas id="myChart" width="400" height="200"></canvas>');
                        var ctx = document.getElementById("myChart").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: [r[0].party, r[1].party, r[2].party, r[3].party, r[4].party, r[5].party, r[6].party, r[7].party],
                                datasets: [{
                                    label: 'Närvaro',
                                    data: [r[0].percentageAbsence, r[1].percentageAbsence, r[2].percentageAbsence, r[3].percentageAbsence, r[4].percentageAbsence, r[5].percentageAbsence, r[6].percentageAbsence, r[7].percentageAbsence],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.8)',
                                        'rgba(54, 162, 235, 0.8)',
                                        'rgba(255, 206, 86, 0.8)',
                                        'rgba(75, 192, 192, 0.8)',
                                        'rgba(153, 102, 255, 0.8)',
                                        'rgba(153, 102, 255, 0.8)',
                                        'rgba(153, 102, 255, 0.8)',
                                        'rgba(255, 159, 64, 0.8)'
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

            temp = false;
            }
        });
});
        










