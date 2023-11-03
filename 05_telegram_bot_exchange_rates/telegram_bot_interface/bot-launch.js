const bot = require('./bot');

const { setActions } = require('./bot-set-actions');

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
    description: 'stop sending notifications',
  },
  {
    command: 'weather',
    description: 'launch weather forecast notifications',
  },
  {
    command: 'exchange',
    description: 'get exchange rate',
  },
];

// *** SET COMMANDS ***

function setCommands(commands) {
  bot.setMyCommands(commands);
}

// *** MAIN ***

function launchBot() {
  setCommands(allCommands);
  setActions();
}

module.exports = { launchBot };
