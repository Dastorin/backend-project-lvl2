import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getComparison from './comparison.js';
import formater from './formaters/index.js';

const getTypeData = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(filepath);

export default (filepath1, filepath2, type) => {
  const file1 = parser(readFile(filepath1), getTypeData(filepath1));
  const file2 = parser(readFile(filepath2), getTypeData(filepath2));
  return formater(getComparison(file1, file2), type);
};
