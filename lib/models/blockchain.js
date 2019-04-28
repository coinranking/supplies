const jetpack = require('fs-jetpack');
const Coin = require('./coin');

class Blockchain {
  constructor(name) {
    this.name = name;
  }

  getCoins() {
    return jetpack
      .findAsync(`./lib/blockchains/${this.name}`, {
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

module.exports = Blockchain;
