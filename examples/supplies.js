const supplies = require('../');

supplies.drivers.forEach((driverName) => {
  const driver = new supplies[driverName]();

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
});
