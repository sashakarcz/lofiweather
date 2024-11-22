// Fetch current weather from Open-Meteo API
async function fetchWeatherDataByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`
    );
    const data = await response.json();
    if (response.ok) {
      displayWeather(data);
    } else {
      console.error('Error fetching weather data:', data);
      displayError('Failed to fetch weather data.');
    }
  } catch (error) {
    console.error('Error:', error);
    displayError('Failed to fetch weather data.');
  }
}

// Display weather data in the Local Weather section
function displayWeather(data) {
  const weather = data.current_weather;
  const weatherContainer = document.getElementById('local-weather');
  weatherContainer.innerHTML = `
    <p><strong>Temperature:</strong> ${weather.temperature}°F</p>
    <p><strong>Wind Speed:</strong> ${weather.windspeed} mph</p>
    <p><strong>Condition:</strong> ${weather.weathercode}</p>
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
        fetchWeatherDataByCoords(40.7128, -74.0060); // Default to New York
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    displayError('Geolocation is not supported. Defaulting to New York.');
    fetchWeatherDataByCoords(40.7128, -74.0060); // Default to New York
  }
}

// Initialize the app
window.onload = () => {
  getUserLocation();
};
