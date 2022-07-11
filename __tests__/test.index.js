/* eslint-disable no-undef */
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('JSON', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(readFile('result.txt'));
});
test('YML', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(readFile('result.txt'));
});
test('YAML', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toBe(readFile('result.txt'));
});
