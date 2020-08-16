var cityArray = [];
getLocal();
$("#find-city").on("click", function (event) {
    var cityName = $("#cityName").val();
    if (cityName !== "") {
event.preventDefault();
$("#fiveDayForecast").empty();
setLocal();
    var cityButton = $("<button>").text(cityName);
    cityButton.attr("class", "searchButtonCity");
    cityButton.attr("value", cityName);
    cityArray.push(cityName);
    $(".cityButtons").append(cityButton);
    var latLongUrl =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    cityName +
    "&key=AIzaSyCLjaOmTbNl8M0ewJ5amY9cm6rytBGUVZM";
    $.ajax({
        url: latLongUrl,
        method: "GET",
    }).then(function (response) {
        var latitude = response.results[0].geometry.location.lat;
        var longitude = response.results[0].geometry.location.lng;
        var weatherUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=927924e4c73455c7286d71a6b1b45a4c";
        $.ajax({
            url: weatherUrl,
            method: "GET",
        }).then(function (weatherResponseWithLatAndLong) {
            // DATE BELOW
            var unixTime = weatherResponseWithLatAndLong.daily[0].dt;
            var timeInMilliSeconds = unixTime * 1000;
            var date = new Date(timeInMilliSeconds);
            var day = (date.getDate() < 10 ? "0" : "") + date.getDate();
            var month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
            var year = date.getFullYear();
            var temp = weatherResponseWithLatAndLong.daily[0].temp.day;
            temp = (((temp - 273) * 9) / 5 + 32).toFixed(2); //concerts from degrees K to F
            $("#city-date").text(month + "/" + day + "/" + year);
            $("#city-temperature").text("Temperature: " + temp + "F");
            $("#city-humidty").text(
                "Humidity: " + weatherResponseWithLatAndLong.daily[0].humidity + "%"
                );
                $("#city-windspeed").text(
                    "Wind Speed: " +
                    weatherResponseWithLatAndLong.daily[0].wind_speed +
                    "MPH"
                    );
                    $("#city-uvindex").text(
                        "UV Index: " + weatherResponseWithLatAndLong.daily[0].uvi
                        );
                        
                        // FUTURE DATES
                        for (var i = 1; i < 6; i++) {
                            var fiveDayunixTime = weatherResponseWithLatAndLong.daily[i].dt;
                            var fiveDaytimeInMilliSeconds = fiveDayunixTime * 1000;
                            var fiveDaydate = new Date(fiveDaytimeInMilliSeconds);
                            
                            var fiveDayday =
                            (fiveDaydate.getDate() < 10 ? "0" : "") + fiveDaydate.getDate();
                            var fiveDaymonth =
                            (fiveDaydate.getMonth() < 9 ? "0" : "") +
                            (fiveDaydate.getMonth() + 1);
                            var fiveDayyear = fiveDaydate.getFullYear();
                            var futureTemp = weatherResponseWithLatAndLong.daily[i].temp.day;
                            futureTemp = (((futureTemp - 273) * 9) / 5 + 32).toFixed(2);
                            var fiveDayDiv = $("<div>");
                            var fiveDayFutureDate = $("<p>");
                            var fiveDayTemp = $("<p>");
                            var fiveDayHumidity = $("<p>");
                            fiveDayTemp.text(futureTemp);
                            fiveDayHumidity.text(weatherResponseWithLatAndLong.daily[i].humidity);
                            fiveDayFutureDate.text(
                                fiveDaymonth + "/" + fiveDayday + "/" + fiveDayyear
                                );
                                fiveDayDiv.append(fiveDayTemp, fiveDayHumidity, fiveDayFutureDate);
                                fiveDayDiv.attr("class", "fiveDayStyling");
                                $("#fiveDayForecast").append(fiveDayDiv);
                            }
                        });
                    });
                }
            });
                
                function setLocal() {
                    localStorage.setItem("cityName", JSON.stringify(cityArray));
                }
                function getLocal() {
                    var storedArray = JSON.parse(localStorage.getItem("cityName"));
                    if (storedArray) {
                        for (var i = 0; i < storedArray.length; i++) {
                            cityArray.push(storedArray[i]);
                            var storedCityButton = $("<button>").text(storedArray[i]);
                            storedCityButton.attr("class", "searchButtonCity");
                            storedCityButton.attr("value", storedArray[i]);
                            $(".cityButtons").append(storedCityButton);
                        }
                    }
                }
