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
      console.log(data);

      var currentDate = moment().format("MMMM Do YYYY");
      var weatherNow = data.main.temp;
      var windSpeedNow = data.wind.speed;
      var humidityNow = data.main.humidity;

      var cityHeading = document.createElement("h2");
      cityHeading.innerHTML = city + ", " + currentDate;
      currentWeatherEl.append(cityHeading);
      console.log("city Heading:", cityHeading);

      var currentWeatherTemp = document.createElement("p");
      currentWeatherTemp.innerHTML = "Temp: " + weatherNow + " ℃";
      currentWeatherEl.append(currentWeatherTemp);

      var currentWeatherWind = document.createElement("p");
      currentWeatherWind.innerHTML = "Wind : " + windSpeedNow + " m/s";
      currentWeatherEl.append(currentWeatherWind);

      var currentWeatherHumidity = document.createElement("p");
      currentWeatherHumidity.innerHTML = "Humidity : " + humidityNow + " %";
      currentWeatherEl.append(currentWeatherHumidity);
    });
};

var fiveDayWeather = function () {};

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
