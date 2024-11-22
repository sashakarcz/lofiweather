import displayError from "../errors.js";

// Fetch current weather from Open-Meteo API
async function fetchWeatherDataByCoords(lat, lon) {
  try {
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`
    );
    const weatherData = await weatherResponse.json();
    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const locationResponse = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const locationData = await locationResponse.json();
    if (!locationResponse.ok) {
      throw new Error("Failed to fetch location data");
    }

    const locationName = locationData.display_name;

    console.log("Raw weather data:", weatherData);
    console.log("Location name:", locationName);

    return {
      current_conditions: {
        location: locationName,
        temperature_f: weatherData.current_weather.temperature,
        weather: getWeatherDescription(weatherData.current_weather.weathercode),
        weather_icon: getWeatherIcon(weatherData.current_weather.weathercode),
        wind: `${weatherData.current_weather.windspeed} ${weatherData.current_weather.winddirection}`,
        humidity_pct: weatherData.current_weather.humidity,
        dew_point_f: weatherData.current_weather.dewpoint,
        pressure_inhg: weatherData.current_weather.pressure,
        visibility_ft: weatherData.current_weather.visibility
      }
    };
  } catch (error) {
    displayError(error.message);
  }
}

// Map weather codes to human-readable descriptions
function getWeatherDescription(weatherCode) {
  const descriptions = {
    0: "Clear",
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
    0:  "clear_sky_day",  // TODO: Add logic to determine day or night
    1:  "mainly_clear",
    2:  "partly_cloudy",
    3:  "overcast",
    45: "fog",
    48: "fog",
    51: "light_drizzle",
    53: "moderate_drizzle",
    55: "dense_drizzle",
    61: "light_rain",
    63: "moderate_rain",
    65: "heavy_rain",
    80: "light_showers",
    81: "moderate_showers",
    82: "heavy_showers",
  };
  return icons[weatherCode] || "unknown";
}

export default fetchWeatherDataByCoords;
