

$("#find-city").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#cityName").val();
    var latLongUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityName + "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM"
    
    $.ajax({
        url: latLongUrl,
        method: "GET"
        
    }).then(function (response) {
        var latitude = response.results[0].geometry.location.lat
        var longitude = response.results[0].geometry.location.lng
        var weatherUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=927924e4c73455c7286d71a6b1b45a4c"
        $.ajax({
            url: weatherUrl,
            method: "GET",
        }).then(function (weatherResponseWithLatAndLong) {
            console.log(weatherResponseWithLatAndLong)
            console.log(weatherResponseWithLatAndLong.daily[0].uvi)
            console.log(weatherResponseWithLatAndLong.daily[0].humidity)
            console.log(weatherResponseWithLatAndLong.daily[0].wind_speed)
            console.log(weatherResponseWithLatAndLong.daily[0].temp.day)
            var temp = weatherResponseWithLatAndLong.daily[0].temp.day
            temp = (((temp -273) * 9/5) +32).toFixed(2)
            $("#city-tempature").text("Tempature: " + temp + "F")
            $("#city-humidty").text("Humidity: " + weatherResponseWithLatAndLong.daily[0].humidity + "%")
            $("#city-windspeed").text("Wind Speed: " + weatherResponseWithLatAndLong.daily[0].wind_speed + "MPH")
            $("#city-uvindex").text("UV Index: " + weatherResponseWithLatAndLong.daily[0].uvi)
            
            for (var i = 0; i < 5; i++) {
                var futureTemp = weatherResponseWithLatAndLong.daily[i].temp.day
                futureTemp = (((futureTemp -273) * 9/5) +32).toFixed(2)
                var fiveDayDiv = $("<div>")
                var fiveDayTemp = $("<p>")
                var fiveHumidity = $("<p>")
                fiveDayTemp.text(futureTemp)
                fiveDayHumidity.text(weatherResponseWithLatAndLong.daily[i].humidity)
            }
        })
    })
})