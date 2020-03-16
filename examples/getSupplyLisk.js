const supplies = require('..');

const { Coin } = supplies;

const modifiers = [
  '11917631413532719541L',
  '14175575863689886451L',
  '15434119221255134066L',
  '15841793714384967784L',
  '5726759782318848681L',
  '8201357239823655010L',
];

const drivers = supplies.selectDriversByBlockchain('Lisk');

const driver = new supplies[drivers[0]]();

const coin = new Coin({ modifiers });

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
