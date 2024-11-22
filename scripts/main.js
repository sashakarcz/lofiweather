import settings from './settings.js';
import getLocation from './location.js';
import importWeatherProviders from './weather_providers.js';
import importWeatherSlides from './weather_slides.js';

async function main() {

  const location = await getLocation();
  console.log('Location:', location);

  const weatherProviders = await importWeatherProviders();
  console.log('Weather provider:', settings.weather_provider);
  
  const data = await weatherProviders[settings.weather_provider].getWeatherData(location);
  console.log(`Weather data: ${JSON.stringify(data)}`);

  const weatherSlides = await importWeatherSlides();
  weatherSlides["current_conditions"].displayWeather(data);
}

// Initialize the app
window.onload = () => {
  main();
};
