const Throttle = require('../throttle');
const cache = require('../cache');
const request = require('../request');

class Driver {
  constructor(options) {
    this.throttle = new Throttle(options.timeout || 0);

    this.supports = {
      native: true,
      circulating: false,
      balances: false,
      assets: false,
      max: false,
      decimals: false,
      ...options.supports,
    };

    if (options.blockchains) this.blockchains = options.blockchains;
  }

  async request(url) {
    if (cache.has(url)) return cache.get(url);

    await this.throttle.push();

    const body = await request(url);

    cache.set(url, body, 60);

    return body;
  }
}

module.exports = Driver;
