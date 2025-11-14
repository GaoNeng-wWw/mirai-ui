import { flatten } from 'flat';

export const omit = <T extends object, A extends Array<keyof T>>(
  obj: T,
  keys: A,
): Omit<T, A[number]> => {
  const ret = structuredClone(obj);
  for (const key of keys) {
    delete ret[key];
  }
  return ret;
};


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

export const mapKeys = (
  obj: Record<string, any>,
  iteratee: (value: any, key: string) => any,
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [iteratee(value, key), value]),
  );
};

export const kebabCase = (s: string) => {
  return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const isNumberString = (val: string): boolean => {
  const maybeFloat = Number.parseFloat(val);
  return !Number.isNaN(maybeFloat);
};