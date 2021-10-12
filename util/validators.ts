export const keyValidator = (setJsonVal) => ({
  validator(_, value) {
    if (value?.length !== 44) {
      return Promise.reject(new Error(`Invalid key length! Is ${value?.length}, should be 44.`));
    }
    setJsonVal(value);
    return Promise.resolve(value);
  },
});

export const jsonValidator = (setJsonVal) => () => ({
  validator(_, value) {
    try {
      const val = JSON.parse(value);
      if (!val.length) {
        return Promise.reject(
          new Error("Must have at least one item!")
        );
      }
      setJsonVal(val);
      Promise.resolve(val);
    } catch {
      return Promise.reject(new Error("Invalid JSON!"));
    }
  },
});

export const SOL_ADDRESS_REGEXP = /[1-9A-HJ-NP-Za-km-z]{32,44}/;

export const solAddressValidator = () => ({
  validator(_, value) {
    const isValid = !!(value as string || '').match(SOL_ADDRESS_REGEXP)?.length;
    return isValid ? Promise.resolve() : Promise.reject(new Error('Invalid Address'));
  }
})