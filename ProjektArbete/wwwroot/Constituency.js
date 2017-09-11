var x = document.getElementById("demo");
var y = document.getElementById("demo2");


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    geo(position.coords.latitude, position.coords.longitude);
}
function geoToC(toC) {
    $.ajax({
        url: "/Api/Constituency/" + toC,
        type: 'GET',
        success: function (r) {
            y.innerHTML = r;
        }
    });
}


function geo(lat, long) {
    var ret = "";
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 59.378667 + ", " + 12.373370 + "&key=AIzaSyARnEQlD02wVjT3Vs-kKEmEyT_jR5ymZcA",
        type: 'GET',
        success: function (re) {
            //console.log(re);
            //for (var i = 0; i < re.results.length; i++) {
                var r = re.results[0].address_components[3].long_name;
                console.log(r);
            //    for (var j = 0; j < r.length; j++) {
            //        //console.log(r[j].formatted_address);
            //        ret +="," + r[j].formatted_address;
            //    }
            //}
            //console.log(ret);
            //geoToC(ret);
        }
    });
}