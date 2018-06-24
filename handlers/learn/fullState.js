const Task = require('folktale/concurrency/task');
const { renderStatusAll } = require('./Views/state');
const { getState } = require('./Model');

const predicate = req => /status/.test(req.text.toLowerCase());
const handler = req =>
  Task.of(req)
    .map(getState)
    .map(renderStatusAll);

module.exports = [predicate, handler];
