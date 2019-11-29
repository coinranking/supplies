const Throttle = require('../throttle');
const request = require('../request');

class Driver {
  constructor(options) {
    if (options.timeout) this.throttle = new Throttle(options.timeout || 10);
    if (options.blockchains) this.blockchains = options.blockchains;
  }

  async request(url) {
    await this.throttle.push();
    return request(url);
  }
}

module.exports = Driver;
