const axios = require('axios');

const { getWeatherInfo } = require('../formatters/weather-formatter');

// **************************************************

async function getWeatherFromAPI(url) {
  try {
    const response = await axios.get(url);
    return getWeatherInfo(response.data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getWeatherFromAPI };
