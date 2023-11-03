const { TEMPERATURE_VALUE_IN_KELVIN, MONTHES } = require('./constants');

// *** HELPERS ***

function getTempInCelsius(kelvin) {
  return Math.round(kelvin - TEMPERATURE_VALUE_IN_KELVIN);
}

function getHoursInMiliseconds(hours) {
  return hours * 60 * 60 * 1000;
}

function getConvertedDate(dateTxt) {
  const initDate = new Date(dateTxt);
  const month = MONTHES[initDate.getMonth()];
  const day = initDate.getDate();
  const hour = String(initDate.getHours()).padStart(2, '0');
  const minute = String(initDate.getMinutes()).padStart(2, '0');

  return `${month} ${day}, ${hour}:${minute}`;
}

function getTodayDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 *
 * @param {'today', 'yesterday', 'tomorrow'} day
 * @returns for 'today' => current date and time, for others its date at 00:00:00
 */

function getNearDate(day = 'today') {
  const date = new Date();

  if (day === 'today') return date;

  if (day === 'tomorrow') {
    date.setDate(date.getDate() + 1);
  }

  if (day === 'yesterday') {
    date.setDate(date.getDate() - 1);
  }

  date.setHours(0, 0, 0, 0);

  return date;
}

function getSecondsFromNowToTomorrow() {
  const nowMiliseconds = getNearDate('today').getTime();
  const tomorrowMidnightMiliseconds = getNearDate('tomorrow').getTime();

  const differenceInSeconds = Math.round(
    (tomorrowMidnightMiliseconds - nowMiliseconds) / 1000
  );

  return differenceInSeconds;
}

const cacheLifeTime = getSecondsFromNowToTomorrow();

module.exports = {
  getTempInCelsius,
  getHoursInMiliseconds,
  getConvertedDate,
  getTodayDate,
  cacheLifeTime,
};
