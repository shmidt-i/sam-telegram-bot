const { BOT_TOKEN } = process.env;

const Bot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const state = require('./things.json');
const app = require('./httpServer');

const bot = new Bot(BOT_TOKEN, { polling: true });
const triggers = [
  'вкинь',
  'че поучить',
  'что поучить',
  'что учить',
  'еще',
  'qwe',
  'что делать',
].map(s => new RegExp(s));

const chooseRandom = require('./chooseRandom');
const formatItem = require('./Views/itemFull');
const { renderStatusAll } = require('./Views/state');
let intervalId = null;
const { getWavesBtcPrice } = require('./checkWavesBtc');
bot.on('message', async msg => {
  const chatId = msg.chat.id;
  if (msg.text === 'stop') {
    clearInterval(intervalId);
    bot.sendMessage(chatId, 'Пока перестаю напоминать 😉');
  }
  if (msg.text === 'price') {
    const price = await getWavesBtcPrice();
    bot.sendMessage(chatId, 'ЦЕНА WAVES/BTC: ' + price);
  }
  if (msg.text === 'run') {
    clearInterval(intervalId);
    bot.sendMessage(chatId, 'Окей, буду трекать цену WAVES/BTC раз в минуту');

    intervalId = setInterval(async () => {
      const price = await getWavesBtcPrice();
      console.log(Date.now(), price);
      if (price < '0.00060000') {
        bot.sendMessage(chatId, 'ЦЕНА WAVES/BTC: ' + price);
      }
    }, 1000 * 60);
  }

  if (triggers.some(t => t.test(msg.text.toLowerCase()))) {
    const item = chooseRandom(state);
    bot.sendMessage(chatId, formatItem(item), { parse_mode: 'Markdown' });
  }
  if (msg.text === 'status') {
    bot.sendMessage(chatId, renderStatusAll(state), { parse_mode: 'Markdown' });
  }
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening to %s', port);
