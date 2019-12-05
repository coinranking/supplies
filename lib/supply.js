const Coin = require('./models/coin');
const drivers = require('./drivers');
const { distinct } = require('./util');

const names = Object.keys(drivers);

const blockchains = distinct(names.flatMap((name) => {
  const driver = new drivers[name]();

  return driver.blockchains;
}));

const selectDriversByBlockchain = (blockchain) => names.filter((name) => {
  const driver = new drivers[name]();

  return driver.blockchains.indexOf(blockchain) !== -1;
});

// selectDrivers
// selectBlockchains
// selectDriversByBlockchain
// getSupply(driver, coin: optional if native)
// driver.getSupply()


module.exports = {
  Coin,
  ...drivers,
  drivers: names,
  blockchains,
  selectDriversByBlockchain,
};
