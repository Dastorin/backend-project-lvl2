const getSufix = (string, sufix) => {
  const result = string.split('');
  result[string.length - 2] = sufix;
  return result.join('');
};

const formater = (date, replacer = '    ', spacesCount = 1) => {
  const iter2 = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = currentValue
      .map((node) => {
        switch (node.type) {
          case 'value1 === value2':
            return `${currentIndent}${node.key}: ${node.value}`;
          case 'value1 !== value2':
            return `${getSufix(currentIndent, '-')}${node.key}: ${node.value[0]}\n${getSufix(currentIndent, '+')}${node.key}: ${node.value[1]}`;
          case 'value1 & value2-obj':
            return `${currentIndent}${node.key}: ${iter2(node.value, depth + 1)}`;
          case 'key1 value1-obj':
            return `${getSufix(currentIndent, '-')}${node.key}: ${iter2(node.value, depth + 1)}`;
          case 'key1':
            return `${getSufix(currentIndent, '-')}${node.key}: ${node.value}`;
          case 'key2 value2-obj':
            return `${getSufix(currentIndent, '+')}${node.key}: ${iter2(node.value, depth + 1)}`;
          case 'key2':
            return `${getSufix(currentIndent, '+')}${node.key}: ${node.value}`;
          case 'value1!==value2 value1-obj':
            return `${getSufix(currentIndent, '-')}${node.key}: ${iter2(node.value[0], depth + 1)}\n${getSufix(currentIndent, '+')}${node.key}: ${node.value[1]}`;
          case 'value1!==value2, valu2-obj':
            return `${getSufix(currentIndent, '-')}${node.key}: ${node.value[0]}\n${getSufix(currentIndent, '+')}${node.key}: ${iter2(node.value[1], depth + 1)}`;
          default:
            return 'error type unknown';
        }
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter2(date, 1);
};

export default formater;
