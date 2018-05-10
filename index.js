const { BOT_TOKEN } = process.env;

const Bot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const bot = new Bot(BOT_TOKEN, { polling: true });
let intervalId = null;
bot.on('message', msg => {
  const chatId = msg.chat.id;
  console.log(JSON.stringify(msg));
  if (msg.text === 'startInterval') {
    clearInterval(intervalId);
    intervalId = setInterval(
      () => bot.sendMessage(chatId, 'Interval tick'),
      1000
    );
  }
  if (msg.text === 'stop') {
    clearInterval(intervalId);
  }
});
