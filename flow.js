const Task = require('folktale/concurrency/task');
const Result = require('folktale/result');
const { path, cond, T, tap } = require('ramda');
const handlers = require('./handlers');
const MY_CHAT_ID = +process.env.MY_CHAT_ID;

/**
 * isCorrectChatId:: number -> Result Error number
 */
const isCorrectChatId = correctId => id =>
  id === correctId
    ? Result.Ok(id)
    : Result.Error(
        new Error(`I can't speak with you. Ask my master: t.me/ishmidt`)
      );
/**
 * checkCollocutor:: Request => Result Error Request
 */
const checkCollocutor = correctChatId => req =>
  Result.of(req)
    .map(path(['chat', 'id']))
    .chain(isCorrectChatId(correctChatId))
    .chain(() => Result.of(req));

/**
 *  findHandler :: Request -> Result Error Response
 */
const findAndApplyHandler = handlers => req =>
  Result.of(req).chain(cond(handlers));

/**
 * resultToTask :: Result * -> Task *
 */
const resultToTask = result =>
  result.matchWith({
    Ok: ({ value }) => Task.of(value),
    Error: ({ value }) => Task.rejected(value),
  });

/**
 * @typedef Response
 * @type String
 */

/**
 * flow :: Request -> Task Error Response
 */
const flow = req =>
  Task.of(req) // Task Request
    .map(checkCollocutor(MY_CHAT_ID)) // Task Result (Error Request)
    .chain(resultToTask) // Task Error Request
    .chain(findAndApplyHandler(handlers)) // Task Error Response
    .mapRejected(e => {
      console.error(e);
      return e.message;
    }); // Task Response

module.exports = flow;
