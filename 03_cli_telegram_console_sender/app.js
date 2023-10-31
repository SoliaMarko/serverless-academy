const { Command } = require('commander');
const program = new Command();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
let chatId = process.env.CHAT_ID;

main();

// *** UTILS ***

async function main() {
  // send-message-util
  program
    .command('send-message')
    .description('Send message to Telegram Bot')
    .argument('<text>', 'text to send')
    .action(message => {
      if (!message) console.log('Write some text to send to bot.');
      sendMessageToBot(message);
      process.exit(0);
    });

  // send-photo-util
  program
    .command('send-photo')
    .description('Send photo to Telegram Bot')
    .argument('<path>', 'path of photo to send')
    .action(path => {
      if (!path)
        console.log('Write path of the photo you want to send to bot.');
      sendPhotoToBot(path);
      process.exit(0);
    });

  await program.parseAsync();
}

// *** TELEGRAM HANDLERS ***

// send-message-handler
function sendMessageToBot(message) {
  if (!message) console.log('Write some text.');
  bot.sendMessage(chatId, message);
  console.log('You successfully sent message to your bot');
}

// send-photo-handler
function sendPhotoToBot(path) {
  if (!path) console.log('Add path to the photo.');
  bot.sendPhoto(chatId, path);
  console.log('You successfully sent photo to your bot');
}

// *** GET CHAT_ID ***

// bot.on('message', msg => {
//   const chatId = msg.chat.id;
//   console.log(chatId);

//   bot.sendMessage(chatId, 'Received your message');
// });
