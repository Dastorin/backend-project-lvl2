#!/usr/bin/env node

import * as fs from 'node:fs';
import { cwd } from 'node:process';

const genDiff = (filepath1, filepath2) => {
  console.log(`++++++++++ ${cwd()}`);
  console.log(JSON.parse(fs.readFileSync(filepath1)));
  console.log('----------------');
  console.log(JSON.parse(fs.readFileSync(filepath2)));
};


export default genDiff;
