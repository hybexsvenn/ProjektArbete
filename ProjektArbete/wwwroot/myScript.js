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
