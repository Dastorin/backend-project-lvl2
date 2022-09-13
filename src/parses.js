import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export default (filepath) => {
  const format = path.extname(filepath);
  const data = fs.readFileSync(filepath);
  let parse;
  switch (format) {
    case '.json':
      parse = JSON.parse;
      break;
    case '.yml':
      parse = yaml.load;
      break;
    case '.yaml':
      parse = yaml.load;
      break;
    default:
      console.error(new Error(`unknown format ${data}!`));
      break;
  }
  return parse(data);
};
