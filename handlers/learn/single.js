const Task = require('folktale/concurrency/task');
const itemView = require('./Views/itemFull');
const { getRandomLearningItem } = require('./Model');
const keywords = [
  'вкинь',
  'че поучить',
  'что поучить',
  'что учить',
  'еще',
  'qwe',
  'что делать',
].map(s => new RegExp(s));

const predicate = req => keywords.some(w => w.test(req.text.toLowerCase()));
const handler = req =>
  Task.of(req)
    .map(getRandomLearningItem)
    .map(itemView);

module.exports = [predicate, handler];
