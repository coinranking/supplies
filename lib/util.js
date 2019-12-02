const promisesMap = (haystack, callback) => Promise.all(haystack.map(callback));

const distinct = (array) => [...new Set(array)];

module.exports = {
  promisesMap,
  distinct,
};
