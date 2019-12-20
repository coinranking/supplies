#!/usr/bin/env node
const program = require('commander');
const { nock, defaultOptions } = require('../tests/helpers/nock.js');
const drivers = require('../lib/drivers');

program
  .command('getSupply <driverName>')
  .option('-c, --coin <type>', 'input a coin')
  .option('-r, --record', 'Record the requests and coin, and save them as fixtures')
  .option('-k, --key <type>', 'APIkey when required')
  .option('--nocache', 'Disable the cache')
  .action(async (driverName, options) => {
    let useCache = true;

    let nockDone;
    if (options.record) {
      ({ nockDone } = await nock.back(
        `${driverName}.json`,
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

    await driver
      .getSupply(options.coin)
      .then(console.log);

    if (options.record) {
      nockDone();
      // TODO: save the coin in ./coins
    }
  });

program.parse(process.argv);
