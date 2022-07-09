import _ from 'lodash';
import parser from './parses.js';

const isKey = (obj, key) => _.keys(obj).includes(key);
const isTwoObjects = (value1, value2) => _.isObject(value1) && _.isObject(value2);

const formater = (date) => {
  return console.log((date))
};

const genDiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const iter = (obj1, obj2) => {

    const result = _.uniq([..._.keys(obj1), ..._.keys(obj2)])
      .sort()
      .map((key) => {
          if (isKey(obj1, key) && isKey(obj2, key)) {
            if (isTwoObjects(obj1[key], obj2[key])) {
              return {key: key, type: '2', value: iter(obj1[key], obj2[key])};
            }
          
            return obj1[key] === obj2[key]
              ? {key: key, type: '=', value: obj1[key]}
              : {key:key, type: '!=', value: [obj1[key], obj2[key]]};
          }
          if (isKey(obj1, key)){
            return {key: key, type: 'first', value: obj1[key]};
          }
          if (isKey(obj2, key)) {
            return {key: key, type: 'second', value: obj2[key]};
          }
      });
    return formater(result);
  };
  return iter(file1, file2);
};

export default genDiff;
