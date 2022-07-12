#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format, <type>', 'output format')
  .action((filepath1, filepath2) => console.log(stylish(genDiff(filepath1, filepath2))))
  .parse(process.argv);
