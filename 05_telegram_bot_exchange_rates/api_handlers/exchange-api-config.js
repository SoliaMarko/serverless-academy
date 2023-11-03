const { getTodayDate } = require('../additional/helpers');

const todayDate = getTodayDate();

const PRIVAT_EXCHANGE_API_URL = `https://api.privatbank.ua/p24api/exchange_rates?date=${todayDate}`;
const MONO_EXCHANGE_API_URL = 'https://api.monobank.ua/bank/currency';

module.exports = { PRIVAT_EXCHANGE_API_URL, MONO_EXCHANGE_API_URL };
