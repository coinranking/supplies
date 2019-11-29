const drivers = require('./drivers');
const { distinct } = require('./util');

const names = Object.keys(drivers);

const blockchains = () => distinct(names.flatMap((name) => {
  let secret;
  if (name === 'Etherscan') secret = 'freekey';

  const driver = new drivers[name]({
    secret,
  });

  return driver.blockchains;
}));

// selectDrivers
// selectBlockchains
// selectDriversByBlockchain
// selectBlockchainsByDriver
// getSupply(driver, coin: optional if native)

module.exports = {
  ...drivers,
  blockchains,
};
