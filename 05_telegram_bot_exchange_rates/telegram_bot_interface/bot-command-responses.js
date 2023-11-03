const bot = require('./bot');

const { BASE_CURRANCE } = require('../additional/constants');
const { getWeatherFromAPI } = require('../api_handlers/weather-api-handler');
const { WEATHER_API_URL } = require('../api_handlers/weather-api-config');
const {
  PRIVAT_EXCHANGE_API_URL,
  MONO_EXCHANGE_API_URL,
} = require('../api_handlers/exchange-api-config');

const { getHoursInMiliseconds } = require('../additional/helpers');
const {
  getExchangeRateFromPrivat,
} = require('../api_handlers/privat-api-handler');
const { getExchangeRateFromMono } = require('../api_handlers/mono-api-handler');

// *** ADD COMMANDS RESPONSES ***

let timer = null;

async function onStartCommand(msg) {
  try {
    const chatID = msg.chat.id;
    await bot.sendMessage(chatID, '👋 Choose the option to start', {
      reply_markup: {
        keyboard: [['/weather'], ['/exchange rate']],
        resize_keyboard: true,
        one_time_keyboard: true,
        force_reply: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function onHelpCommand(msg) {
  const chatID = msg.chat.id;
  try {
    await bot.sendMessage(
      chatID,
      '❓ To start press /start and launch your forecast timers or select exchange rate'
    );
  } catch (err) {
    console.error(err);
  }
}

async function onStopCommand(msg) {
  const chatID = msg.chat.id;
  if (timer) {
    clearInterval(timer);
    try {
      await bot.sendMessage(
        chatID,
        '✖ The interval has been cleared!\n\
        You will no longer receive weather forecast notifications.\n\
        If you want to configure again, just press /start'
      );
    } catch (err) {
      console.error(err);
    }
    return;
  }
  try {
    await bot.sendMessage(
      chatID,
      '⛔ Currently you do not have a notification interval configured.\n\
      Click /start to start the configuration'
    );
  } catch (err) {
    console.error(err);
  }
}

async function onWeatherCommand(msg) {
  const chatID = msg.chat.id;
  try {
    await bot.sendMessage(chatID, 'Select interval of weather forecast ⌚', {
      reply_markup: {
        keyboard: [
          ['Every 3 hours', 'Every 6 hours'],
          ['Wind'],
          ['Previous menu'],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
        force_reply: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function onExchangeCommand(msg) {
  const chatID = msg.chat.id;
  try {
    await bot.sendMessage(
      chatID,
      'Select currency to input its exchange rate for today 💱',
      {
        reply_markup: {
          keyboard: [['USD', 'EUR'], ['Previous menu']],
          resize_keyboard: true,
          one_time_keyboard: true,
          force_reply: true,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
}

async function onStartInterval(msg) {
  if (timer) clearInterval(timer);
  const chatID = msg.chat.id;
  try {
    await bot.sendMessage(
      chatID,
      '✔ The interval has been successfuly launched.\n\
      Have a nice and sunny day! 🌞'
    );
  } catch (err) {
    console.error(err);
  }
}

async function sendForecast(msg, hoursInterval) {
  const chatID = msg.chat.id;
  try {
    const sendWeatherData = async () => {
      const weatherData = await getWeatherFromAPI(WEATHER_API_URL);
      return weatherData;
    };

    await bot.sendMessage(chatID, await sendWeatherData());

    timer = setInterval(async () => {
      try {
        const weatherData = await sendWeatherData();
        await bot.sendMessage(chatID, weatherData);
      } catch (error) {
        console.error('Error sending periodic forecast:', error);
      }
    }, getHoursInMiliseconds(hoursInterval));
  } catch (err) {
    console.error('Error sending initial forecast:', err);
  }
}

async function sendWindData(msg) {
  const chatID = msg.chat.id;
  try {
    const sendWeatherData = async () => {
      const weatherData = await getWeatherFromAPI(WEATHER_API_URL, 'wind');
      return weatherData;
    };

    await bot.sendMessage(chatID, await sendWeatherData());
  } catch (err) {
    console.error('Error sending initial forecast:', err);
  }
}

async function sendExchangeRateData(msg, currency) {
  const chatID = msg.chat.id;
  try {
    const sendExchangeData = async () => {
      const exchangeData =
        (await getExchangeRateFromPrivat(PRIVAT_EXCHANGE_API_URL, currency)) +
        ((await getExchangeRateFromMono(MONO_EXCHANGE_API_URL, currency)) ||
          `_Base Currency: 🇺🇦 ${BASE_CURRANCE}_`);
      return exchangeData;
    };

    await bot.sendMessage(chatID, await sendExchangeData(), {
      parse_mode: 'Markdown',
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  onStartCommand,
  onHelpCommand,
  onStopCommand,
  onWeatherCommand,
  onExchangeCommand,
  onStartInterval,
  sendForecast,
  sendWindData,
  sendExchangeRateData,
};
