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

// Ponus funktion för att kolla om ett värde finns i listan

function ifExist(valuetosearch, arraytosearch, key) {
    if (arraytosearch.length === 0) {
        return false;
    }
    else {
        for (var i = 0; i < arraytosearch.length; i++) {
            if (valuetosearch === arraytosearch[i].key) { return true; }
        }
        return false;
    }
}

// Pontus funktion för att hitta indexet av värdet i arrayen med hjälp av en nyckel

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i][key] === valuetosearch) {
            return i;
        }
    }
    return null;
}