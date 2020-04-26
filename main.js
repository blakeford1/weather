$(document).ready(function (){
   //-----------------------CURRENT WEATHER--------------------------//
    $("#citysearch").click(function(){
        displaySearchHistory ($("#searchinput").val())
        fiveDayForecast() 
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+$("#searchinput").val()+"&units=imperial&appid=94a9f51f96f39e938bcacd6bd7b28c53", success: 
            function(result){
                console.log(result)
    // cannot find the date
              $("#weatherdisplay").empty()
   // needs current date to  v
              var nameDate = $("<h3>").text("Current Conditions: " + result.name + " (current date)")
              $("#weatherdisplay").append(nameDate)

              var temp = $("<p>").text("Temperature: " + result.main.temp + " °F")
              $("#weatherdisplay").append(temp)

              var humid = $("<p>").text("Humidity: " + result.main.humidity + " %")
              $("#weatherdisplay").append(humid)

              var wind = $("<p>").text("Wind Speed: " + result.wind.speed + " MPH")
              $("#weatherdisplay").append(wind)
                
              uvi(result.coord.lat, result.coord.lon)
// ----------------------GET WEATHER ICON TO SHOW IN THIS DIV FOR THE CURRENT WEATHER------------//
            
            //   var iconUrl = 'http://openweathermap.org/img/wn/'+forecast[i].weather[0].icon+'@2x.png'
            //   var iconPic = $('<img>').attr('src',iconUrl)
            //   $('#weatherdisplay').append(iconPic)
            }
    });         
    })
//-----------------------SEARCH HISTORY--------------------------//
    function displaySearchHistory (city){
        if (localStorage.getItem("history")) {
            var oldHistory = JSON.parse(localStorage.getItem("history"))
            oldHistory.push(city)
            var strSearchAry = JSON.stringify(oldHistory)
            localStorage.setItem("history", strSearchAry)  
        } else {
            var searchArray = []
            searchArray.push(city)
            var strSearchAry = JSON.stringify(searchArray)
            localStorage.setItem("history", strSearchAry)
        }
        $('.cityDisplay').empty()
        var newHistory = JSON.parse(localStorage.getItem("history"))
        for (let index = 0; index < newHistory.length; index++) {
            var search = $("<h3>").text(newHistory[index])
          
            $(".cityDisplay").append(search)
        }
    }
//-----------------------UVI INDEX--------------------------//
    function uvi (lat, lon){
                $.ajax({
                    url:"http://api.openweathermap.org/data/2.5/uvi?appid=94a9f51f96f39e938bcacd6bd7b28c53&lat="+ lat + "&lon=" + lon
                }).then(function(data){
                    var uvi = $("<p>").text("UV Index: " + data.value)
                    $("#weatherdisplay").append(uvi).addClass('uviBox')
                })
}
//----------------------5 DAY FORECAST----------------------//
function fiveDayForecast () {
        $.ajax({
             url:"http://api.openweathermap.org/data/2.5/forecast?q="+$("#searchinput").val()+"&units=imperial&appid=94a9f51f96f39e938bcacd6bd7b28c53"
         }).then(function(data){
       
            var forecast = [] 
        $('#forecastdisplay').empty()
        for (let index = 0; index < data.list.length; index++) {
            if (data.list[index].dt_txt.split(" ")[1] === "00:00:00"){
                forecast.push(data.list[index])
                // located date to append under iconPic
                console.log(forecast[0])
            }
        }
        for (let i = 0; i < forecast.length; i++) {
            var iconUrl = 'http://openweathermap.org/img/wn/'+forecast[i].weather[0].icon+'@2x.png'
            
            var displayForecastDate = $("<h3>").text(forecast[i].dt_txt.split(" ")[0])
            $("#forecastdisplay").append(displayForecastDate)
            // === "MMM DD YYYY"
            var iconPic = $('<img>').attr('src',iconUrl)
            $('#forecastdisplay').append(iconPic).addClass('iconPic')
            
            console.log(forecast[0].main.temp)
          
            var forecastTemp = $('<p>').text("Temp:  " + forecast[0].main.temp + " °F")
            $('#forecastdisplay').append(forecastTemp)

            var forecastHumid = $('<p>').text("Humidity:  " + forecast[0].main.humidity + "%")
            $('#forecastdisplay').append(forecastHumid)
        }
    })
    } 
})
// ------------------------------------UVI COLORS---------------------------------//
// 0 to 2  = Green "Low"
// 3 to 5  = Yellow "Moderate"
// 6 to 7  = Orange "High"
// 8 to 10 = Red "Very High"
// 11+     = Violet "Extreme"
