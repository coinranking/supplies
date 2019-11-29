const supplies = require('../');

const modifiers = [
  '0x0000000000000000000000000000000000000000',
  '0x0000000000000000000000000000000000000001',
  '0x5AbFEc25f74Cd88437631a7731906932776356f9',
  '0xd1220a0cf47c7b9be7a2e6ba89f429762e7b9adb',
  '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
];

const drivers = supplies.selectDriversByBlockchain('Ethereum Classic');

const driver = new supplies[drivers[0]]();

driver
  .getSupply('native', modifiers)
  .then((supply) => {
    console.log(supply);
  });
