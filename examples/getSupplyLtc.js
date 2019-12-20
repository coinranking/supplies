const supplies = require('../');

const { Coin } = supplies;

const modifiers = [];

const drivers = supplies.selectDriversByBlockchain('Litecoin');

const driver = new supplies[drivers[0]]();

const coin = new Coin({ modifiers });

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
