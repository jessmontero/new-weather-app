function formatDate(timestamp) {

let date = new Date(timestamp);
let hours = date.getHours(0);
if(hours < 10) {
    hours = `0${hours}`;
}

let minutes = date.getMinutes();
if(minutes <10) {
    minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];

return `${day} ${hours}:${minutes}`;

}

function getForecast(coordinates) {
  let apiKey = "ddf0440bcec2a49b426ccbeada3e4574";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
    forecastHTML +
     `
      <div class="col-2">
        <ul class="my-auto">
            <li class="forecast-day">
                ${day}
            </li>
            <li>
                <img src="images/02d.png" alt="" width="40px">
            </li>
            <li>
                <span class="forecast-max-temp">20°</span><span class="forecast-min-temp">/15°</span>
            </li>
        </ul>
      </div>
    `;
  });
forecastHTML = forecastHTML + `</div>`;

forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  document.querySelector("#search-input").value = "";
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#day-time").innerHTML = formatDate(response.data.dt*1000);

  centigradeTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let body = document.querySelector("#weather-app");

  if (response.data.main.temp > 17) {
      body.style.background = "radial-gradient(circle at 10% 10%, rgb(253, 193, 104) 0%, rgb(244, 96, 96) 90%)";
  } else {
     body.style.background = "radial-gradient(circle at 10% 10%, rgb(143, 239, 175) 0%, rgb(51, 139, 147) 90%)";
  }

  getForecast(response.data.coord);

}


function search(city) {
  let apiKey = "ddf0440bcec2a49b426ccbeada3e4574";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ddf0440bcec2a49b426ccbeada3e4574";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  document.querySelector("#search-input").value = "";
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);

function displayFahrenheit(event) {
  event.preventDefault();
  centigradeLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (centigradeTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemperature);
}

function displayCentigrade(event) {
  event.preventDefault();
  centigradeLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(centigradeTemperature);
}

let centigradeTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let centigradeLink = document.querySelector("#centigrade");
centigradeLink.addEventListener("click", displayCentigrade);


search("London");
