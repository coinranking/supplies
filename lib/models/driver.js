const Throttle = require('../throttle');
const cache = require('../cache');
const request = require('../request');

class Driver {
  constructor(config) {
    this.supports = {
      native: true,
      circulating: false,
      balances: false,
      assets: false,
      max: false,
      decimals: false,
      secret: false,
      ...config.supports,
    };

    const options = config.options || {};
    this.options = {
      useThrottle: true,
      useCache: true,
      ...options,
    };

    this.blockchain = config.blockchain;

    if (this.useThrottle !== false) {
      this.throttle = new Throttle(config.timeout || 0);
    }
  }

  async request(options) {
    let key;
    if (typeof options === 'string') {
      key = options;
    } else {
      key = JSON.stringify(options);
    }

    if (this.options.useCache) {
      if (cache.has(key)) return cache.get(key);
    }

    if (this.options.useThrottle) {
      await this.throttle.push();
    }

    const body = await request(options);

    if (this.options.useCache) {
      cache.set(key, body, 60);
    }

    return body;
  }
}

module.exports = Driver;
