const apiKey = 'your api'; // Replace with your OpenWeatherMap API Key

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  fetchWeather(city);
});

document.querySelectorAll('.city-btn').forEach(button => {
  button.addEventListener('click', () => {
    fetchWeather(button.textContent);
  });
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      fetchForecast(city);
    })
    .catch(error => console.error('Error fetching current weather:', error));
}

function displayCurrentWeather(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
  document.getElementById('current-city').textContent = `${data.name} (${new Date().toLocaleDateString()})`;
  document.getElementById('current-temp').textContent = `${data.main.temp}`;
  document.getElementById('current-wind').textContent = `${data.wind.speed}`;
  document.getElementById('current-humidity').textContent = `${data.main.humidity}`;

  // Display the current weather icon
  document.getElementById('current-icon').src = iconUrl;
  document.getElementById('current-icon').alt = data.weather[0].description;
}

function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayForecast(data.list);
    })
    .catch(error => console.error('Error fetching forecast:', error));
}

function displayForecast(forecast) {
  const forecastCards = document.getElementById('forecast-cards');
  forecastCards.innerHTML = '';
  
  // Filter for noon forecasts (every 8th item in the list)
  forecast
    .filter((_, index) => index % 8 === 0)
    .slice(0, 5)
    .forEach(day => {
      const iconCode = day.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const card = document.createElement('div');
      card.classList.add('forecast-card');
      card.innerHTML = `
        <h3>${new Date(day.dt * 1000).toLocaleDateString()}</h3>
        <img src="${iconUrl}" alt="${day.weather[0].description}" />
        <p>Temp: ${day.main.temp} °F</p>
        <p>Wind: ${day.wind.speed} MPH</p>
        <p>Humidity: ${day.main.humidity} %</p>
      `;
      forecastCards.appendChild(card);
    });
}
