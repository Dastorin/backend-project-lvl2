import fs from 'fs';
import path from 'path';
import parser from './parses.js';
import getComparison from './comparison.js';
import formater from './formaters/index.js';

export default (filepath1, filepath2, type) => {
  const format1 = path.extname(filepath1);
  const data1 = fs.readFileSync(filepath1);

  const format2 = path.extname(filepath2);
  const data2 = fs.readFileSync(filepath2);

  const file1 = parser(data1, format1);
  const file2 = parser(data2, format2);
  return formater(getComparison(file1, file2), type);
};
