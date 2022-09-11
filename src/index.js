import parser from './parses.js';
import getComparison from './comparison.js';
import formater from './formaters/index.js';

export default (filepath1, filepath2, type) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  console.log(JSON.stringify(getComparison(file1, file2), null, 4));
  return formater(getComparison(file1, file2), type);
};
