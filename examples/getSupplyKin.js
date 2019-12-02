const supplies = require('../');

const modifiers = [
  '0x0000000000000000000000000000000000000000',
  '0x0000000000000000000000000000000000000001',
  '0x3bf4bbe253153678e9e8e540395c22bff7fca87d',
  '0x56ae76573ec54754bc5b6a8cbf04bbd7dc86b0a0',
  '0x3bf4bbe253153678e9e8e540395c22bff7fca87d',
];

const drivers = supplies.selectDriversByBlockchain('Ethereum');

const driver = new supplies[drivers[0]]({
  secret: 'freekey',
});

driver
  .getSupply('0x818fc6c2ec5986bc6e2cbf00939d90556ab12ce5', modifiers)
  .then((supply) => {
    console.log(supply);
  });
