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
// Lets take the Basic Attention Token (BAT) for example.
// The reference is the unique id for a specific driver;
// which is a smart contract address in this case.
const reference = '0x0d8775f648430679a709e98d2b0cb6250d2887ef';

// Modifiers are blockchain addresses that don't count for the circulating supply.
const modifiers = [
  '0x0000000000000000000000000000000000000000', // Burned
  '0x0000000000000000000000000000000000000001', // Burned
  '0x185f19b43d818e10a31be68f445ef8edcb8afb83', // Multisig
  '0x67fa2c06c9c6d4332f330e14a66bdf1873ef3d2b', // Team Lock up
  '0x7c31560552170ce96c4a7b018e93cddc19dc61b6' // UGP reserve
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
