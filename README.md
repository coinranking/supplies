[![code-style](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat-square)](https://github.com/airbnb/javascript)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![npm (scoped)](https://img.shields.io/npm/v/@coinranking/supplies)](https://www.npmjs.com/package/@coinranking/supplies)
[![codecov](https://img.shields.io/codecov/c/github/coinranking/supplies/master.svg?style=shield)](https://codecov.io/gh/coinranking/supplies)

# Supplies 📦

An open source JavaScript library for getting the cryptocurrency total, circulating and max supply from block explorers.

![](supplies.gif)

## Getting started

1. Node.js 12.13 or higher is required
2. Install using [NPM](https://www.npmjs.com/package/@coinranking/supplies)

## Installation

Coinranking Supplies is a [Node.js](https://nodejs.org/) module available through the [npm registry](https://www.npmjs.com/package/@coinranking/supplies).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 12.13 or higher is required.

Installation is done using the npm install command:

```shell
npm i @coinranking/supplies
```

## Usage

List all supported drivers

```Javascript
const { drivers } = require('@coinranking/supplies');

console.log(drivers);
```

List all supported blockchains

```Javascript
const { blockchains } = require('@coinranking/supplies');

console.log(blockchains);
```

List all drivers that support a specific blockchain

```Javascript
const { selectDriversByBlockchain } = require('@coinranking/supplies');

console.log(selectDriversByBlockchain('Ethereum'));
```

Get the supply of specific coin

```Javascript
const { Etherscan, Coin } = require('@coinranking/supplies');

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

After installation the `supplies` command will be available in your terminal. The CLI is available under `node ./bin/supplies.js` when developing.

### Get

#### Get the supply of a native coin

```shell
supplies get <driver name>
```

#### Get supply of a specific coin or a token

```shell
supplies get <driver name> -r <smart contract address>
```

#### Flags


| Name      | Flag                    | Description
| ----------| ------------------------| ---
| Decimals  | `-d`, `--decimals`      | Some drivers like Etherscan require decimals.
| Reference | `-r`, `--reference`     | Reference is a unique id for a specific driver; for example a smart contract address.
| Modifiers | `-m`, `--modifiers`     | Wallets addresses to subtract from the total supply; for example wallets hold by the foundation or burn addresses. Split the addresses with a comma and without spaces.
| Record    | `-R`, `--record`        | Record the requests and coin, and save them as fixtures. This is for developing purposes.
| API Key   | `-k`, `--key`           | For passing down an API key when the driver requires one. When used in combination with the `-r` flag the key will be masked in the fixtures.
| No cache  | `--nocache`             | Skip using the cache.

## Development

### Getting started

Install dependencies

```shell
npm run install
```

## CLI

The CLI is available under `node ./bin/supplies.js` when developing

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

### Conventions

1. [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
2. [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

## Reach out to us

- [Telegram](https://t.me/CoinrankingOfficial)
- [Forum](https://community.coinranking.com/c/developers/20)
- [Twitter](https://twitter.com/coinranking)
- [info@coinranking.com](mailto:info@coinranking.com)

## License

[MIT](LICENSE)
