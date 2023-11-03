const axios = require('axios');
const NodeCache = require('node-cache');
const myCache = new NodeCache();

const { cacheLifeTime } = require('../additional/helpers');
const {
  getExchangeRateFormattedMB,
} = require('../formatters/exchange-formatter');

async function getExchangeRateFromMono(url, currency) {
  if (myCache.has(`mono${currency}`)) {
    return myCache.get(`mono${currency}`);
  }
  try {
    const response = await axios.get(url);

    const exchangeRateFormatted = getExchangeRateFormattedMB(
      response.data,
      currency
    );

    myCache.set(`mono${currency}`, exchangeRateFormatted, cacheLifeTime);

    return exchangeRateFormatted;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getExchangeRateFromMono };
