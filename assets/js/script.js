// ************************** Search Area ******************************
// an input to allow the user to search for the city
// a button to use to submit the input
// store users search in local storage
// on page load, grab from local storage - most recent search
// if the users search exists in local storage, do not append a new one to the searches - just grab from local storage
// in the getCurrentWeather function, check local storage for previous searches
//an array which will store the user inputs in local storage
var cityInputArray = [];
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
// input the information from the API

// call the UVIndex function to generate the UV Index element

// ************************** 5-Day-Forecast ****************************

//create 5DayForcast function
//   include dates, temp, humidity and icon
//   dynamically generated using JS
//   generate a card which includes <p>, <img>, <h2>, <icon>

var apiKey = "06cf4510268298d34395e66dd432fb8e";
var city;
var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

function getUVIndex(lat, long) {
  $.get(url, function (response) {});
}

// icon needs to concatenate .png onto it  response.list.weather.icon + .png
