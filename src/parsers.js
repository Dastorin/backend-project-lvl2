import yaml from 'js-yaml';

export default (data, format) => {
  switch (format.slice(1)) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      return console.error(new Error(`unknown format ${data}!`));
  }
};
