const Blockchain = require('./blockchain');
const Throttle = require('../throttle');
const { flatMap } = require('../utils');

class Driver {
  constructor({ name, blockchains, timeout }) {
    this.name = name;
    this.blockchains = blockchains.map(blockchain => new Blockchain(blockchain));
    if (timeout) this.throttle = new Throttle(timeout);
  }

  getCoins() {
    return flatMap(this.blockchains, blockchain => blockchain.getCoins());
  }
}

module.exports = Driver;
