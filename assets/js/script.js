var searchCityEl = document.querySelector(".searchCity");
var searchBtnEl = document.querySelector(".searchBtn");
var currentWeatherEl = document.querySelector(".currentWeather");

var apiKey = "607439a3ad59adef49501bad43c27015";

var city = function () {
  var cityName = searchCityEl.value;
  getWeather(cityName);
};

var getWeather = function (city) {
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
      var currentDate = moment().format("MMMM Do YYYY");
      var weatherNow = data.main.temp;
      var windSpeedNow = data.wind.speed;
      var humidityNow = data.main.humidity;
      var cityLon = data.coord.lon;
      var cityLat = data.coord.lat;

      var cityHeading = document.createElement("h2");
      cityHeading.innerHTML = city + ", " + currentDate;
      currentWeatherEl.append(cityHeading);

      var currentWeatherTemp = document.createElement("p");
      currentWeatherTemp.innerHTML = "Temp: " + weatherNow + " ℃";
      currentWeatherEl.append(currentWeatherTemp);

      var currentWeatherWind = document.createElement("p");
      currentWeatherWind.innerHTML = "Wind : " + windSpeedNow + " m/s";
      currentWeatherEl.append(currentWeatherWind);

      var currentWeatherHumidity = document.createElement("p");
      currentWeatherHumidity.innerHTML = "Humidity : " + humidityNow + " %";
      currentWeatherEl.append(currentWeatherHumidity);

      getUv(cityLon, cityLat);
    });
};

var getUv = function (lon, lat) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lon +
      "&lon=" +
      lat +
      "&exclude=hourly,daily&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var weatherUv = data.current.uvi;
      var uvEl = document.createElement("p");
      uvEl.innerHTML = "UV Index: " + weatherUv;
      currentWeatherEl.append(uvEl);
    });
};

var fiveDayWeather = function () {};

searchBtnEl.addEventListener("click", function () {
  city();
});
