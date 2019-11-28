const promisesMap = (haystack, callback) => Promise.all(haystack.map(callback));

const concat = (oldList, newList) => oldList.concat(newList);

const flatMap = async (list, callback) => {
  const nextList = await promisesMap(list, callback);
  return nextList.reduce(concat, []);
};

module.exports = {
  promisesMap,
  concat,
  flatMap,
};
