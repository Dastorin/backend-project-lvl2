#!/usr/bin/env node

import _ from "lodash";
import * as fs from 'node:fs';
import { cwd } from 'node:process';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1));
  const file2 = JSON.parse(fs.readFileSync(filepath2));
  const keys = _.uniq([..._.keys(file1), ..._.keys(file2)]).sort();
  const result = keys.map((key) => {
    if(_.keys(file1).indexOf(key) !== -1 && _.keys(file2).indexOf(key) !== -1) {
     return file1[key] === file2[key] ? 
       `    ${key} : ${file1[key]}\n` : 
       `  - ${key} : ${file1[key]}\n  + ${key} : ${file2[key]}\n`;
    }
    if(_.keys(file1).indexOf(key) !== -1 && _.keys(file2).indexOf(key) === -1) {
      return `  - ${key} : ${file1[key]}\n`;
     }
    if(_.keys(file1).indexOf(key) === -1 && _.keys(file2).indexOf(key) !== -1) {
      return `  + ${key} : ${file2[key]}\n`;
    }
  });
  return console.log(`{\n${result.join('')}}`);
};


export default genDiff;
