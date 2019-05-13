const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

const queue = new Map();

module.exports = async (key, promise, ttl = 60) => {
  const cachedItem = cache.get(key);
  if (cachedItem) return cachedItem;

  if (queue.has(key)) {
    const result = await queue.get(key);
    return result;
  }

  queue.set(key, promise);

  const result = await promise();

  queue.delete(key);
  cache.set(key, result, ttl);

  return result;
};
