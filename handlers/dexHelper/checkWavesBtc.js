const Task = require('folktale/concurrency/task');
const { tap } = require('ramda');
const fetch = require('node-fetch');
const fetchT = Task.fromPromised(fetch);

const API =
  'https://marketdata.wavesplatform.com/api/trades/WAVES/8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS/50';
const getAweragePrice = trades =>
  trades.reduce((acc, t) => acc + +t.price, 0) / 50;
const parseJSON = res => res.json();
const parseJSONT = Task.fromPromised(parseJSON);
const priceView = price => `WAVES/BTC Price: ${price}`;
/**
 * getWavesBtcPrice :: () -> Task Error Response
 */
const getWavesBtcPrice = () =>
  Task.of(API)
    .chain(fetchT)
    .chain(parseJSONT)
    .chain(
      res =>
        res.status === 'error'
          ? Task.rejected(new Error('Cannot obtain info about WAVES/BTC price'))
          : Task.of(res)
    )
    .map(getAweragePrice)
    .map(priceView);

module.exports = { getWavesBtcPrice };
