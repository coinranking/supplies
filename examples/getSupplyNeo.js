const supplies = require('../');

const { Coin } = supplies;

const modifiers = [
  'Ae2d6qj91YL3LVUMkza7WQsaTYjzjHm4z1',
  'AQVh2pG732YvtNaxEGkQUei3YA4cvo7d2i',
  'ASc3dPwQ9rrKFEUsE5VqFomG8w9aKyi28T',
];

const drivers = supplies.selectDriversByBlockchain('Neo');

const driver = new supplies[drivers[0]]();

const coin = new Coin({
  name: 'Neo',
  symbol: 'NEO',
  reference: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
  modifiers,
});

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
