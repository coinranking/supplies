#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const { nock, defaultOptions } = require('../tests/helpers/nock.js');
const supplies = require('../lib/supplies');

const coinsDir = path.join(__dirname, '..', 'tests', 'coins');

program
  .command('get <driverName>')
  .option('-d, --decimals <type>', 'Some drivers like Etherscan require decimals')
  .option('-r, --reference <type>', 'Reference is a unique id for a specific driver; for example a smart contract address')
  .option('-m, --modifiers [addresses]', 'Wallets addresses to subtract from the total supply; for example wallets hold by the foundation or burn addresses. Split the addresses with a comma.')
  .option('-R, --record', 'Record the requests and parameters, and save them as fixtures')
  .option('-k, --key <type>', 'APIkey when required')
  .option('--nocache', 'Disable the cache')
  .action(async (driverName, options) => {
    let useCache = true;

    let modifiers = [];
    if (options.modifiers) {
      modifiers = options.modifiers.split(',');
    }

    const coin = new supplies.Coin({
      reference: options.reference,
      decimals: options.decimals,
      modifiers,
    });

    let nockDone;
    if (options.record) {
      let fixture = `${driverName}.json`;
      if (coin && typeof coin.reference !== 'undefined') {
        fixture = `${driverName}-${coin.reference}.json`;
      }
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
