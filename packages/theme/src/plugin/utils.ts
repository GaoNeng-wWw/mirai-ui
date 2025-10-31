import { flatten } from 'flat';
import { ColorObject } from '../types';

export function removeDefaultKeys<T extends object>(obj: T) {
  const newObj = {};

  for (const key in obj) {
    if (key.endsWith('-DEFAULT')) {
      // @ts-ignore
      newObj[key.replace('-DEFAULT', '')] = obj[key];
      continue;
    }
    // @ts-ignore
    newObj[key] = obj[key];
  }

  return newObj;
}

export const flatColor = <T extends object, R>(
  obj: T,
) => {
  return flatten<T, R>(obj, {
    safe: true,
    delimiter: '-',
  })
};
