#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const { nock, defaultOptions } = require('../tests/helpers/nock.js');
const drivers = require('../lib/drivers');

const coinsDir = path.join(__dirname, '..', 'tests', 'coins');

program
  .command('get <driverName>')
  .option('-c, --coin <type>', 'input a coin')
  .option('-r, --record', 'Record the requests and coin, and save them as fixtures')
  .option('-k, --key <type>', 'APIkey when required')
  .option('--nocache', 'Disable the cache')
  .action(async (driverName, options) => {
    let useCache = true;

    let coin;
    if (typeof options.coin !== 'undefined') {
      coin = JSON.parse(options.coin);
    }

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

    const driver = new drivers[driverName]({
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
