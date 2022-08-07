const getQuotes = (value) => (typeof value === 'string' ? `'${value}'` : value);

export default (date) => {
  const iter = (currentValue, path) => {
    const lines = currentValue
      .flatMap((node) => {
        switch (node.type) {
          case 'value1 === value2': //
            return [];

          case 'value1 !== value2': // update
            return `Property '${[...path, node.key].join('.')}' was updated. From ${getQuotes(node.value[0])} to ${getQuotes(node.value[1])}`;

          case 'value1 & value2-obj': // идти вглубь
            return `${iter(node.value, [...path, node.key])}`;

          case 'key1 value1-obj': // removed
            return `Property '${[...path, node.key].join('.')}' was removed`;

          case 'key1': // removed
            return `Property '${[...path, node.key].join('.')}' was removed`;

          case 'key2 value2-obj': // added [complex value]
            return `Property '${[...path, node.key].join('.')}' was added with value: [complex value]`;

          case 'key2': // added
            return `Property '${[...path, node.key].join('.')}' was added with value: ${getQuotes(node.value)}`;

          case 'value1!==value2 value1-obj': // update From [complex value]
            return `Property '${[...path, node.key].join('.')}' was updated. From [complex value] to ${getQuotes(node.value[1])}`;

          case 'value1!==value2, valu2-obj': // update to [coplex value]
            return `Property '${[...path, node.key].join('.')}' was updated. From ${getQuotes(node.value[0])} to [complex value]`;

          default:
            return 'error type unknown';
        }
      });
    return lines.join('\n');
  };
  return iter(date, []);
};
