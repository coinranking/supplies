const Throttle = require('../throttle');
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
    };

    if (typeof options.supports.native !== 'undefined') {
      this.supports.native = options.supports.native;
    }

    if (typeof options.supports.circulating !== 'undefined') {
      this.supports.circulating = options.supports.circulating;
    }

    if (typeof options.supports.balances !== 'undefined') {
      this.supports.balances = options.supports.balances;
    }

    if (typeof options.supports.assets !== 'undefined') {
      this.supports.assets = options.supports.assets;
    }

    if (typeof options.supports.max !== 'undefined') {
      this.supports.max = options.supports.max;
    }

    if (typeof options.supports.decimals !== 'undefined') {
      this.supports.decimals = options.supports.decimals;
    }

    if (options.blockchains) this.blockchains = options.blockchains;
  }

  async request(url) {
    await this.throttle.push();
    return request(url);
  }
}

module.exports = Driver;
