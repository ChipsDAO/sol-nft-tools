export const resolveSequentially = function (items, func) {
  return items.reduce((previousPromise, item) => {
    return previousPromise.then(() => func(item));
  }, Promise.resolve());
};
