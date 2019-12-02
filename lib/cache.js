const NodeCache = require('node-cache');

const cache = new NodeCache({
  useClones: false,
  stdTTL: 60,
  checkperiod: 120,
});

module.exports = cache;
