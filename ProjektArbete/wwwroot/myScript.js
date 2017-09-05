

// Range slider

$(function () {

    $("#slider-range").slider({
        range: true,
        min: 2003,
        max: 2017,
        values: [2014, 2017],
        slide: function (event, ui) {
            $("#date").val(ui.values[0] + " - " + ui.values[1]);
        }
    });

    $("#date").val($("#slider-range").slider("values", 0) +
        $("#slider-range").slider("values", 1));

    $("#slider-range").mousedown(function () {
        $("#date").append("<span style='color:#00f;'>Mouse down.</span>");
    });

});

$(document).ready(function () {
    $("#date").val("2014 - 2017");
    var temp = false;
    $("#slider-range").mousedown(function () {
        temp = true;
    });
    
        $("body").mouseup(function () {
            if (temp === true) {
            alert("Yay:D");
            temp = false;
            }
        });
    
});
        










