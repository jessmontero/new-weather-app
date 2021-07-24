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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let body = document.querySelector("#weather-app");

  if (response.data.main.temp > 17) {
      body.style.background = "radial-gradient(circle at 10% 10%, rgb(253, 193, 104) 0%, rgb(251, 128, 128) 90%)";
  } else {
     body.style.background = "radial-gradient(circle at 10% 10%, rgb(182, 244, 146) 0%, rgb(51, 139, 147) 90%)";
  }
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

search("London");
