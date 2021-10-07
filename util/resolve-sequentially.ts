export const resolveSequentially = function (items: any[], func, setCounter?) {
  return items.reduce((previousPromise, item, i) => {
    return previousPromise.then(() => {
      if (setCounter) {
        setCounter(i + 1)
      }
      return func(item);
    });
  }, Promise.resolve());
};
