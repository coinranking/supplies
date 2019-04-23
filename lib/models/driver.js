const jetpack = require('fs-jetpack');
const Coin = require('./coin');
const Throttle = require('../throttle');

class Driver {
  constructor({ name, timeout }) {
    this.name = name;
    this.throttle = new Throttle(timeout);
  }

  getCoins() {
    return jetpack
      .findAsync(`./lib/drivers/${this.name}/coins`, {
        matching: '*.json',
        recursive: false,
        files: true,
        directories: false,
      })
      .then(files => files.map((file) => {
        const parts = file.split('/');
        const reference = parts.pop().replace('.json', '');
        const coin = jetpack.read(file, 'json');

        return new Coin({
          reference,
          ...coin,
        });
      }));
  }
}

module.exports = Driver;
