/* eslint-disable import/extensions */

import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const result = await fs.readFile(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
console.log(result);

test('genDiff', () => {
  expect(genDiff(file1, file2)).toBe(result);
});
