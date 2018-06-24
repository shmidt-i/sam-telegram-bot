const { BOT_TOKEN } = process.env;
const processMsg = require('./flow');

const Bot = require('node-telegram-bot-api');

const bot = new Bot(BOT_TOKEN, { polling: true });
const doAnswer = (bot, chatId) => text =>
  bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });

bot.on('message', msg =>
  processMsg(msg)
    .run()
    .listen({
      onResolved: doAnswer(bot, msg.chat.id),
      onRejected: doAnswer(bot, msg.chat.id),
    })
);

console.log('Bot is ready');
