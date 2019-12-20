const promisesMap = (haystack, callback) => Promise.all(haystack.map(callback));

module.exports = {
  promisesMap,
};
