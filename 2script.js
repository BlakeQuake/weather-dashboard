$(document).on("click", ".searchButtonCity", function(event) {
    event.preventDefault();
    $("#fiveDayForecast").empty()
    var cityName = $(this).val()
    console.log(cityName)
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
            method: "GET"
        }).then(function (weatherResponseWithLatAndLong) {
            // console.log(weatherResponseWithLatAndLong)
            // console.log(weatherResponseWithLatAndLong.daily[0].uvi)
            // console.log(weatherResponseWithLatAndLong.daily[0].humidity)
            // console.log(weatherResponseWithLatAndLong.daily[0].wind_speed)
            // console.log(weatherResponseWithLatAndLong.daily[0].temp.day)
            // DATE BELOW
            var unixTime = weatherResponseWithLatAndLong.daily[0].dt;
                var timeInMilliSeconds = unixTime * 1000;
                var date = new Date(timeInMilliSeconds);
                console.log(date)
                var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
                console.log(date.getDate())
                console.log(date.getMonth())
                var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
                var year = date.getFullYear();
                console.log(date.getFullYear())
            var temp = weatherResponseWithLatAndLong.daily[0].temp.day
            temp = (((temp -273) * 9/5) + 32).toFixed(2) //concerts from degrees K to F
            $("#city-date").text(month + "/" + day + "/" + year)
            $("#city-temperature").text("Temperature: " + temp + "F")
            $("#city-humidty").text("Humidity: " + weatherResponseWithLatAndLong.daily[0].humidity + "%")
            $("#city-windspeed").text("Wind Speed: " + weatherResponseWithLatAndLong.daily[0].wind_speed + "MPH")
            $("#city-uvindex").text("UV Index: " + weatherResponseWithLatAndLong.daily[0].uvi)

        // FUTURE DATES
            for(var i = 1; i < 6; i++) {
                var fiveDayunixTime = weatherResponseWithLatAndLong.daily[i].dt;
                var fiveDaytimeInMilliSeconds = fiveDayunixTime * 1000;
                var fiveDaydate = new Date(fiveDaytimeInMilliSeconds);
                console.log(date)
                var fiveDayday = (fiveDaydate.getDate() < 10 ? '0' : '') + fiveDaydate.getDate();
                var fiveDaymonth = (fiveDaydate.getMonth() < 9 ? '0' : '') + (fiveDaydate.getMonth() + 1);
                var fiveDayyear = fiveDaydate.getFullYear();
                var futureTemp = weatherResponseWithLatAndLong.daily[i].temp.day
                futureTemp = (((futureTemp -273) * 9/5) + 32).toFixed(2)
                var fiveDayDiv = $("<div>") 
                var fiveDayFutureDate = $("<p>")
                var fiveDayTemp = $("<p>")
                var fiveDayHumidity = $("<p>")
                fiveDayTemp.text(futureTemp)
                fiveDayHumidity.text(weatherResponseWithLatAndLong.daily[i].humidity)
                fiveDayFutureDate.text(fiveDaymonth + "/" + fiveDayday + "/" + fiveDayyear)
                fiveDayDiv.append(fiveDayTemp, fiveDayHumidity, fiveDayFutureDate)
                fiveDayDiv.attr("class", "fiveDayStyling")
                $("#fiveDayForecast").append(fiveDayDiv)
            }
        })
    })

})