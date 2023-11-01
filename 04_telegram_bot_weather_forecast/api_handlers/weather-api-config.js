const API_KEY = process.env.API_KEY;

const lat = process.env.LAT || 49.842957;
const lon = process.env.LON || 24.031111;

const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

module.exports = { apiUrl };
