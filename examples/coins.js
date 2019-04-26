const supplies = require('../');

const etherscan = new supplies.Etherscan();

etherscan
  .getCoins()
  .then(console.log)
  .catch(console.error);
