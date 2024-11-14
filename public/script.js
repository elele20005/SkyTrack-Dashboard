const apiKey = 'f414d6206e7ed02b0c8787acc24c6b2a'; // Replace with your OpenWeatherMap API Key

// Load search history from localStorage on page load
document.addEventListener('DOMContentLoaded', loadSearchHistory);

document.getElementById('search-btn').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) {
    fetchWeather(city);
    updateSearchHistory(city);
  }
});

document.querySelectorAll('.city-btn').forEach(button => {
  button.addEventListener('click', () => {
    fetchWeather(button.textContent);
    updateSearchHistory(button.textContent);
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
  document.getElementById('current-temp').textContent = `Temp: ${data.main.temp} °F`;
  document.getElementById('current-wind').textContent = `Wind: ${data.wind.speed} MPH`;
  document.getElementById('current-humidity').textContent = `Humidity: ${data.main.humidity} %`;

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

function updateSearchHistory(city) {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

  if (!searchHistory.includes(city)) {
    searchHistory.unshift(city);
    searchHistory = searchHistory.slice(0, 5); // Limit to the last 5 searches
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  displaySearchHistory();
}

function displaySearchHistory() {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const historyContainer = document.getElementById('search-history');
  historyContainer.innerHTML = '';

  searchHistory.forEach(city => {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.addEventListener('click', () => fetchWeather(city));
    historyContainer.appendChild(listItem);
  });
}

function loadSearchHistory() {
  displaySearchHistory();
}
