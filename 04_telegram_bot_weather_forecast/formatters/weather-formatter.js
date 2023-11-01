const { getTempInCelsius, getConvertedDate } = require('../additional/helpers');

function getWeatherInfo(data) {
  const mainData = data.list[0];
  const cityData = data.city;

  const { dt_txt, visibility, weather } = mainData;

  const {
    temp: tempKelvin,
    feels_like: feelsLikeKelvin,
    pressure,
  } = mainData.main;
  const { speed: windSpeed } = mainData.wind;

  const additionalInfo = weather.map(data => data.description);

  const { name: city, country } = cityData;

  const tempCelsius = getTempInCelsius(tempKelvin);
  const feelsLikeCelsius = getTempInCelsius(feelsLikeKelvin);

  const date = getConvertedDate(dt_txt);

  const finalData = `
  ${date}
  ${city}, ${country}
  🌥  ${tempCelsius}°C
  Feels like ${feelsLikeCelsius}°C. ${additionalInfo.join('. ')}
  🍃 ${windSpeed}m/s  ${pressure}hPa
  Visibility: ${(visibility / 1000).toFixed(1)}km
  `;

  return finalData;
}

module.exports = { getWeatherInfo };
