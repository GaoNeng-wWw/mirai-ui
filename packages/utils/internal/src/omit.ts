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
