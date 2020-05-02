$(document).ready(function () {
  //-----------------------CURRENT WEATHER--------------------------//
  $("#citysearch").click(function () {
    displaySearchHistory($("#searchinput").val());
    fiveDayForecast();
    firstCitySearch($("#searchinput").val());
  });
  $(document).on("click", ".pastSearch", function () {
    displaySearchHistory($(this).text());
    fiveDayForecast();
    firstCitySearch($(this).text());
  });

  function firstCitySearch(searchCity) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchCity +
        "&units=imperial&appid=94a9f51f96f39e938bcacd6bd7b28c53",
      success: function (result) {
        $("#weatherdisplay").empty();

        var nameDate = $("<h3>").text(
          result.name + moment().format("   MMM Do YYYY")
        );
        $("#weatherdisplay").append(nameDate);

        var currentCond = $("<h4>").text("Current Conditions: ");
        $("#weatherdisplay").append(currentCond);

        var temp = $("<p>").text("Temperature: " + result.main.temp + " °F");
        $("#weatherdisplay").append(temp);

        var humid = $("<p>").text("Humidity: " + result.main.humidity + " %");
        $("#weatherdisplay").append(humid);

        var wind = $("<p>").text("Wind Speed: " + result.wind.speed + " MPH");
        $("#weatherdisplay").append(wind);

        uvi(result.coord.lat, result.coord.lon);
      },
    });
  }
  //-----------------------SEARCH HISTORY--------------------------//
  function displaySearchHistory(city) {
    if (localStorage.getItem("history")) {
      var oldHistory = JSON.parse(localStorage.getItem("history"));
      oldHistory.push(city);
      var strSearchAry = JSON.stringify(oldHistory);
      localStorage.setItem("history", strSearchAry);
    } else {
      var searchArray = [];
      searchArray.push(city);
      var strSearchAry = JSON.stringify(searchArray);
      localStorage.setItem("history", strSearchAry);
    }
    $(".cityDisplay").empty();
    var newHistory = JSON.parse(localStorage.getItem("history"));
    for (let index = 0; index < newHistory.length; index++) {
      var search = $("<h3>").text(newHistory[index]);
      search.attr("class", "pastSearch");

      $(".cityDisplay").append(search);
    }
  }
  //-----------------------UVI INDEX--------------------------//
  function uvi(lat, lon) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/uvi?appid=94a9f51f96f39e938bcacd6bd7b28c53&lat=" +
        lat +
        "&lon=" +
        lon,
    }).then(function (data) {
      var uvi = $("<p>").text("UV Index: " + data.value);
      var uviClass = uviColor(data.value);
      uvi.attr("class", uviClass);
      $("#weatherdisplay").append(uvi).addClass("uviBox");
    });
  }

  function uviColor(uviNumber) {
    if (uviNumber > 0 && uviNumber < 3) {
      return "green";
    } else if (uviNumber > 3 && uviNumber < 6) {
      return "yellow";
    } else if (uviNumber > 6 && uviNumber < 8) {
      return "orange";
    } else if (uviNumber > 8 && uviNumber < 11) {
      return "red";
    } else if (uviNumber > 11 && uviNumber < 13) {
      return "violet";
    }
    //0 to 2  = Green "Low"
    // 3 to 5  = Yellow "Moderate"
    // 6 to 7  = Orange "High"
    // 8 to 10 = Red "Very High"
    // 11+     = Violet "Extreme"

    return "red";
  }

  //----------------------5 DAY FORECAST----------------------//
  function fiveDayForecast() {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        $("#searchinput").val() +
        "&units=imperial&appid=94a9f51f96f39e938bcacd6bd7b28c53",
    }).then(function (data) {
      var forecast = [];
      $("#forecastdisplay").empty();
      for (let index = 0; index < data.list.length; index++) {
        if (data.list[index].dt_txt.split(" ")[1] === "00:00:00") {
          forecast.push(data.list[index]);
        }
      }
      for (let i = 0; i < forecast.length; i++) {
        console.log(forecast[0]);

        var container = $("<div>").attr("class", "fiveDayContainer");

        var iconUrl =
          "https://openweathermap.org/img/wn/" +
          forecast[i].weather[0].icon +
          "@2x.png";

        var displayForecastDate = $("<h3>").text(
          moment(forecast[i].dt_txt.split(" ")[0]).format("MMM Do YY")
        );

        console.log(
          moment(forecast[i].dt_txt.split(" ")[0]).format("MMM Do YY")
        );

        // $("#forecastdisplay").append(displayForecastDate)

        var iconPic = $("<img>").attr("src", iconUrl);
        //$('#forecastdisplay').append(iconPic).addClass('iconPic')

        var forecastTemp = $("<p>").text(
          "Temp:  " + forecast[0].main.temp + " °F"
        );
        //$('#forecastdisplay').append(forecastTemp)

        var forecastHumid = $("<p>").text(
          "Humidity:  " + forecast[0].main.humidity + "%"
        );

        container.append(
          displayForecastDate,
          iconPic,
          forecastTemp,
          forecastHumid
        );

        $("#forecastdisplay").append(container);
      }
    });
  }
});
// ------------------------------------UVI COLORS---------------------------------//
// 0 to 2  = Green "Low"
// 3 to 5  = Yellow "Moderate"
// 6 to 7  = Orange "High"
// 8 to 10 = Red "Very High"
// 11+     = Violet "Extreme"
