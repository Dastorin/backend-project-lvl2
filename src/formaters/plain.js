import _ from 'lodash';

const getQuotes = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (date) => {
  const iter = (currentValue, path) => {
    const lines = currentValue
      .flatMap((node) => {
        switch (node.type) {
          case 'unchanged':
            return [];

          case 'changed':
            return `Property '${[...path, node.key].join('.')}' was updated. From ${getQuotes(node.meta.oldValue)} to ${getQuotes(node.value2)}`;

          case 'nested':
            return `${iter(node.children, [...path, node.key])}`;

          case 'deleted':
            return `Property '${[...path, node.key].join('.')}' was removed`;

          case 'added':
            return `Property '${[...path, node.key].join('.')}' was added with value: ${getQuotes(node.value2)}`;

          default:
            return 'error type unknown';
        }
      });
    return lines.join('\n');
  };
  return iter(date, []);
};
