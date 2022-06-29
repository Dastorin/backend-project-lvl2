#!/usr/bin/env node
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export default (filepath) => {
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
