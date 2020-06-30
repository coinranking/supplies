#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const { nock, defaultOptions } = require('../tests/helpers/nock.js');
const supplies = require('../lib/supplies');

const coinsDir = path.join(__dirname, '..', 'tests', 'coins');

/**
 * @param value
 * @param previous
 */
function collect(value, previous) {
  return previous.concat([value]);
}

program
  .command('get <driverName>')
  .option('-d, --decimals <type>', 'Some drivers like Etherscan require decimals')
  .option('-c, --coin <value>', 'input a coin', collect, [])
  .option('-r, --reference <type>', 'Reference is a unique id for a specific driver; for example a smart contract address')
  .option('-m, --modifiers [addresses]', 'Wallets addresses to subtract from the total supply; for example wallets hold by the foundation or burn addresses. Split the addresses with a comma.')
  .option('-R, --record', 'Record the requests and parameters, and save them as fixtures')
  .option('-B, --blockchain <type>', 'Define blockchain if driver supports multi-blockchain')
  .option('-k, --key <type>', 'APIkey when required')
  .option('--nocache', 'Disable the cache')
  .action(async (driverName, options) => {
    let useCache = true;

    let modifiers = [];
    if (options.modifiers) {
      modifiers = options.modifiers.split(',');
    }

    const coins = [];

    if (options.coin.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const c of options.coin) {
        const coin = new supplies.Coin(JSON.parse(c));
        coins.push(coin);
      }
    } else {
      const coin = new supplies.Coin({
        reference: options.reference,
        decimals: options.decimals,
        modifiers,
        blockchain: options.blockchain,
      });
      coins.push(coin);
    }

    let nockDone;
    if (options.record) {
      const fixture = `${driverName}.json`;

      ({ nockDone } = await nock.back(
        fixture,
        defaultOptions(options.key),
      ));

      // Disable the cache when in record mode
      useCache = false;
    }

    if (options.nocache) {
      useCache = false;
    }

    const driver = new supplies[driverName]({
      useCache,
    });

    if (options.key) {
      driver.secret = options.key;
    }

    await coins.map(async (coin) => {
      // eslint-disable-next-line max-len
      if (driver.supports.blockchains.length > 1 && !driver.supports.blockchains.includes(coin.blockchain)) {
        console.log('Driver supports multi-blockchain, define at least one to proceed.');
        process.exit(1);
      }

      const supply = await driver.getSupply(coin);
      console.log(supply);
    });

    if (options.record) {
      nockDone();
      if (coins) {
        let fixtureCoins = [];
        if (fs.existsSync(`${coinsDir}/${driverName}.json`)) {
          fixtureCoins = fs.readFileSync(`${coinsDir}/${driverName}.json`);
          fixtureCoins = JSON.parse(fixtureCoins);
        }

        fixtureCoins.push(...coins);
        fs.writeFileSync(`${coinsDir}/${driverName}.json`, JSON.stringify(fixtureCoins, null, 2), { flag: 'w+' });
      }
    }
  });

program.parse(process.argv);
