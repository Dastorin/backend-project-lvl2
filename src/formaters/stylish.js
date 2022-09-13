import _ from "lodash"

const getPerfix = (node, countSpace = 1, replacer = '    ') => {
  
  const symbol = {
    'added': ['+'],
    'deleted': ['-'],
    'unchanged': [' '],
    'changed': ['-', '+'],
    'nested': [' '],
  };
  return symbol[node.type].map((el) => `${replacer.repeat(countSpace).substring(2)}${el} `);
};

const getString = (value, spaceCount, replacer = '    ') => {
  const iter = (currentValue, depth) => {  
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const indentSize = depth * spaceCount + 1;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(spaceCount + depth - 1);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    return [
     '{',
     ...lines,
     `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, 1);
};

const getOldValue = (node) => (node.meta.oldValue);

export default (data) => {
  const iter = (obj, depth = 1) => {
    const space = '    '.repeat(depth - 1);
    const result = obj.map((node) => {
      switch (node.type) {
        case 'added':
          return `${getPerfix(node, depth)}${node.key}: ${getString(node.value2, depth)}`;
        case 'deleted':
          return `${getPerfix(node, depth)}${node.key}: ${getString(node.value1, depth)}`;
        case 'unchanged':
          return `${getPerfix(node, depth)}${node.key}: ${getString(node.value1, depth)}`;
        case 'changed':
          return `${getPerfix(node, depth)[0]}${node.key}: ${getString(getOldValue(node), depth)}\n${getPerfix(node, depth)[1]}${node.key}: ${getString(node.value2, depth)}`;
        case 'nested':
          return `${getPerfix(node, depth)}${node.key}: ${iter(node.children, depth + 1)}`;

        default: console.error(new Error(`unknown type ${node.type}!`));
      }
    });
    return [
      '{',
      ...result,
      `${space}}`
    ].join('\n');
  }
  return iter(data, 1);
}
