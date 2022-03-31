var searchCityEl = document.querySelector(".searchCity");
var searchBtnEl = document.querySelector(".searchBtn");
var currentWeatherEl = document.querySelector(".currentWeather");

var getWeather = function (city) {
  var apiKey = "607439a3ad59adef49501bad43c27015";

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderWeatherData(data);
    });
};

// var renderWeatherData = function (data) {
//   console.log(data);
//   var cityTemp = data.main.temp;
//   var cityTempDescription = data.weather[0].description;
//   // creating elements
//   // append to dom
//   // remove existing elements
//   var document.createElement("")
//   currentWeather.appendChild()

// };
searchBtnEl.addEventListener("click", function () {
  var cityName = searchCityEl.value;
  getWeather(cityName);
});
