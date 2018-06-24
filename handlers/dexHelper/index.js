const { getWavesBtcPrice } = require('./checkWavesBtc');

const predicate = req => req.text === 'price';
module.exports = [[predicate, getWavesBtcPrice]];
