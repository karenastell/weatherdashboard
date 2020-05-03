// an input to allow the user to search for the city

//grab the array input and store it in a variable
var cityInputArray = [];
// create a function that gets current weather
// dynamically generate current weather div
// inside of that you're going to generate the city, date, icon, temp, humidity, wind speed
var city = $(".city");

// call the UVIndex function to generate the UV Index element

//create 5DayForcast function
//   include dates, temp, humidity and icon
//   dynamically generated using JS
//   generate a card which includes <p>, <img>, <h2>, <icon>

// store users search in local storage
// on page load, grab from local storage - most recent search
// if the users search exists in local storage, do not append a new one to the searches - just grab from local storage
// in the getCurrentWeather function, check local storage for previous searches

var apiKey = "06cf4510268298d34395e66dd432fb8e";
var city;
var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

function getUVIndex(lat, long) {
  $.get(url, function (response) {});
}

// icon needs to concatenate .png onto it  response.list.weather.icon + .png
