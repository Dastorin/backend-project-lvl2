import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (data, formatName = 'stylish') => {
  switch (formatName) {
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    case 'stylish':
      return stylish(data);
    default:
      return console.error(new Error(`Unknown format ${formatName}`));
  }
};
