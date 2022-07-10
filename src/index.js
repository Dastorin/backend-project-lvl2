import _ from 'lodash';
import parser from './parses.js';

const isKey = (obj, key) => _.keys(obj).includes(key);
const isTwoObjects = (value1, value2) => _.isObject(value1) && _.isObject(value2);
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
            const [value1, value2] = node.value;
            return`${getSufix(currentIndent, '-')}${node.key}: ${value1}\n${getSufix(currentIndent, '+')}${node.key}: ${value2}`;
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
            return`${getSufix(currentIndent, '-')}${node.key}: ${iter2(node.value[0], depth + 1)}\n${getSufix(currentIndent, '+')}${node.key}: ${node.value[1]}`;
          case 'value1!==value2, valu2-obj':
            return`${getSufix(currentIndent, '-')}${node.key}: ${node.value[0]}\n${getSufix(currentIndent, '+')}${node.key}: ${iter2(node.value[1], depth + 1)}`;



          default:
            break;
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

const iter = (obj1, obj2) => {

  const result = _.uniq([..._.keys(obj1), ..._.keys(obj2)])
    .sort()
    .reduce((acc, key) => {
      if (!isKey(obj2, key)) {
        acc = _.isObject(obj1[key]) 
        ? [...acc, {key: key, type: 'key1 value1-obj', value: iter(obj1[key], obj1[key])}]
        : [...acc, {key: key, type: 'key1', value: obj1[key]}];
      } else if (!isKey(obj1, key)) {
        acc = _.isObject(obj2[key]) 
        ? [...acc, {key: key, type: 'key2 value2-obj', value: iter(obj2[key], obj2[key])}]
        : [...acc, {key: key, type: 'key2', value: obj2[key]}];
      } else if (isTwoObjects(obj1[key], obj2[key])) {
        acc = [...acc, {key: key, type: 'value1 & value2-obj', value: iter(obj1[key], obj2[key])}];
      } else if (_.isObject(obj1[key])) {
        acc = [...acc, {key: key, type: 'value1!==value2 value1-obj', value:[iter(obj1[key], obj1[key]), obj2[key]]}];
      } else if (_.isObject(obj2[key])) {
        acc = [...acc, {key: key, type: 'value1!==value2, valu2-obj', value:[obj1[key], iter(obj2[key], obj2[key])]}];
      } else {
        acc = obj1[key] === obj2[key]
            ? [...acc, {key: key, type: 'value1 === value2', value: obj1[key]}]
            : [...acc, {key:key, type: 'value1 !== value2', value: [obj1[key], obj2[key]]}];
      }
      return acc;
    }, []);
  return result;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  return formater(iter(file1, file2));
};

export default genDiff;

