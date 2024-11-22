// Display weather data in the Local Weather section
export function displayWeather(data) {
  const weatherContainer = document.getElementById("weather-card");

  weatherContainer.innerHTML = `
    <h2>Local on the 8s</h2>
    <img src="assets/icons/${data.current_conditions.weather_icon}.svg" alt="${data.current_conditions.weather}" style="width: 50px; height: 50px;" color: white;>
    <p><strong>Temperature:</strong> ${data.current_conditions.temperature_f}°F</p>
    <p><strong>Wind Speed:</strong> ${data.current_conditions.wind} mph</p>
    <p><strong>Condition:</strong> ${data.current_conditions.weather}</p>
    <p><strong>Humidity:</strong> ${data.current_conditions.humidity_pct}%</p>
    <p><strong>Dew Point:</strong> ${data.current_conditions.dew_point_f}°F</p>
    <p><strong>Pressure:</strong> ${data.current_conditions.pressure_inhg} inHg</p>
    <p><strong>Visibility:</strong> ${data.current_conditions.visibility_ft} ft</p>
  `;
}
