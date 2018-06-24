const renderStatusAll = state => `
*Твой текущий статус:*

${state
  .map(renderEntry)
  .map(s => `🔹 ${s}`)
  .join('')}
`;

const { isNil, complement } = require('ramda');
const notNil = complement(isNil);
const allNotNil = (...args) => args.every(notNil);

const formatState = state => {
  const { estimate, estimateParts, progressParts, progress } = state;
  if (allNotNil(estimate, progress)) {
    return `${progress}/${estimate}`;
  } else if (allNotNil(estimateParts, progressParts)) {
    return `${progressParts}/${estimateParts}`;
  }
  return 'N/A';
};

const renderEntry = entry => `${entry.name}: ${formatState(entry.state)}\n`;

module.exports = {
  formatState,
  renderStatusAll,
};
