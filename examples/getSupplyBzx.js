const supplies = require('../');

const modifiers = [];

const drivers = supplies.selectDriversByBlockchain('Bitcoin Zero');

const driver = new supplies[drivers[0]]();

driver
  .getSupply('bzx', modifiers)
  .then((supply) => {
    console.log(supply);
  });
