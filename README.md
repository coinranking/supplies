[![code-style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

# Supplies 📦

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
const { drivers } = require('supplies');

console.log(drivers);
```

List all supported blockchains

```Javascript
const { blockchains } = require('supplies');

console.log(blockchains);
```

List all drivers that support a specific blockchain

```Javascript
const { selectDriversByBlockchain } = require('supplies');

console.log(selectDriversByBlockchain('Ethereum'));
```

Get the supply of specific coin

```Javascript
const { Etherscan, Coin } = require('supplies');

const driver = new Etherscan({
  secret: 'freekey',
});

const coin = new Coin({
  // Lets take the Basic Attention Token (BAT) for example.
  // The reference is the unique id for a specific driver;
  // which is a smart contract address in this case.
  name: 'Basic Attention Token',
  symbol: 'BAT',
  reference: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  // Modifiers are blockchain addresses that get subtracted from the
  // total supply to get the circulating supply.
  modifiers: [
    '0x0000000000000000000000000000000000000000', // Burned address
    '0x0000000000000000000000000000000000000001', // Burned address
    '0x185f19b43d818e10a31be68f445ef8edcb8afb83', // Multisig address
    '0x67fa2c06c9c6d4332f330e14a66bdf1873ef3d2b', // Team Lock up address
    '0x7c31560552170ce96c4a7b018e93cddc19dc61b6', // UGP reserve address
  ],
  // Some drivers like Etherscan require decimals
  decimals: 18,
});

driver
  .getSupply(coin)
  .then((supply) => {
    console.log(supply);
  });
```

## CLI

After installation the `supplies` command will be available in your terminal.

### Get

#### Get the supply of a native coin

    $ supplies get <driver name>

#### Get supply of a specific coin or a token
For the coin object see `lib/models/coin`

    $ supplies get <driver name> -c "<coin object>"

#### Flags


| Name     | Flag                | Description
| -------- | ------------------- | ---
| Coin     | `-c`, `--coin <type>` | For passing down a Coin object so the driver knows which reference to use as well as which modifiers
| Record   | `-r`, `--record`      | Record the requests and coin, and save them as fixtures. This is for developing purposes
| Key      | `-k`, `--key <type>`  | For passing down an API key when the driver requires one. When used in combination with the `-r` flag the key will be masked in the fixtures
| No cache | `--nocache`         | Skip using the cache

## Development

### Getting started

Install dependencies

    $ npm run install


## CLI

The CLI is available under `./bin/supplies.js` when developing

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

### Conventions

1. [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
2. [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

## License

  [MIT](LICENSE)
