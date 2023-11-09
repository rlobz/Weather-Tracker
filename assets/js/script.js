$(document).ready(function () {
    var cityname = "";
    $("#wicon").css("display", "none");


    $("#searchbtn").on("click", function (event) {
        event.preventDefault();
        cityname = $("#inputCity").val().toLowerCase();
        $(".display").empty();
        createRow();
        current_weather();
    });

    var createRow = function () {
        var button = $("<button>").text(cityname);
        button.addClass("locationname list-group-item list-group-item-action");
        button.attr("type", "button");
        $(".list-group").prepend(button);
    };


     $(".list-group").on("click", ".list-group-item", function (event) {
        if (event.target.matches(".list-group-item")){
            cityname=event.target.textContent.trim();
        current_weather();
    
        }
    });



    var current_weather = function () {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&APPID=105de558c73e31b523f2bf99bb2125df";

        var longtitude;
        var latitude;
        var citynamedisplay;
        var iconcode;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            citynamedisplay = response.name;
            iconcode = response.weather[0].icon;
            $("#temperature").text(response.main.temp + " °F");
            $("#wind-speed").text(response.wind.speed + " MPH");    
            $("#humidity").text(response.main.humidity + " %");
            longtitude = response.coord.lon;
            latitude = response.coord.lat;

         
            var iconlink = "https://openweathermap.org/img/w/" + iconcode + ".png";
            var secondqueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=105de558c73e31b523f2bf99bb2125df&lat=" + latitude + "&lon=" + longtitude;
            $.ajax({
                url: secondqueryURL,
                method: "GET"
            }).then(function (response) {
 
                $(".citynamedisplay").text(citynamedisplay + " " + "(" + response.date_iso + ")");
                $('#wicon').attr('src', iconlink);
                $("#wicon").css("display", "block");
            });

            
            var secondicon;
            var thirdqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=105de558c73e31b523f2bf99bb2125df";
            $.ajax({
                url: thirdqueryURL,
                method: "GET"
            }).then(function (response) {

                var fivedaysweather = response.list;
                for (var i = 0; i < fivedaysweather.length; i = i + 8) {
                    var newDiv = $("<div>");
                    newDiv.addClass("col forecast");
                    secondicon = fivedaysweather[i].weather[0].icon;
                    var secondiconlink = "https://openweathermap.org/img/w/" + secondicon + ".png";
                    var date = $("<h3>").text(fivedaysweather[i].dt_txt);
                    var icon = $("<img>").attr('src', secondiconlink);
                    var temp = $("<p>").text("Temp: " + fivedaysweather[i].main.temp + " °F");
                    var speed = $("<p>").text("Wind: " + fivedaysweather[i].wind.speed + " MPH");
                    var humidity = $("<p>").text("Humidity: " + fivedaysweather[i].main.humidity + " %");
  

                    newDiv.append(date, icon, temp, speed, humidity);
                    $(".display").append(newDiv);
                };
            });

        });
    };


});


// Weather Dashboard
//Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

//Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The base URL should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

//**Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

//You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

//## User Story

//AS A traveler
//I WANT to see the weather outlook for multiple cities
//SO THAT I can plan a trip accordingly


//## Acceptance Criteria


//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that cit
//