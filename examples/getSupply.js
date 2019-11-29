const supplies = require('../');

const modifiers = [];

const blockchainInfo = new supplies.BlockchainInfo();

blockchainInfo
  .getSupply(modifiers)
  .then((supply) => {
    console.log(supply);
  });
