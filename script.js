// Fetch weather data by city name
async function fetchWeatherData(location) {
  const apiKey = ${{ secrets.OPENWEATHER_API }};
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`
  );
  const data = await response.json();
  displayWeather(data);
}

// Fetch weather data by coordinates
async function fetchWeatherDataByCoords(lat, lon) {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'${{ secrets.OPENWEATHER_API }};
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  );
  const data = await response.json();
  displayWeather(data);
}

// Display weather data
function displayWeather(data) {
  document.getElementById('local-weather').innerHTML = `
    <p>Location: ${data.name}</p>
    <p>Temperature: ${data.main.temp}°F</p>
    <p>Condition: ${data.weather[0].description}</p>
  `;
}

// Get user's current position using Geolocation API
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        fetchWeatherDataByCoords(latitude, longitude); // Fetch weather for location
      },
      (error) => {
        console.error('Error getting location:', error);
        // Default to a location (e.g., New York) if permission is denied
        fetchWeatherData('New York');
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    // Fallback to a default location
    fetchWeatherData('New York');
  }
}

// Initialize
window.onload = () => {
  getUserLocation();
};

