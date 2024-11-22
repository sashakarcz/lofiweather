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
      console.error("Error fetching weather data:", data);
      displayError("Failed to fetch weather data.");
    }
  } catch (error) {
    console.error("Error:", error);
    displayError("Failed to fetch weather data.");
  }
}

// Map weather codes to human-readable descriptions
function getWeatherDescription(weatherCode) {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
  };
  return descriptions[weatherCode] || "Unknown condition";
}

// Map weather codes to weather icons
function getWeatherIcon(weatherCode) {
  const icons = {
    0: "assets/icons/clear_sky.png",
    1: "assets/icons/mainly_clear.png",
    2: "assets/icons/partly_cloudy.png",
    3: "assets/icons/overcast.png",
    45: "assets/icons/fog.png",
    48: "assets/icons/fog.png",
    51: "assets/icons/light_drizzle.png",
    53: "assets/icons/moderate_drizzle.png",
    55: "assets/icons/dense_drizzle.png",
    61: "assets/icons/light_rain.png",
    63: "assets/icons/moderate_rain.png",
    65: "assets/icons/heavy_rain.png",
    80: "assets/icons/light_showers.png",
    81: "assets/icons/moderate_showers.png",
    82: "assets/icons/heavy_showers.png",
  };
  return icons[weatherCode] || "assets/icons/unknown.png";
}

// Display weather data in the Local Weather section
function displayWeather(data) {
  const weather = data.current_weather;
  const description = getWeatherDescription(weather.weathercode);
  const icon = getWeatherIcon(weather.weathercode);
  const weatherContainer = document.getElementById("local-weather");
  weatherContainer.innerHTML = `
    <img src="${icon}" alt="${description}" style="width: 50px; height: 50px;">
    <p><strong>Temperature:</strong> ${weather.temperature}°F</p>
    <p><strong>Wind Speed:</strong> ${weather.windspeed} mph</p>
    <p><strong>Condition:</strong> ${description}</p>
  `;
}

// Display an error message
function displayError(message) {
  const weatherContainer = document.getElementById("local-weather");
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
        console.error("Error getting location:", error);
        displayError("Unable to retrieve location. Defaulting to New York.");
        fetchWeatherDataByCoords(40.7128, -74.0060); // Default to New York
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    displayError("Geolocation is not supported. Defaulting to New York.");
    fetchWeatherDataByCoords(40.7128, -74.0060); // Default to New York
  }
}

// Initialize the app
window.onload = () => {
  getUserLocation();
};
