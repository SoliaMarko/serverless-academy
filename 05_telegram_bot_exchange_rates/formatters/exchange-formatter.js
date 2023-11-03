const { CURRENCY_CODES, BASE_CURRANCE } = require('../additional/constants');

function getExchangeRateFormattedPB(data, currency) {
  const { date, exchangeRate } = data;

  const currencyData = exchangeRate.find(obj => obj.currency === currency);

  const {
    saleRateNB,
    saleRate: saleRatePB,
    purchaseRate: purchaseRatePB,
  } = currencyData;

  const finalData = `
  _As of ${date}:_

  💶 *${currency}*

  ---------------------------------------------

  *National Bank*

    ◐ sale / purchase = ${saleRateNB.toFixed(2)}

  ---------------------------------------------

  *Privat Bank*

    ◉ sale = ${saleRatePB}
    ◎ purchase = ${purchaseRatePB}

  ---------------------------------------------
  
  `;

  return finalData;
}

function getExchangeRateFormattedMB(data, currency) {
  const currencyData = data.find(
    obj =>
      obj.currencyCodeA === CURRENCY_CODES[currency] &&
      obj.currencyCodeB === CURRENCY_CODES[BASE_CURRANCE]
  );

  const { rateBuy: purchaseRateMB, rateSell: saleRateMB } = currencyData;

  const finalData = `*Mono Bank*

    ◉ sale = ${saleRateMB.toFixed(2)}
    ◎ purchase = ${purchaseRateMB.toFixed(2)}

  ---------------------------------------------

  _Base Currency: 🇺🇦 ${BASE_CURRANCE}_
  `;

  return finalData;
}

module.exports = { getExchangeRateFormattedPB, getExchangeRateFormattedMB };
