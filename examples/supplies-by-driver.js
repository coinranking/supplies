const supplies = require('../');

const driver = new supplies[process.env.DRIVER]({
  secret: process.env.SECRET,
});

driver
  .getCoins()
  .then((coins) => {
    coins.forEach((coin) => {
      driver
        .getSupply(coin)
        .then((supply) => {
          console.log(coin, supply);
        })
        .catch(console.error);
    });
  });
