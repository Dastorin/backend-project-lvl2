#!/usr/bin/env node

import _ from 'lodash';
import parser from './parses.js';

const isKey = (obj, key) => _.keys(obj).includes(key);

const formater = (key, replacer = '    ', value = '') => `${replacer}${key}: ${value}`

const genDiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);

  const iter = (obj1, obj2, deep) => {

    const result = _.uniq([..._.keys(obj1), ..._.keys(obj2)])
      .sort()
      .map((key) => {
          if (_.isObject(obj1[key]) && _.isObject(obj2[key])){
            return `${formater(key)}: ${iter(obj1[key], obj2[key], deep += 1)}\n`;
          }
          if (_.isObject(obj1[key])){
            return `${formater(key, '  - ')}: ${iter(obj1[key], {}, deep += 1)}\n`
          }
          if (_.isObject(obj2[key])) {
            return `${formater(key, '  + ')}: ${iter({}, obj2[key], deep += 1)}\n`
          }
          if (isKey(obj1, key) && isKey(obj2, key)) {
            return obj1[key] === obj2[key]
              ? `${formater(key, '    ', obj1[key])}\n`
              : `${formater(key, '  - ', obj1[key])}\n${formater(key, '  + ', obj2[key])}\n`
          }
          if (isKey(obj1, key)){
            return `${formater(key, '  - ', obj1[key])}\n`
          }
          if (isKey(obj2, key)) {
            return `${formater(key, '  + ', obj2[key])}\n`
          }
      });
    return (`{\n${result.join('')}}`);
  };



  return iter(file1, file2, 1);
};

export default genDiff;
