const jetpack = require('fs-jetpack');
const Coin = require('./models/coin');
const Blockchain = require('./models/blockchain');

const blockchains = () => {
  const dirs = jetpack.find(`${__dirname}/blockchains`, {
    matching: '*',
    recursive: false,
    files: false,
    directories: true,
  });

  return dirs.map((dir) => {
    const parts = dir.split('/');
    const blockchain = parts.pop();
    return new Blockchain(blockchain);
  });
};

const coins = (blockchain) => {
  let path = `${__dirname}/blockchains`;
  if (blockchain) path = `${__dirname}/blockchains/${blockchain}`;

  const files = jetpack.find(path, {
    matching: '*.json',
    recursive: true,
    files: true,
    directories: false,
  });

  return files.map((file) => {
    const parts = file.split('/');
    const reference = parts.pop().replace('.json', '');
    const coin = jetpack.read(file, 'json');

    return new Coin({
      reference,
      blockchain: parts.pop(),
      ...coin,
    });
  });
};

const drivers = () => {
  const files = jetpack.find(`${__dirname}/drivers`, {
    matching: '*.js',
    recursive: true,
    files: true,
    directories: false,
  });

  return files.map((file) => {
    const parts = file.split('/');
    const driver = parts.pop();
    // eslint-disable-next-line
    return require(`${__dirname}/drivers/${driver}`);
  });
};

module.exports = {
  blockchains,
  coins,
  drivers,
};
