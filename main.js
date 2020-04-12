$(document).ready(function (){
    console.log('file loaded')
    $("#citysearch").click(function(){
        console.log('We got clicked!!!!!')
        $.ajax({url: "https://api.openweathermap.org/data/2.5/weather?q="+$("#searchinput").val()+"&units=imperial&appid=94a9f51f96f39e938bcacd6bd7b28c53", success: function(result){
            console.log('GOT SOMETHING BACK FROM AJAX')
           console.log(result);
          var temp = $("<h1>").text(result.main.temp + "*F")
          $("#weatherdisplay").append(temp)

          var humid = $("<h1>").text(result.main.humidity + "%")
          $("#weatherdisplay").append(humid)

          var wind = $("<h1>").text(result.wind.speed + "MPH")
          $("#weatherdisplay").append(wind)
        
        }});
          
        
    })









})