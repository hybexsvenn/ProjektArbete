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

//Används av index och party
//Vid frågor, kontakta Pontus

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
        return date + "/0" + ((date % 100) + 1);
    }
    return date + "/" + ((date % 100) + 1);
}

// Funktion för att välja värden mellan två datum
// Ut: arrayen
function ByYear(start, end, array, key) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] >= start && array[i][key] <= end) {
            newArray.push(array[i])
        }
    }
    return newArray;
}