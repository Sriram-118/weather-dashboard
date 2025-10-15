const apiKey = "9b6344615249a98c650f0ef74ad98d4d"; // 🔑 Replace with your OpenWeather API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const weatherHTML = `
    <div class="weather-card">
      <h2>${name}</h2>
      <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
      <p>🌡️ Temperature: ${main.temp}°C</p>
      <p>💧 Humidity: ${main.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
    </div>
  `;
  weatherInfo.innerHTML = weatherHTML;
}
