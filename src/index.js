import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getComparison from './comparison.js';
import formater from './formaters/index.js';

export default (filepath1, filepath2, type) => {
  const typeData1 = path.extname(filepath1).slice(1);
  const data1 = fs.readFileSync(filepath1);

  const typeData2 = path.extname(filepath2).slice(1);
  const data2 = fs.readFileSync(filepath2);

  const file1 = parser(data1, typeData1);
  const file2 = parser(data2, typeData2);
  return formater(getComparison(file1, file2), type);
};
