/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import parser from './parses.js';
import getComparison from './comparison.js';
import stylish from './stylish.js';
import plain from './plain.js';

const genDiff = (filepath1, filepath2, type) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  switch (type) {
    case 'stylish':
      return stylish(getComparison(file1, file2));
    case 'plain':
      return plain(getComparison(file1, file2));
    default:
      return console.log('unknown formatrea type');
  }
};

export default genDiff;
