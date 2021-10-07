export const keyValidator = () => ({
  validator(_, value) {
    if (value?.length !== 44) {
      return Promise.reject(new Error(`Invalid key length! Is ${value?.length}, should be 44.`));
    }
    Promise.resolve(value);
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
})