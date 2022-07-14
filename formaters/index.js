import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      return console.log('erorr unknown formatrea type');
  }
};