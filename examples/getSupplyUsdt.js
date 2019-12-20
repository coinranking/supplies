const supplies = require('../');

const { Coin } = supplies;

const modifiers = [
  '1NTMakcgVwQpMdGxRQnFKyb3G1FAJysSfz',
  '3MbYQMMmSkC3AgWkj9FMo5LsPTW1zBTwXL',
];

const drivers = supplies.selectDriversByBlockchain('Omnilayer');

const driver = new supplies[drivers[0]]();

const coin = new Coin({
  name: 'Tether',
  symbol: 'USDT',
  reference: '31',
  modifiers,
});

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
