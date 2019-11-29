const Throttle = require('../throttle');
const request = require('../request');

class Driver {
  constructor(options) {
    this.throttle = new Throttle(options.timeout || 0);
    if (options.blockchains) this.blockchains = options.blockchains;
  }

  async request(url) {
    await this.throttle.push();
    return request(url);
  }
}

module.exports = Driver;
