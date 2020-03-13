const supplies = require('..');

const { Coin } = supplies;

const drivers = supplies.selectDriversByBlockchain('Ethereum');

const driver = new supplies[drivers[0]]({
  secret: 'freekey',
});

const coin = new Coin({
  name: 'Basic Attention Token',
  symbol: 'BAT',
  reference: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  modifiers: [
    '0x0000000000000000000000000000000000000000', // Burned
    '0x0000000000000000000000000000000000000001', // Burned
    '0x185f19b43d818e10a31be68f445ef8edcb8afb83', // Multisig
    '0x67fa2c06c9c6d4332f330e14a66bdf1873ef3d2b', // Team Lock up
    '0x7c31560552170ce96c4a7b018e93cddc19dc61b6', // UGP reserve
  ],
  decimals: 18,
});

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
