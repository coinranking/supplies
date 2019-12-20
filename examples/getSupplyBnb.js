const supplies = require('../');

const { Coin } = supplies;

const modifiers = [
  '0x0000000000000000000000000000000000000000', // Burned
  '0x0000000000000000000000000000000000000001', // Burned
  '0x00C5E04176d95A286fccE0E68c683Ca0bfec8454', // Smart Contract Lock-up
  '0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67', // Binance Foundation address
];

const drivers = supplies.selectDriversByBlockchain('Ethereum');

const driver = new supplies[drivers[0]]({
  secret: 'freekey',
});

const coin = new Coin({
  reference: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
  modifiers,
  decimals: 18,
});

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
