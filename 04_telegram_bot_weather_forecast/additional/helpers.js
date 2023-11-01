const { TEMPERATURE_VALUE_IN_KELVIN, MONTHES } = require('./constants');

// *** HELPERS ***

function getTempInCelsius(kelvin) {
  return Math.round(kelvin - TEMPERATURE_VALUE_IN_KELVIN);
}

function getConvertedDate(dateTxt) {
  const initDate = new Date(dateTxt);
  const month = MONTHES[initDate.getMonth()];
  const day = initDate.getDate();
  const hour = String(initDate.getHours()).padStart(2, '0');
  const minute = String(initDate.getMinutes()).padStart(2, '0');

  return `${month} ${day}, ${hour}:${minute}`;
}

module.exports = { getTempInCelsius, getConvertedDate };
