[![code-style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat-square)](https://github.com/airbnb/javascript)

# Supplies

A Javascript library for getting up to date cryptocurrency total supplies, circulating supplies and max supplies.

![](supplies.gif)

## Getting started

1. Node.js 8.10 or higher is required
2. Install *Supplies* using [NPM](https://www.npmjs.com/package/supplies)

## Installation

Coinranking Supplies is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/package/supplies).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 8.10 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```
$ npm install supplies
```

## Usage

### List all supported drivers

```Javascript
const supplies = require('supplies');

console.log(supplies.drivers);
```

### List coins of a specific driver

```Javascript
const supplies = require('supplies');

const etherscan = new supplies.Etherscan();

etherscan
  .getCoins()
  .then((coin) => {
    console.log(coin);
  })
  .catch(console.error);
```

### Get supply of specific coin

```Javascript
const supplies = require('supplies');

const etherscan = new supplies.Etherscan();
// reference for this specific driver;
// a smart contract address in this case
const reference = '0x818fc6c2ec5986bc6e2cbf00939d90556ab12ce5';

etherscan
  .getSupply(reference)
  .then((supply) => {
    console.log(supply);
  })
  .catch(console.error);
```

## License

  [MIT](LICENSE)
