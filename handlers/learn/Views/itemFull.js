const { formatState } = require('./state');

const PRIORITIES = {
  0: 'Неприоритетно',
  1: 'Неприоритетно',
  2: 'Неприоритетно',
  4: 'ℹ️ Normal',
  8: '⚠️ High',
  16: '🔥 Critical',
};

module.exports = ({ state, priority, name, url, type, cta }) => `
${cta}

*Название:*
${name}

*Приоритет:*
${PRIORITIES[priority]}

*Прогресс:*
${formatState(state)}

${url ? url : ''}
`;
