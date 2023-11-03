const bot = require('./bot');

const {
  onStartCommand,
  onHelpCommand,
  onStopCommand,
  onWeatherCommand,
  onExchangeCommand,
  onStartInterval,
  sendForecast,
  sendWindData,
  sendExchangeRateData,
} = require('./bot-command-responses');

function setActions() {
  bot.onText(/\/start/, msg => {
    onStartCommand(msg);
  });

  bot.onText(/\/help/, msg => {
    onHelpCommand(msg);
  });

  bot.onText(/\/stop/, msg => {
    onStopCommand(msg);
  });

  bot.onText(/\/weather/, msg => {
    onWeatherCommand(msg);
  });

  bot.onText(/\/exchange/, msg => {
    onExchangeCommand(msg);
  });

  bot.onText(/Every 3 hours/, msg => {
    onStartInterval(msg);
    sendForecast(msg, 3);
  });

  bot.onText(/Every 6 hours/, msg => {
    onStartInterval(msg);
    sendForecast(msg, 6);
  });

  bot.onText(/Wind/, msg => {
    sendWindData(msg);
  });

  bot.onText(/Previous menu/, msg => {
    onStartCommand(msg);
  });

  bot.onText(/USD/, msg => {
    sendExchangeRateData(msg, 'USD');
  });

  bot.onText(/EUR/, msg => {
    sendExchangeRateData(msg, 'EUR');
  });
}

module.exports = { setActions };
