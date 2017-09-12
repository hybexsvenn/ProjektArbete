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
            $(this).addClass('active-nav');
        }
        else {
            $(this).removeClass('active-nav');
        }
    });
}

//Används av index och party
//Vid frågor, kontakta Pontus

// Allmäna variabler

var sliderStart;
var sliderEnd;
var listOfPartyVotes;
var sliderFirstDateSet = 2003;
var sliderLastDateSet = 2017;



// Funktion för att kolla om ett värde finns i listan
// Ut: true ifall värdet finns eller false om värdet inte finns
function ifExist(valuetosearch, arraytosearch, key) {
    if (arraytosearch.length === 0) {
        return false;
    }
    else {
        for (var i = 0; i < arraytosearch.length; i++) {
            if (valuetosearch === arraytosearch[i][key]) { return true; }
        }
        return false;
    }
}

// Funktion för att hitta indexet av värdet i arrayen med hjälp av en nyckel
// Ut: index
function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i][key] === valuetosearch) {
            return i;
        }
    }
    return null;
}

// Funktion för att fulla partinamn baserat på deras initialer
// In: partiinitialer Ut: Partinamn
function GetFullPartyName(key) {
    key = key.toUpperCase();
    if (key === "S") {
        return "Socialdemokraterna";
    } else if (key === "V") {
        return "Vänsterpartiet";
    } else if (key === "MP") {
        return "Miljöpartiet";
    } else if (key === "C") {
        return "Centerpartiet";
    } else if (key === "L") {
        return "Liberalerna";
    } else if (key === "M") {
        return "Moderaterna";
    } else if (key === "KD") {
        return "Kristdemokraterna";
    } else if (key === "SD") {
        return "Sverigedemokraterna";
    } else if (key === "-") {
        return "Övriga";
    }
}

// Funktion för att ändra datum till ett hanterbart format. Ex: in 2016/17 ut 2016
// Ut: arrayen
function ChangeTheFormatOfYear(arraytoalter, key) {
    for (var i = 0; i < arraytoalter.length; i++) {
        arraytoalter[i][key] = arraytoalter[i][key].substring(0, arraytoalter[i][key].length - 3);
    }
    return arraytoalter;
}

// Funktion för att ändra datum till ett hanterbart format. Ex: in 2016/17 ut 2016
// Ut: arrayen
function ChangeTheBackFormatOfYear(date) {
    if (date <= 2008) {
        return date + "/0" + (date % 100 + 1);
    }
    return date + "/" + (date % 100 + 1);
}

// Funktion för att välja värden mellan två datum
// Ut: arrayen
function ByYear(start, end, array, key) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] >= start && array[i][key] <= end) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

// Funktion för att hitta första
// Ut: Lägsta datum
function FirstDate(array, key) {
    var tempArray = [];
    for (var i = 0; i < array.length; i++) {
        tempArray.push(array[i][key]);
    }
    return Math.min.apply(Math, tempArray);
}

// Funktion för att hitta första
// Ut: Lägsta datum
function LastDate(array, key) {
    var tempArray = [];
    for (var i = 0; i < array.length; i++) {
        tempArray.push(array[i][key]);
    }
    return Math.max.apply(Math, tempArray);
}

// Funktion för att hämta api information från riksdagens hemsida
// Ut: arraye med propar


var p;
function GetPersonFromDataRiksdagen(intresent_id) {
    $.ajax({
        url: "http://data.riksdagen.se/personlista/?iid=" + intresent_id + "&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&termlista=",
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function (r) {
            var getApiInfo = [];
            getApiInfo.push({
                person: r.personlista.person
            
                });
            p = getApiInfo;
        }
    });
    //p = p.personlista.person.bild_url_192;
    return p;
}








// Funktion för slider

$(function () {
    $("#slider-range").slider({
        range: true,
        min: sliderFirstDateSet,
        max: sliderLastDateSet,
        values: [sliderStart, sliderEnd],
        slide: function (event, ui) {
            $("#date").val(ChangeTheBackFormatOfYear(ui.values[0]) + " - " + ChangeTheBackFormatOfYear(ui.values[1]));
            sliderStart = ui.values[0];
            sliderEnd = ui.values[1];
        }
    });

    $("#slider-range").mousedown(function () {
        $("#date").append("<span style='color:#00f;'>Mouse down.</span>");
    });
});

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
});

// Funktion för att kunna vissa grafer där inte alla värden finns

function ReturnNull(input) {
    if (input === undefined) {
        return null;
    }
    return input;
}
