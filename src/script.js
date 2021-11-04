let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0".concat(minutes);
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

document.getElementById("time").innerHTML = `${hours}:${minutes}`;
document.getElementById("date").innerHTML = `${day} ${month} ${date}, ${year}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHtml = `<div class="row">`;

  forecast.forEach(function(forecastDay, index) {
    if (index < 6){
    forecastHtml =

    forecastHtml +
      `<div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="42px">
          <div class="weather-forecast-temperatures">
            <span class="temp-max">${Math.round(forecastDay.temp.max)}°</span>
            <span class="temp-min">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
      `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

// Search engine

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "ae1f8e08b3b38c3a45d4ee026468148c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayConditions);
}

function getForecast(coordinates) {
  // console.log(coordinates);
  let apiKey = "ae1f8e08b3b38c3a45d4ee026468148c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayConditions(response) {
  document.querySelector("#selected-city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#windspeed").innerHTML = `Windspeed: ` + response.data.wind.speed + `km/h`;
  document.querySelector("#humidity").innerHTML = `Humidity: ` + response.data.main.humidity + `%`;
  document.querySelector("#main-icon").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  getForecast(response.data.coord);
}

// Degree conversion

function convertFahrenheit() {
  let degree = document.querySelector(".temperature");
  degree.innerHTML = 66;
}

let celsius = document.querySelector("#fahrenheit-link");
celsius.addEventListener("click", convertFahrenheit);

function convertCelsius() {
  let degree = document.querySelector(".temperature");
  degree.innerHTML = 19;
}

let fahrenheit = document.querySelector("#celsius-link");
fahrenheit.addEventListener("click", convertCelsius);

// // Current location

// function searchLocation(position) {
//   let apiKey = "d6f21b3a0cd54e52da7c23d8eae1a64e";
//   let lat = position.coords.lat;
//   let long = position.coords.lon;
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(displayConditions);
// }

// function getCurrentLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(searchLocation);
// }

// let currentLocationButton = document.querySelector(".button-yellow");
// currentLocationButton.addEventListener("click", getCurrentLocation);










