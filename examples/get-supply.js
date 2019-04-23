const supplies = require('../');

const etherscan = new supplies.Etherscan();

etherscan
  .getCoins()
  .then((coins) => {
    const [coin] = coins;

    console.log(coin);

    etherscan
      .getSupply(coin)
      .then(console.log)
      .catch(console.error);
  });
