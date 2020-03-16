const supplies = require('..');

const drivers = supplies.selectDriversByBlockchain('Dogecoin');

const driver = new supplies[drivers[0]]();

driver
  .getSupply()
  .then((supply) => {
    console.log(supply);
  });
