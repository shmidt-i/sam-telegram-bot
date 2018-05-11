const { BOT_TOKEN } = process.env;

const Bot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const state = require('./things.json');

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
const PRIORITIES = {
  0: 'Неприоритетно',
  1: 'Неприоритетно',
  2: 'Неприоритетно',
  4: 'ℹ️ Normal',
  8: '⚠️ High',
  16: '🔥 Critical',
};
const { isNil, complement } = require('ramda');
const notNil = complement(isNil);
const allNotNil = (...args) => args.every(notNil);
const formatState = state => {
  console.log(state);
  const { estimate, estimateParts, progressParts, progress } = state;
  if (allNotNil(estimate, progress)) {
    return `${progress}/${estimate}`;
  } else if (allNotNil(estimateParts, progressParts)) {
    return `${progressParts}/${estimateParts}`;
  }
  return 'N/A';
};
const formatItem = ({ state, priority, name, url, type, cta }) => `
${cta}

*Название:*
${name}

*Приоритет:*
${PRIORITIES[priority]}

*Прогресс:*
${formatState(state)}

${url ? url : ''}
`;
bot.on('message', msg => {
  const chatId = msg.chat.id;
  // console.log(JSON.stringify(msg, null, 2));
  if (triggers.some(t => t.test(msg.text.toLowerCase()))) {
    const item = chooseRandom(state);
    bot.sendMessage(chatId, formatItem(item), { parse_mode: 'Markdown' });
  }
});
