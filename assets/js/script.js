$(document).ready(function () {
    
    var searchBtn = document.getElementById('searchbtn');
    var inputCity = document.getElementById('inputCity');
    var cityContainer = document.getElementById('city-container').querySelector('.list-group');
    var currentWeather = document.getElementById('current-weather');
    var fiveDayForecast = document.querySelector('.display');
    var cityname = "";
    $("#wicon").css("display", "none");


    function addToList(city) {
        var listEl = $('<li>' + city.toUpperCase() + '</li>');
        listEl.addClass('list-group-item');
        listEl.attr('data-value', city.toUpperCase());
        cityContainer.append(listEl);

        var storedCities = JSON.parse(localStorage.getItem('cityname')) || [];
        if (!storedCities.includes(city)) {
            storedCities.push(city);
            localStorage.setItem('cityname', JSON.stringify(storedCities));
        }
    }

    $(searchBtn).on('click', function (event) {
        event.preventDefault();
        var cityname = $('#inputCity').val().trim().toLowerCase();
        if (cityname) {
            addToList(cityname);
            render_weather_result(cityname);
        }
    });


    var render_weather_result = function () {
        var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=105de558c73e31b523f2bf99bb2125df`;

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
            $(".temp").text(response.main.temp + " °F");
            $(".humidity").text(response.main.humidity + " %");
            $(".wind").text(response.wind.speed + " MPH");
            longtitude = response.coord.lon;
            latitude = response.coord.lat;
    
    
        });


      //function getWeather(city) {
      //  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=105de558c73e31b523f2bf99bb2125df`;
        
       // var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=105de558c73e31b523f2bf99bb2125df`;
      //}


};
})

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