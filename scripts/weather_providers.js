const weatherProviders = [
  'mock',
  'open_meteo',
];

async function loadWeatherProviders() {
  const providers = {};

  for (const providerName of weatherProviders) {
    try {
      const module = await import(`./weather_providers/${providerName}.js`);
      providers[providerName] = module;
    } catch (error) {
      console.error(`Error loading ${providerName} provider:`, error);
    }
  }

  return providers;
}

export default loadWeatherProviders;
