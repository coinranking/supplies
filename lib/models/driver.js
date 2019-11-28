const filesystem = require('../filesystem');
const Throttle = require('../throttle');
const Blockchain = require('./blockchain');
const { flatMap } = require('../utils');

class Driver {
  constructor(options) {
    if (options.blockchains) {
      this._blockchains = options.blockchains.map(blockchain => new Blockchain(blockchain));
    }
    if (options.timeout) this.throttle = new Throttle(options.timeout);
  }

  get blockchains() {
    if (this._blockchains) return this._blockchains;
    return filesystem.blockchains();
  }

  get coins() {
    return flatMap(this.blockchains, blockchain => filesystem.coins(blockchain));
  }
}

module.exports = Driver;
