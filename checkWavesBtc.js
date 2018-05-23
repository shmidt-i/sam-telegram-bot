const API =
  'https://marketdata.wavesplatform.com/api/trades/WAVES/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS/50';
const fetch = require('node-fetch');

const getWavesBtcPrice = async () => {
  let trades = await fetch(API).then(res => res.json());
  return trades.reduce((acc, t) => acc + +t.price, 0) / 50;
};

module.exports = { getWavesBtcPrice };
