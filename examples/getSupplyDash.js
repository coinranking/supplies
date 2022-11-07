const supplies = require('..');

const drivers = supplies.selectDriversByBlockchain('Dash');

const driver = new supplies[drivers[0]]();

driver
  .getSupply({ blockchain: 'Dash' })
  .then((supply) => {
    console.log(supply);
  });
