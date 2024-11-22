import displayError from "../errors.js";

// Fetch current weather from Open-Meteo API
async function fetchWeatherDataByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`
    );
    const data = await response.json();
    if (response.ok) {
      console.log("Raw weather data:", data);
      return {
        current_conditions: {
          //location: data.location.name,
          temperature_f: data.current_weather.temperature,
          weather: getWeatherDescription(data.current_weather.weathercode),
          weather_icon: getWeatherIcon(data.current_weather.weathercode),
          // TODO: Convert wind to MPH
          wind: `${data.current_weather.windspeed} ${data.current_weather_units.windspeed}`, // TODO: Add direction,
          //gusts: data.current_weather.gusts,
          //humidity_pct: data.current_weather.humidity,
          //dew_point_f: data.current_weather.dewpoint,
          //ceiling_ft: data.current_weather.cloudcover,
          //visibility_ft: data.current_weather.visibility,
          //pressure_inhg: data.current_weather.pressure,
        },
      };
    } else {
      console.error("Error fetching weather data:", data);
      displayError("Failed to fetch weather data.");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    displayError("Failed to fetch weather data.");
    return null;
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
export function getWeatherData(location) {
  console.log("Fetching weather data for location:", location);
  return fetchWeatherDataByCoords(location.latitude, location.longitude);
  return {
    current_conditions: {
      location: "Ada, MI",
      temperature_f: 65,
      weather: "Clear",
      weather_icon: "clear_sky",
      wind: "Calm",
      gusts: "None",
      humidity_pct: 50,
      dew_point_f: 65,
      ceiling_ft: 0,
      visibility_ft: 0,
      pressure_inhg: 0,
    },
  };
}
