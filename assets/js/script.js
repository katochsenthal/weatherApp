var searchCityEl = document.querySelector(".searchCity");
var searchBtnEl = document.querySelector(".searchBtn");
var currentWeatherEl = document.querySelector(".currentWeather");

var apiKey = "607439a3ad59adef49501bad43c27015";

var city = function () {
  var cityName = searchCityEl.value;
  currentWeatherEl.innerHTML = "";
  getCurrentWeather(cityName);
};

var getCurrentWeather = function (city) {
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
      cityHeading.className = "city_heading";
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
      searchCityEl.value = "";
    });
};

var getUv = function (lon, lat) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lon=" +
      lon +
      "&lat=" +
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

      if (weatherUv >= 0 && weatherUv <= 2) {
        uvEl.style.backgroundColor = "green";
      } else if (weatherUv >= 3 && weatherUv <= 5) {
        uvEl.style.backgroundColor = "yellow";
      } else {
        uvEl.style.backgroundColor = "red";
      }
    });
};

var fiveDayWeather = function (lon, lat) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lon=" +
      lon +
      "&lat=" +
      lat +
      "&appid=" +
      apiKey +
      "&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var weatherArray = data.list;

      var fiveDays = weatherArray.filter((day) =>
        day.dt_txt.includes("18:00:00")
      );

      for (var i = 0; i < fiveDays.length; i++) {
        var day = fiveDays[i];
        var icon = day.weather[0].icon;
        var dt = new Date(day.dt * 1000);
        var dayTemp = day.main.temp;
        var dayHumidity = day.main.humidity;
        var dayWind = day.wind.speed;

        console.log(dt);
        console.log(dayTemp);
        console.log(dayHumidity);
        console.log(dayWind);
      }
    });
};

searchBtnEl.addEventListener("click", function () {
  city();
});
