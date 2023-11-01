const TelegramBot = require('node-telegram-bot-api');

const { getWeatherFromAPI } = require('./api_handlers/weather-api');
const { apiUrl } = require('./api_handlers/weather-api-config');
const { getHoursInMiliseconds } = require('./additional/helpers');

const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

let timer = null;

// *** COMMANDS ***

const allCommands = [
  {
    command: 'start',
    description: 'run bot',
  },
  {
    command: 'help',
    description: 'help section',
  },
  {
    command: 'stop',
    description: 'stop send notifications',
  },
];

// *** MAIN ***

function launchBot() {
  setCommands(allCommands);
  startBot();
}

// *** SET COMMANDS ***

function setCommands(commands) {
  bot.setMyCommands(commands);
}

// *** ADD COMMANDS RESPONSES ***

async function onStartCommand(msg) {
  try {
    const chatID = msg.chat.id;
    await bot.sendMessage(chatID, '👋 Press the button to start', {
      reply_markup: {
        keyboard: [['Forecast in Nice']],
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
      '❓ To start press /start and launch your forecast timers'
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

async function onForecastClicked(msg) {
  const chatID = msg.chat.id;
  try {
    await bot.sendMessage(chatID, 'Select interval of weather forecast ⌚', {
      reply_markup: {
        keyboard: [['at intervals of 3 hours', 'at intervals of 6 hours']],
        resize_keyboard: true,
        one_time_keyboard: true,
        force_reply: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function sendForecast(msg, hoursInterval) {
  const chatID = msg.chat.id;
  try {
    const sendWeatherData = async () => {
      const weatherData = await getWeatherFromAPI(apiUrl);
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

function startBot() {
  bot.onText(/\/start/, msg => {
    onStartCommand(msg);
  });

  bot.onText(/\/help/, msg => {
    onHelpCommand(msg);
  });

  bot.onText(/\/stop/, msg => {
    onStopCommand(msg);
  });

  bot.onText(/Forecast in Nice/, msg => {
    onForecastClicked(msg);
  });

  bot.onText(/at intervals of 3 hours/, msg => {
    onStartInterval(msg);
    sendForecast(msg, 3);
  });

  bot.onText(/at intervals of 6 hours/, msg => {
    onStartInterval(msg);
    sendForecast(msg, 6);
  });
}

module.exports = { launchBot };
