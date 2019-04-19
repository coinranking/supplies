[![code-style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat-square)](https://github.com/airbnb/javascript)

# Supplies

A Javascript library for getting up to date cryptocurrency total supplies, circulating supplies and max supplies.

![](supplies.gif)

## Getting started

1. Node.js 8.10 or higher is required
2. Redis is required
3. Install *Supplies* using [NPM](https://www.npmjs.com/package/supplies)

## Installation

Coinranking Supplies is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/package/supplies).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 8.10 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install supplies
```

## Usage

### Get all coins

```Javascript
const supplies = require('supplies');

supplies
  .getAllCoins('ethereum')
  .then((coins) => {
    // Your code here
  });
```

### Get supply of specific coin

```Javascript
const supplies = require('supplies');

supplies
  .getSupply(
    // specific blockchain
    'ethereum',
    // reference on this specific blockchain;
    // a smart contract address in this case
    '0x818fc6c2ec5986bc6e2cbf00939d90556ab12ce5',
  )
  .then((supply) => {
    // Your code here
    // supply.total
    // supply.circulating
    // supply.max
  });
```

## Examples

## License

  [MIT](LICENSE)
