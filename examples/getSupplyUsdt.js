const supplies = require('../');

const modifiers = [
  '1NTMakcgVwQpMdGxRQnFKyb3G1FAJysSfz',
  '3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL',
];

const drivers = supplies.selectDriversByBlockchain('Omnilayer');

const driver = new supplies[drivers[0]]();

driver
  .getSupply('31', modifiers)
  .then((supply) => {
    console.log(supply);
  });
