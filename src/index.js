#!/usr/bin/env node
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parser = (filepath) => {
  const format = path.extname(filepath);
  const data = fs.readFileSync(filepath);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};

const isKey = (obj, key) => _.keys(obj).indexOf(key) !== -1;

const genDiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const result = _.uniq([..._.keys(file1), ..._.keys(file2)])
    .sort()
    .map((key) => {
      if (isKey(file1, key) && isKey(file2, key)) {
        return file1[key] === file2[key]
          ? `    ${key}: ${file1[key]}\n`
          : `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
      }
      if (isKey(file1, key) && !isKey(file2, key)) {
        return `  - ${key}: ${file1[key]}\n`;
      }
      if (!isKey(file1, key) && isKey(file2, key)) {
        return `  + ${key}: ${file2[key]}\n`;
      }
    });
  return (`{\n${result.join('')}}`);
};

export default genDiff;
