const Supplies = require('../');

const supplies = new Supplies({
  throttling: false,
});

const { Etherscan } = supplies.drivers;

console.log(Etherscan);
