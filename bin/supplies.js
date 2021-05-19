#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const { nock, defaultOptions } = require('../tests/helpers/nock');
const supplies = require('../lib/supplies');

const coinsDir = path.join(__dirname, '..', 'tests', 'coins');

program
  .command('get <driverName>')
  .option('-d, --decimals <type>', 'Some drivers like Etherscan require decimals')
  .option('-r, --reference <type>', 'Reference is a unique id for a specific driver; for example a smart contract address')
  .option('-m, --modifiers [addresses]', 'Wallets addresses to subtract from the total supply; for example wallets hold by the foundation or burn addresses. Split the addresses with a comma.')
  .option('-R, --record', 'Record the requests and parameters, and save them as fixtures')
  .option('-b, --blockchain <type>', 'Issuance blockchain; the blockchain the coin is issued on. This could be their own blockchain for coins like Bitcoin or Monero. Or for example Ethereum for ERC-20 tokens like Basic Attention Token. Providing the blockchain is required if the driver supports multiple blockchains')
  .option('-k, --key <type>', 'APIkey when required')
  .option('--nocache', 'Disable the cache')
  .action(async (driverName, options) => {
    let useCache = true;
    let modifiers = [];
    let nockDone;

    if (options.modifiers) {
      modifiers = options.modifiers.split(',');
    }

    const coin = new supplies.Coin({
      reference: options.reference,
      decimals: options.decimals,
      modifiers,
      blockchain: options.blockchain,
    });

    if (options.record || options.nocache) {
      // Disable the cache when in record mode
      useCache = false;
    }

    const driver = new supplies[driverName]({
      useCache,
    });

    if (options.key) {
      driver.secret = options.key;
    }

    if (
      driver.supports.blockchains.length > 1
      && !driver.supports.blockchains.includes(options.blockchain)
    ) {
      console.log('Driver supports multi-blockchain, define at least one to proceed.');
      process.exit(1);
    }

    // create fixture file
    if (options.record) {
      let fixture = `${driverName}.json`;

      if (driver.supports.blockchains.length >= 1 && !coin.reference && coin.blockchain) {
        fixture = `${driverName}-${coin.blockchain}.json`;
      } else if (driver.supports.blockchains.length >= 1 && !!coin.reference && coin.blockchain) {
        fixture = `${driverName}-${coin.blockchain}-${coin.reference}.json`;
      } else if (coin.reference) {
        fixture = `${driverName}-${coin.reference}.json`;
      }

      ({ nockDone } = await nock.back(
        fixture,
        defaultOptions(options.key),
      ));
    }

    const supply = await driver.getSupply(coin);

    if (options.record) {
      nockDone();
      if (coin) {
        let coins = [];
        if (fs.existsSync(`${coinsDir}/${driverName}.json`)) {
          coins = fs.readFileSync(`${coinsDir}/${driverName}.json`);
          coins = JSON.parse(coins);
        }

        coins.push(coin);
        fs.writeFileSync(`${coinsDir}/${driverName}.json`, JSON.stringify(coins, null, 2), { flag: 'w+' });
      }
    }

    console.log(supply);
  });

program.parse(process.argv);
