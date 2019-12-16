[![code-style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

# Supplies

A Javascript library for getting up to date cryptocurrency total supplies, circulating supplies and max supplies.

![](supplies.gif)

## Getting started

1. Node.js 12.13 or higher is required

## Installation

Coinranking Supplies is a [Node.js](https://nodejs.org/) module.

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 12.13 or higher is required.

## Usage

List all supported drivers

```Javascript
const exchanges = require('exchanges');

console.log(exchanges.drivers);
```

List all supported blockchains

```Javascript
const exchanges = require('exchanges');

console.log(exchanges.blockchains);
```

List all drivers that support a specific blockchain

```Javascript
const exchanges = require('exchanges');

console.log(exchanges.selectDriversByBlockchain('Ethereum'));
```

Get the supply of specific coin

```Javascript
const supplies = require('supplies');

const driver = new supplies.Etherscan({
  secret: 'freekey',
});
// Lets take the Binance Coin (BNB) for example.
// The reference is the unique id for a specific driver;
// which is a smart contract address in this case.
const reference = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52';

// Modifiers are blockchain addresses that don't count for the circulating supply.
const modifiers = [
  '0x0000000000000000000000000000000000000000', // Burned
  '0x0000000000000000000000000000000000000001', // Burned
  '0x00C5E04176d95A286fccE0E68c683Ca0bfec8454', // Smart Contract Lock-up
  '0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67', // Binance Foundation address
];

driver
  .getSupply(reference, modifiers)
  .then((supply) => {
    console.log(supply);
  });
```

## Development

### Getting started

Install dependencies

    $ npm run install

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

### Conventions

1. [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
2. [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

## License

  [MIT](LICENSE)
