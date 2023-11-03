const API_KEY = process.env.API_KEY;

const lat = process.env.LAT || 49.842957;
const lon = process.env.LON || 24.031111;

const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

module.exports = { WEATHER_API_URL };
