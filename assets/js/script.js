var apiKey = "06cf4510268298d34395e66dd432fb8e";
var cityInput;
var stateInput;
$(".no-input-div").hide();
// ************************** Search Area ******************************
// an input to allow the user to search for the city with an id = city-input
// a button to use to submit the input with a class = search

$(".search").on("click", function (event) {
  event.preventDefault();
  getCurrentWeather();
});
// an array to hold the cityInputs
var cityInputArray = [];
var stateInputArray = [];
// on page load, grab from local storage - most recent search
console.log(localStorage.getItem("city"));

// clear search history
$(".clear-history").on("click", clearSearchHistory);

function loadLastWeather() {
  var cityArray = JSON.parse(localStorage.getItem("city"));
  var stateArray = JSON.parse(localStorage.getItem("state"));
  var index = cityArray.length - 1;

  cityInput = cityArray[index];
  stateInput = stateArray[index];
  console.log(cityInput);
  console.log(stateInput);

  ajaxCall();
}

// *************************** Current Weather **************************
// a <div> that holds the current weather
// an unordered list without bullets to hold the info for
//         city, date, icon
//         temp
//         humidity
//         wind speed
//         UV Index
$(".icon").hide();

// makes the ajax call to the open weather API
function ajaxCall() {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput},${stateInput},US&appid=${apiKey}&units=imperial`;
  // sends a request to get information from the weather API
  $.get(url)
    // recieve the information and put the values in proper place
    .then(function (response) {
      console.log(response);

      $(".city").text(response.name + ", " + stateInput);
      $(".date").text(moment().format("L"));
      $(".icon").attr(
        "src",
        "https://www.openweathermap.org/img/w/" +
          response.weather[0].icon +
          ".png"
      );

      $(".temp").text("Temperature: " + response.main.temp.toFixed() + "°");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      // call the UVIndex function to generate the UV Index element
      getUVIndex(lat, lon);
      // calls the getFiveDay function to generate the 5-day-Forecast
      getFiveDay();
      // calls the generateButtons function
      // generateButtons();
      $(".city-input").val("");
      console.log("lsArray", lsArray);
    });
}

// create a function that gets current weather
function getCurrentWeather() {
  $(".5-day-element").empty();
  $(".icon").show();

  // assigns the value of the users input into variables
  cityInput = $(".city-input").val().trim();
  cityInput = cityInput.toLowerCase();
  stateInput = $(".select-state").val();

  // if no input
  if (!cityInput || !stateInput) {
    //show a message
    $(".no-input-div").show();
    // hide the weather info
    $(".5-day-element").hide();
    $(".current-weather-info-div").hide();
    // stops the function
    return;
  } else {
    // hide the message
    $(".no-input-div").hide();
    // show the weather info
    $(".current-weather-info-div").show();
    $(".5-day-element").show();
  }

  // takes the value of the city-input and state-input and replaces it in the url

  // pushes most recent search into the cityInput Array
  cityInputArray.push(cityInput);
  stateInputArray.push(stateInput);

  // changes the first letter of the city to a capital latter
  // my tutor helped me with this part!
  function capital(city) {
    var result = [];
    words = city.split(" ");
    for (let i in words) {
      var word = words[i].split("");
      word[0] = word[0].toUpperCase();
      result.push(word.join(""));
    }
    return result.join(" ");
  }

  cityInputArray.forEach(function (city) {
    if (cityInput) {
      $(".search-history").empty();
      // puts the cityInputArray into local storage
      localStorage.setItem("city", JSON.stringify(cityInputArray));
      localStorage.setItem("state", JSON.stringify(stateInputArray));
      var savedCities = JSON.parse(localStorage.getItem("city"));
      // if there is a duplicate in the array - only put one out in the buttons
      savedCities = [...new Set(savedCities)];
      // add buttons to the search history
      savedCities.forEach(function (city) {
        var cityBtn = $("<button>", {
          class: "city-button button",
          text: capital(city) + ", " + stateInput,
          id: city,
        });
        var lineBreak = $("<br>");
        $(".search-history").append(cityBtn, lineBreak);
      });
    }
    console.log("saved cities", savedCities.length);
    console.log("inside function", JSON.stringify(cityInputArray));
  });

  console.log(cityInputArray);

  ajaxCall();
}

// when the city buttons are clicked
$(document).on("click", ".city-button", function () {
  // each button added, on click will give you that city's weather
  stateInput = "";
  // cityInput is set to the button's id
  cityInput = $(this).attr("id");
  console.log("cityInput on click", cityInput);
  // ajax function is called
  ajaxCall();
});

function getUVIndex(lat, lon) {
  var url = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

  $.get(url).then(function (response) {
    console.log("uv response", response);
    // input the information from the API
    $(".uv").text("UV Index: " + response.value);

    if (response.value < 3) {
      // UV text = green
      $(".uv").addClass("uv-low");
    } else if (response.value < 8 && response.value > 2) {
      // UV text = orange
      $(".uv").addClass("uv-med");
    } else if (response.value < 11 && response.value > 7) {
      // UV text = red
      $(".uv").addClass("uv-high");
    } else {
      // UV text = purple
      $(".uv").addClass("uv-very-high");
    }
  });
}

// ************************** 5-Day-Forecast ****************************

//create 5DayForcast function
function getFiveDay() {
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},${stateInput},US&appid=${apiKey}&units=imperial`;
  $.get(url).then(function (response) {
    console.log("five day ", response);

    // for 5 days of weather info, create a card for each date and put the date, icon, temp, and humidity information onto the card
    for (var i = 0; i < 40; i = i + 8) {
      // creating card elements and adding the text/icon that goes in them
      var fiveDayEl = $("<div>", {
        class: "card",
      });
      var cardContent = $("<div>", {
        class: "card-content",
      });
      var cardDiv = $("<div>");
      var fiveDaySection = $("<section>", {
        class: "column",
      });
      // adds the date
      var date = response.list[i].dt;
      var fiveDayDate = $("<p>", {
        class: "five-day-date",
        text: moment.unix(date).format("L"),
      });
      // adds the weather icon
      var fiveDayIcon = $("<img>", {
        src:
          "https://www.openweathermap.org/img/w/" +
          response.list[i].weather[0].icon +
          ".png",
      });
      // adds the temp
      var fiveDayTemp = $("<p>", {
        class: "5-day-temp",
        text: "Temp: " + response.list[i].main.temp.toFixed() + "°",
      });
      // adds the humidity level
      var fiveDayHumidity = $("<p>", {
        class: "5-day-humidity",
        text: "Humidity: " + response.list[i].main.humidity + "%",
      });

      // appending the elements onto each other to create a complete card
      cardContent.append(
        fiveDayDate,
        fiveDayIcon,
        fiveDayTemp,
        fiveDayHumidity
      );
      cardDiv.append(cardContent);
      fiveDayEl.append(cardDiv);

      fiveDaySection.append(fiveDayEl);
      // append the completed card onto the document in the 5-day-element
      $(".5-day-element").append(fiveDaySection);
    }
  });
}

function clearInputs() {
  cityInput.text("");
  stateInput.text("");
}

// this function clears the buttons created when the user searches a city
function clearSearchHistory() {
  $(".search-history").empty();
  cityInputArray = [];
  localStorage.clear();
}

loadLastWeather();
