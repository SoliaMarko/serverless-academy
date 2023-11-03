const axios = require('axios');

const {
  getWeatherInfo,
  getWindInfo,
} = require('../formatters/weather-formatter');

// **************************************************

async function getWeatherFromAPI(url, option = '') {
  try {
    const response = await axios.get(url);
    return option === 'wind'
      ? getWindInfo(response.data)
      : getWeatherInfo(response.data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getWeatherFromAPI };
