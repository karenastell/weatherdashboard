// function saveCity() {
//   var savedCities = JSON.parse(localStorage.getItem("cities"));

//   if (savedCities !== null) {
//     cityInputArray = savedCities;
//   }

//   getCityFromLS();
// }

// function storeCities() {
//   localStorage.setItem("city", JSON.stringify(cityInputArray));
// }

// function getCityFromLS() {
//   cityInput.innerHTML = "";

//   cityInputArray.forEach(function (city) {
//     var cityBtn = $("<button>", {
//       class: "city-button button",
//       text: cityInput,
//     });
//     cityBtn.attr("data-city");
//     $(".search-history").append(cityBtn);
//   });
// }
