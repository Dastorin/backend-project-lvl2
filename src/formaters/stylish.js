const getString = (value, perfix) => {
  const symbol = {
    'added': '+',
    'deleted': '-',
    'uncharged': ' ',
    'nested': ' ',
    'charged': ['-', '+'],
  }
  если value не объект - сформировать строку

  иначе рекурсивно обойти превратив в строку и назначить все отступы.
}

const getOldValue = (node) => (node.meta.oldValue);

export default (data) => {
  const iter = (obj) => {
    const result = obj.map((node) => {
      switch (node.type) {
        case 'added':
          return `+ ${node.key}: ${getString(node.value, node.type)}/n`;
        case 'deleted':
          return `- ${node.key}: ${getString(node.value, node.type)}/n`;
        case 'uncharged':
          return `  ${node.key}: ${getString(node.value, node.type)}/n`;
        case 'charged':
          return`- ${key}: ${getString(node.value)}/n + ${key}: ${getString(getOldValue(node))}`;
        case 'nested':
          return `  ${key}: ${iter(node.children)}`;

        default: console.error(new Error(`unknown type ${value.type}!`));
      }
    });
    return result;
  }
  return inter(data, 1);
}
