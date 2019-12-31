const Coin = require('./models/coin');
const drivers = require('./drivers');

/**
 * Entry point
 *
 */
const names = Object.keys(drivers);

const blockchains = names.flatMap((name) => {
  const driver = new drivers[name]();

  return driver.blockchain;
});

const selectDriversByBlockchain = (blockchain) => names.filter((name) => {
  const driver = new drivers[name]();

  return driver.blockchain === blockchain;
});

module.exports = {
  Coin,
  ...drivers,
  drivers: names,
  blockchains,
  selectDriversByBlockchain,
};
