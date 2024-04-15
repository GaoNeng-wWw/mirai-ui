export const useDirty = () => {
  const preventOpenRecord: Map<any, boolean> = new Map();
  const preventCloseRecord: Map<any, boolean> = new Map();
  return {
    isPreventOpen: (key: string | number | symbol) => preventOpenRecord.has(key),
    isPreventClose: (key: string | number | symbol) => preventCloseRecord.has(key),
    setPreventOpen: (key: string|number|symbol) => {
      preventOpenRecord.set(key, true);
    },
    setPreventClose: (key: string | number | symbol) => {
      preventCloseRecord.set(key, true);
    },
    cleanOpenPrevent(key: string | number | symbol) {
      if (preventOpenRecord.has(key)) {
        preventOpenRecord.delete(key);
      }
    },
    cleanClosePrevent(key: string | number | symbol) {
      if (preventCloseRecord.has(key)) {
        preventCloseRecord.delete(key);
      }
    }
  };
};