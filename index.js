/*require('dotenv').config();
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY; // Your OpenWeather API key

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Root route to confirm the server is running
app.get("/", (req, res) => {
  res.send("Weather Dashboard API is running!");
});

// Helper function to get coordinates for a city
const getCoordinates = async (cityName) => {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`;
  const response = await axios.get(geoUrl);
  return response.data[0]; // returns the first result from the response
};

// Route to get 5-day weather forecast by city name
app.get("/api/weather/:city", async (req, res) => {
  const city = req.params.city;
  
  try {
    // Get coordinates for the city
    const coordinates = await getCoordinates(city);
    if (!coordinates) {
      return res.status(404).json({ error: "City not found." });
    }
    
    const { lat, lon } = coordinates;

    // Fetch 5-day weather forecast
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
    const weatherResponse = await axios.get(weatherUrl);
    res.json(weatherResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching weather data." });
  }
});

// File to store search history
const searchHistoryFile = "./searchHistory.json";

// Read search history from the file
const readSearchHistory = () => {
  if (fs.existsSync(searchHistoryFile)) {
    const data = fs.readFileSync(searchHistoryFile, "utf-8");
    return JSON.parse(data);
  }
  return [];
};

// Write search history to the file
const writeSearchHistory = (data) => {
  fs.writeFileSync(searchHistoryFile, JSON.stringify(data, null, 2));
};

// Route to add a city to the search history
app.post("/api/weather/history", (req, res) => {
  const { id, name } = req.body;
  const history = readSearchHistory();

  // Check if city already exists in history
  if (history.find(city => city.id === id)) {
    return res.status(409).json({ error: "City already exists in history." });
  }

  history.push({ id, name });
  writeSearchHistory(history);
  res.json({ message: "City added to history." });
});

// Route to get all cities from the search history
app.get("/api/weather/history", (req, res) => {
  const history = readSearchHistory();
  res.json(history);
});

// Route to delete a city from the search history by id
app.delete("/api/weather/history/:id", (req, res) => {
  const cityId = req.params.id;
  const history = readSearchHistory();
  const updatedHistory = history.filter(city => city.id !== cityId);

  writeSearchHistory(updatedHistory);
  res.json({ message: "City deleted from history." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/


/*2------> const express = require('express');
const axios = require('axios');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Log API key to verify it's loaded (remove this after verification)
console.log("Loaded API Key:", process.env.API_KEY);

app.use(express.json());
app.use(express.static('public'));

// Function to get coordinates based on city name
async function getCoordinates(city) {
  try {
    const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`);
    const { lat, lon } = geoResponse.data[0];
    return { lat, lon };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
}

// Route to get weather data
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const { lat, lon } = await getCoordinates(city);

    // Fetch weather data based on coordinates
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=imperial`);
    const forecastData = weatherResponse.data;

    // Process and send response with weather data
    res.json({
      city,
      forecast: forecastData.list.map((entry) => ({
        date: entry.dt_txt,
        temperature: entry.main.temp,
        wind: entry.wind.speed,
        humidity: entry.main.humidity,
        weather: entry.weather[0].description,
      })),
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Weather Dashboard API is running on http://localhost:${PORT}`);
});*/

require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const axios = require('axios');

const cors = require('cors'); // For enabling CORS
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use(express.static('public'));

// Log API key to verify it's loaded (remove this after verification)
console.log("Loaded API Key:", process.env.API_KEY);

// Function to get coordinates based on city name
async function getCoordinates(city) {
  try {
    const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`);
    if (!geoResponse.data || geoResponse.data.length === 0) {
      throw new Error("City not found");
    }
    const { lat, lon } = geoResponse.data[0];
    return { lat, lon };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error; // Rethrow to be caught in the main route
  }
}

// Route to get weather data
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const { lat, lon } = await getCoordinates(city);

    // Fetch weather data based on coordinates
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=imperial`);
    const forecastData = weatherResponse.data;

    // Process and send response with weather data
    res.json({
      city,
      forecast: forecastData.list.map((entry) => ({
        date: entry.dt_txt,
        temperature: entry.main.temp,
        wind: entry.wind.speed,
        humidity: entry.main.humidity,
        weather: entry.weather[0].description,
      })),
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Weather Dashboard API is running on http://localhost:${PORT}`);
});


