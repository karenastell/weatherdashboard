var apiKey = "06cf4510268298d34395e66dd432fb8e";
var cityInput;

// ************************** Search Area ******************************
// an input to allow the user to search for the city with an id = city-input
// a button to use to submit the input with a class = search
$(".search").on("click", getCurrentWeather);
// store users search in  an array local storage
var cityInputArray = [];
// on page load, grab from local storage - most recent search
// if the users search exists in local storage, do not append a new one to the searches - just grab from local storage
// in the getCurrentWeather function, check local storage for previous searches

// a list of buttons uder the search input with the names from cityInputArray

// *************************** Current Weather **************************
// a <div> that holds the current weather
// an unordered list without bullets to hold the info for
//         city, date, icon
//         temp
//         humidity
//         wind speed
//         UV Index

// create a function that gets current weather

function getCurrentWeather() {
  cityInput = $(".city-input").val();
  // takes the value of the city-input and replaces it in ${city} in the url
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;
  // sends a request to get information from the weather API
  $.get(url)
    // recieve the information and do something with it
    .then(function (response) {
      console.log(response);
      $(".city").text(response.name);
      $(".date").text(moment().format("L"));
      // $(".icon");
      // changes the Kelvin temp to Fahrenheit
      var kTemp = response.main.temp;
      var fTemp = 1.8 * (kTemp - 273) + 32;
      $(".temp").text("Temp: " + fTemp.toFixed());
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      console.log("long lat", lon, lat);
      getUVIndex(lat, lon);
    });
}
function getUVIndex(lat, lon) {
  var url = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  console.log("uv", url);
  $.get(url).then(function (response) {
    console.log("uv response", response);
    $(".uv").text("UV Index: " + response.value);
  });
}
// input the information from the API

// call the UVIndex function to generate the UV Index element

// ************************** 5-Day-Forecast ****************************

//create 5DayForcast function
//   include dates, temp, humidity and icon
//   dynamically generated using JS
//   generate a card which includes <p>, <img>, <h2>, <icon>

// icon needs to concatenate .png onto it  response.list.weather.icon + .png
