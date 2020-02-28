const Coin = require('./models/coin');
const drivers = require('./drivers');

const names = Object.keys(drivers);

const blockchains = names
  .flatMap((name) => {
    const driver = new drivers[name]();
    return driver.blockchain;
  })
  // Distinct
  .filter((value, index, self) => self.indexOf(value) === index)
  .sort();

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
