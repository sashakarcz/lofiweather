// API key placeholder, to be replaced by GitHub Actions during deployment
const apiKey = 'REPLACE_WITH_OPENWEATHER_API_KEY';

// Fetch weather data by city name
async function fetchWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`
    );
    const data = await response.json();
    if (response.ok) {
      displayWeather(data);
    } else {
      console.error('Error fetching weather data:', data.message);
      displayError(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    displayError('Failed to fetch weather data.');
  }
}

// Fetch weather data by coordinates
async function fetchWeatherDataByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    );
    const data = await response.json();
    if (response.ok) {
      displayWeather(data);
    } else {
      console.error('Error fetching weather data:', data.message);
      displayError(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    displayError('Failed to fetch weather data.');
  }
}

// Display weather data in the Local Weather section
function displayWeather(data) {
  const weatherContainer = document.getElementById('local-weather');
  weatherContainer.innerHTML = `
    <p><strong>Location:</strong> ${data.name}</p>
    <p><strong>Temperature:</strong> ${data.main.temp}°F</p>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} mph</p>
  `;
}

// Display an error message
function displayError(message) {
  const weatherContainer = document.getElementById('local-weather');
  weatherContainer.innerHTML = `
    <p><strong>Error:</strong> ${message}</p>
  `;
}

// Get user's current position using the Geolocation API
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        fetchWeatherDataByCoords(latitude, longitude); // Fetch weather for user's location
      },
      (error) => {
        console.error('Error getting location:', error);
        displayError('Unable to retrieve location. Defaulting to New York.');
        fetchWeatherData('New York'); // Default to a specific location
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    displayError('Geolocation is not supported. Defaulting to New York.');
    fetchWeatherData('New York'); // Default to a specific location
  }
}

// Initialize the app
window.onload = () => {
  getUserLocation();
};

