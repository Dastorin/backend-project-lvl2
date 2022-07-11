/* eslint-disable no-param-reassign */
import _ from 'lodash';

const isKey = (obj, key) => _.keys(obj).includes(key);
const isTwoObjects = (value1, value2) => _.isObject(value1) && _.isObject(value2);

const getComparison = (obj1, obj2) => {
  const result = _.uniq([..._.keys(obj1), ..._.keys(obj2)])
    .sort()
    .reduce((acc, key) => {
      if (!isKey(obj2, key)) {
        acc = _.isObject(obj1[key])
          ? [...acc, { key, type: 'key1 value1-obj', value: getComparison(obj1[key], obj1[key]) }]
          : [...acc, { key, type: 'key1', value: obj1[key] }];
      } else if (!isKey(obj1, key)) {
        acc = _.isObject(obj2[key])
          ? [...acc, { key, type: 'key2 value2-obj', value: getComparison(obj2[key], obj2[key]) }]
          : [...acc, { key, type: 'key2', value: obj2[key] }];
      } else if (isTwoObjects(obj1[key], obj2[key])) {
        acc = [...acc, { key, type: 'value1 & value2-obj', value: getComparison(obj1[key], obj2[key]) }];
      } else if (_.isObject(obj1[key])) {
        acc = [...acc, { key, type: 'value1!==value2 value1-obj', value: [getComparison(obj1[key], obj1[key]), obj2[key]] }];
      } else if (_.isObject(obj2[key])) {
        acc = [...acc, { key, type: 'value1!==value2, valu2-obj', value: [obj1[key], getComparison(obj2[key], obj2[key])] }];
      } else {
        acc = obj1[key] === obj2[key]
          ? [...acc, { key, type: 'value1 === value2', value: obj1[key] }]
          : [...acc, { key, type: 'value1 !== value2', value: [obj1[key], obj2[key]] }];
      }
      return acc;
    }, []);
  return result;
};

export default getComparison;
