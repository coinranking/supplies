const Supplies = require('../');

const supplies = new Supplies({
  throttling: false,
});

console.log(supplies.blockchains);
