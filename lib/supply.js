const filesystem = require('./filesystem');

class Supply {
  constructor(options) {
    if (options) {
      this.throttling = options.throttling;
      this.userAgent = options.userAgent;
    }
  }

  get blockchains() {
    return filesystem.blockchains();
  }

  get coins() {
    return filesystem.coins();
  }

  get drivers() {
    return filesystem.drivers();
  }
}

module.exports = Supply;
