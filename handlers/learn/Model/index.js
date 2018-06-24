const state = require('./state.json');
const chooseRandom = require('../../../utils/chooseRandom');

const getRandomLearningItem = () => chooseRandom(state);
const getState = () => state;
module.exports = {
  getRandomLearningItem,
  getState,
};
