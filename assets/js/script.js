var apiKey = "06cf4510268298d34395e66dd432fb8e";
var cityInput;
var stateInput;

// ************************** Search Area ******************************
// an input to allow the user to search for the city with an id = city-input
// a button to use to submit the input with a class = search
$(".search").on("click", getCurrentWeather);
// store users search in  an array local storage

// on page load, grab from local storage - most recent search
// if the users search exists in local storage, do not append a new one to the searches - just grab from local storage
// in the getCurrentWeather function, check local storage for previous searches

// a list of buttons uder the search input with the names from cityInputArray
var cityInputArray = [];

function saveCity() {
  var savedCities = JSON.parse(localStorage.getItem("cities"));

  if (savedCities !== null) {
    cityInputArray = savedCities;
  }

  getCityFromLS();
}

function storeCities() {
  localStorage.setItem("city", JSON.stringify(cityInputArray));
}

function getCityFromLS() {
  cityInput.innerHTML = "";
  stateInput.innerHTML = "";

  cityInputArray.forEach(function (city) {
    var cityBtn = $("<button>", {
      class: "city-button button",
      text: cityInput,
    });
    cityBtn.attr("data-city");
    $(".search-history").append(cityBtn);
  });
}

// function generateCityButtons() {
//   var cityBtn = $("<button>", {
//     class: "city-button button",
//     text: cityInput,
//   });
//   $(".search-history").append(cityBtn);
//   cityInput = "";
//   console.log("city input in generate: ", cityInput);
// }

// clear search history
$(".clear-history").on("click", clearSearchHistory);

// *************************** Current Weather **************************
// a <div> that holds the current weather
// an unordered list without bullets to hold the info for
//         city, date, icon
//         temp
//         humidity
//         wind speed
//         UV Index
$(".icon").hide();
// create a function that gets current weather
function getCurrentWeather() {
  $(".5-day-element").empty();
  $(".icon").show();
  // assigns the value of the users input into variables
  cityInput = $(".city-input").val();
  stateInput = $(".state-input").val();
  // takes the value of the city-input and state-input and replaces it in the url
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput},${stateInput},US&appid=${apiKey}&units=imperial`;
  console.log(url);

  // if (cityInputArray.length < 6) {
  //   cityInputArray.push(cityInput);
  // } else {
  //   cityInputArray[0] = cityInput;
  // }

  // sends a request to get information from the weather API
  $.get(url)
    // recieve the information and put the values in proper place
    .then(function (response) {
      console.log(response);

      $(".city").text(response.name);
      $(".date").text(moment().format("L"));
      $(".icon").attr(
        "src",
        "http://www.openweathermap.org/img/w/" +
          response.weather[0].icon +
          ".png"
      );

      $(".temp").text("Temperature: " + response.main.temp.toFixed());
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      console.log("long lat", lon, lat);
      // call the UVIndex function to generate the UV Index element
      getUVIndex(lat, lon);
      // calls the getFiveDay function to generate the 5-day-Forecast
      getFiveDay();
      // calls the generateCityButtons function
      generateCityButtons();
      // calls the saveCity function
      saveCity();
    });
}

function getUVIndex(lat, lon) {
  var url = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  console.log("uv", url);
  $.get(url).then(function (response) {
    console.log("uv response", response);
    // input the information from the API
    $(".uv").text("UV Index: " + response.value);
  });
}

// ************************** 5-Day-Forecast ****************************

//create 5DayForcast function
function getFiveDay() {
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},${stateInput},US&appid=${apiKey}&units=imperial`;
  console.log("five day", url);
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
          "http://www.openweathermap.org/img/w/" +
          response.list[i].weather[0].icon +
          ".png",
      });
      // adds the temp
      var fiveDayTemp = $("<p>", {
        class: "5-day-temp",
        text: "Temp: " + response.list[i].main.temp.toFixed(),
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
  localStorage.clear();
}
