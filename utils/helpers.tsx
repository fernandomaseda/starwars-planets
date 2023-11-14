// Checks if value is an empty object or collection. Does not support evaluating a Set or a Map (in that case, use lodash instead)
export const isEmpty = (obj): Boolean =>
  [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

export const itemHasValueInKey = (item, value, key = 'id') => {
  return item ? item[key] === value : false;
};

export const capitalize = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export const sortByMaxAndAlphabetical = <T extends Array<any>>(data: T, key: string): T => {
  return data.sort(function (a, b) {
    if (b[key] === 'unknown') return -1;
    if (a[key] === 'unknown') return 1;
    if (
      typeof a[key] === 'string' &&
      typeof b[key] === 'string' &&
      'abcdefghijklmnñopqrstuvwxyz'.split('').includes(a[key][0].toLowerCase())
    ) {
      return a[key].localeCompare(b[key]);
    }
    return Number(b[key]) > Number(a[key]) ? 1 : -1;
  });
};
