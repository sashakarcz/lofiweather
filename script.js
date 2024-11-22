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

// Map weather codes to human-readable descriptions and icons
function getWeatherDetails(weatherCode, isDaytime) {
  const details = {
    0: { description: "Clear Sky", icon: isDaytime ? "assets/icons/clear_sky_day.png" : "assets/icons/clear_sky_night.png" },
    1: { description: "Mainly Clear", icon: isDaytime ? "assets/icons/mainly_clear_day.png" : "assets/icons/mainly_clear_night.png" },
    2: { description: "Partly Cloudy", icon: isDaytime ? "assets/icons/partly_cloudy_day.png" : "assets/icons/partly_cloudy_night.png" },
    3: { description: "Overcast", icon: "assets/icons/overcast.png" },
    45: { description: "Fog", icon: "assets/icons/fog.png" },
    48: { description: "Depositing Rime Fog", icon: "assets/icons/fog.png" },
    51: { description: "Light Drizzle", icon: "assets/icons/light_drizzle.png" },
    53: { description: "Moderate Drizzle", icon: "assets/icons/moderate_drizzle.png" },
    55: { description: "Dense Drizzle", icon: "assets/icons/dense_drizzle.png" },
    61: { description: "Slight Rain", icon: "assets/icons/light_rain.png" },
    63: { description: "Moderate Rain", icon: "assets/icons/moderate_rain.png" },
    65: { description: "Heavy Rain", icon: "assets/icons/heavy_rain.png" },
    66: { description: "Freezing Rain (Light)", icon: "assets/icons/freezing_rain_light.png" },
    67: { description: "Freezing Rain (Heavy)", icon: "assets/icons/freezing_rain_heavy.png" },
    71: { description: "Light Snowfall", icon: "assets/icons/light_snowfall.png" },
    73: { description: "Moderate Snowfall", icon: "assets/icons/moderate_snowfall.png" },
    75: { description: "Heavy Snowfall", icon: "assets/icons/heavy_snowfall.png" },
    77: { description: "Snow Grains", icon: "assets/icons/snow_grains.png" },
    80: { description: "Slight Rain Showers", icon: isDaytime ? "assets/icons/light_showers_day.png" : "assets/icons/light_showers_night.png" },
    81: { description: "Moderate Rain Showers", icon: isDaytime ? "assets/icons/moderate_showers_day.png" : "assets/icons/moderate_showers_night.png" },
    82: { description: "Violent Rain Showers", icon: isDaytime ? "assets/icons/heavy_showers_day.png" : "assets/icons/heavy_showers_night.png" },
    85: { description: "Slight Snow Showers", icon: "assets/icons/snow_showers_light.png" },
    86: { description: "Heavy Snow Showers", icon: "assets/icons/snow_showers_heavy.png" },
    95: { description: "Thunderstorm (Slight)", icon: "assets/icons/thunderstorm_light.png" },
    96: { description: "Thunderstorm with Hail (Slight)", icon: "assets/icons/thunderstorm_hail_light.png" },
    99: { description: "Thunderstorm with Hail (Heavy)", icon: "assets/icons/thunderstorm_hail_heavy.png" },
  };
  return details[weatherCode] || { description: "Unknown Condition", icon: "assets/icons/unknown.png" };
}


// Display weather data on the card
function displayWeather(data) {
  const weather = data.current_weather;
  const currentHour = new Date().getHours();
  const isDaytime = currentHour >= 6 && currentHour < 18; // Daytime: 6 AM - 6 PM
  const { description, icon } = getWeatherDetails(weather.weathercode, isDaytime);
  const weatherCard = document.getElementById("weather-card");
  weatherCard.innerHTML = `
    <img src="${icon}" alt="${description}" />
    <p class="temperature">${weather.temperature}°F</p>
    <p class="condition">${description}</p>
    <p>Wind Speed: ${weather.windspeed} mph</p>
  `;
}

// Display an error message on the card
function displayError(message) {
  const weatherCard = document.getElementById("weather-card");
  weatherCard.innerHTML = `
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
//window.onload = () => {
  //getUserLocation();
//};
