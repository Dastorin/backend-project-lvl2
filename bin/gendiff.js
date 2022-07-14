#!/usr/bin/env node
/* eslint-disable import/extensions */

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format, <type>', 'output format')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)))
  .parse(process.argv);
