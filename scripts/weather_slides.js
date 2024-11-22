const weatherSlides = [
  'current_conditions',
];

async function loadWeatherSlides() {
  const slides = {};

  for (const slideName of weatherSlides) {
    try {
      const module = await import(`./weather_slides/${slideName}.js`);
      slides[slideName] = module;
    } catch (error) {
      console.error(`Error loading ${slideName} slide:`, error);
    }
  }

  return slides;
}

export default loadWeatherSlides;
