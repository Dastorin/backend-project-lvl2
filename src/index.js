/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import parser from './parses.js';
import getComparison from './comparison.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  return getComparison(file1, file2);
};

export default genDiff;
