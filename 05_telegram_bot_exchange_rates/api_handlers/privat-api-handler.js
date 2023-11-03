const axios = require('axios');

const {
  getExchangeRateFormattedPB,
} = require('../formatters/exchange-formatter');

async function getExchangeRateFromPrivat(url, currency) {
  try {
    const response = await axios.get(url);

    const exchangeRateFormatted = getExchangeRateFormattedPB(
      response.data,
      currency
    );

    return exchangeRateFormatted;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getExchangeRateFromPrivat };
