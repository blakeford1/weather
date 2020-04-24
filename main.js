$(document).ready(function (){
    $("#citysearch").click(function(){
       
        displaySearchHistory ($("#searchinput").val())
        fiveDayForecast() 
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+$("#searchinput").val()+"&units=imperial&appid=94a9f51f96f39e938bcacd6bd7b28c53", success: 
            function(result){
              $("#weatherdisplay").empty()

              var nameDate = $("<h3>").text("Current Conditions:  " + result.name + " (4/23/20)" )
              $("#weatherdisplay").append(nameDate)

              var temp = $("<p>").text("Temperature: " + result.main.temp + " °F")
              $("#weatherdisplay").append(temp)

              var humid = $("<p>").text("Humidity: " + result.main.humidity + " %")
              $("#weatherdisplay").append(humid)

              var wind = $("<p>").text("Wind Speed: " + result.wind.speed + " MPH")
              $("#weatherdisplay").append(wind)
                
              uvi(result.coord.lat, result.coord.lon)

        }
    });         
    })
    
    
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

    function uvi (lat, lon){
                $.ajax({
                    url:"http://api.openweathermap.org/data/2.5/uvi?appid=94a9f51f96f39e938bcacd6bd7b28c53&lat="+ lat + "&lon=" + lon
                }).then(function(data){
                    var uvi = $("<p>").text("UV Index: " + data.value)
                    $("#weatherdisplay").append(uvi).addClass('uviBox')
                    
                })
}

           

    function fiveDayForecast () {
        $.ajax({
             url:"http://api.openweathermap.org/data/2.5/forecast?q="+$("#searchinput").val()+"&units=imperial&appid=94a9f51f96f39e938bcacd6bd7b28c53"
         }).then(function(data){
        var forecast = [] 
        $('#forecastdisplay').empty()
        for (let index = 0; index < data.list.length; index++) {
            if (data.list[index].dt_txt.split(" ")[1] === "00:00:00"){
                forecast.push(data.list[index])
            }
        }

        for (let i = 0; i < forecast.length; i++) {
            
            var iconUrl = 'http://openweathermap.org/img/wn/'+forecast[i].weather[0].icon+'@2x.png'
            var iconPic = $('<img>').attr('src',iconUrl)
            $('#forecastdisplay').append(iconPic).addClass('iconPic')
            
            // var iconDate = $('<p>').text('4/23/20')
            // $('#forecastdisplay').append(iconDate)

        }
        
    })

    
    } 

})
            // var iconPic = $('<img>').attr('src',iconUrl)
            // $('#forecastdisplay').append(iconPic).addClass('iconPic')
            // var fiveDayTemp = $('<h3>').text(forecast[i].main.temp)
            // $('#forecastdisplay').append(fiveDayTemp)

