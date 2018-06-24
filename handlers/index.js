const Task = require('folktale/concurrency/task');
const { T } = require('ramda');

/**
 * @typedef handler
 * @function
 * @param { Request } req
 * @returns { Result Error Response }
 */
/**
 * [
 *  [predicate, handler]
 * ]
 */
const handlers = [
  ...require('./learn'),
  ...require('./dexHelper'),
  [T, () => Task.rejected(new Error('No handler found'))],
];

module.exports = handlers;
