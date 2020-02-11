const path = require('path');
const fs = require('fs');
const { nock } = require('./helpers/nock');
const supplies = require('../lib/supplies');

// Increase the timeout of the test.
// Same timeout as a Lambda job.
jest.setTimeout(60 * 1000);

// Disable all network requests.
// All requests should be mocked at this point.
nock.disableNetConnect();

nock.back.fixtures = path.join(__dirname, '.', 'fixtures');
nock.back.setMode('lockdown');

const coinsDir = path.join(__dirname, '.', 'coins');

const { drivers, Coin } = supplies;

drivers.forEach((driverName) => {
  describe(driverName, () => {
    const driver = new supplies[driverName]({
      useThrottle: false,
      useCache: false,
    });

    if (driver.supports.websockets) {
      // Don't test the drivers with Websockets yet.
      // This should definitely be made to work,
      // but is not yet ready!
      return;
    }

    // Set a secret to avoid an error from being thrown while testing
    if (driver.supports.secret) {
      driver.secret = 'maskedSecret';
    }

    // Load the coins from the ./coins dir and do new Coin()
    let coins = [];
    if (fs.existsSync(`${coinsDir}/${driverName}.json`)) {
      coins = fs.readFileSync(`${coinsDir}/${driverName}.json`);
      coins = JSON.parse(coins);
      coins = coins.map((coin) => new Coin(coin));
    }

    if (driver.supports.native) {
      const [nativeCoin] = coins
        .filter((coin) => (typeof coin.reference === 'undefined'));

      test('getSupply happy path', async () => {
        await nock.back(`${driverName}.json`);
        const supply = await driver.getSupply(nativeCoin);
        expect(supply.circulating).toBeGreaterThan(0);
      });

      test('Total supply should be greater than zero', async () => {
        await nock.back(`${driverName}.json`);
        const totalSupply = await driver.fetchTotalSupply();
        expect(totalSupply).toBeGreaterThan(0);
      });

      if (driver.supports.circulating) {
        test('Circulating supply should be greater than zero', async () => {
          await nock.back(`${driverName}.json`);
          const circulatingSupply = await driver.fetchCirculatingSupply();
          expect(circulatingSupply).toBeGreaterThan(0);
        });

        test('Circulating supply should be less than or equal to total supply', async () => {
          await nock.back(`${driverName}.json`);
          const totalSupply = await driver.fetchTotalSupply();
          const circulatingSupply = await driver.fetchCirculatingSupply();
          expect(circulatingSupply).toBeLessThanOrEqual(totalSupply);
        });
      }

      if (driver.supports.max) {
        test('Max supply should be greater than zero', async () => {
          await nock.back(`${driverName}.json`);
          const maxSupply = await driver.fetchMaxSupply();
          expect(maxSupply).toBeGreaterThan(0);
        });

        test('Max supply should be greater than or equal to total supply', async () => {
          await nock.back(`${driverName}.json`);
          const totalSupply = await driver.fetchTotalSupply();
          const maxSupply = await driver.fetchMaxSupply();
          expect(maxSupply).toBeGreaterThanOrEqual(totalSupply);
        });
      }

      if (driver.supports.balances) {
        if (typeof nativeCoin === 'undefined') {
          throw new Error('The driver supports balances but there is no json file in the coins directory');
        }

        if (Array.isArray(nativeCoin.modifiers) === false || nativeCoin.modifiers.length === 0) {
          throw new Error('Native coin should have modifiers');
        }

        nativeCoin.modifiers.forEach((modifier) => {
          test('Modifier balance should be greater than or equal to zero', async () => {
            await nock.back(`${driverName}.json`);
            const balances = await driver.fetchBalance(modifier);
            expect(balances).toBeGreaterThanOrEqual(0);
          });
        });
      }
    }

    if (driver.supports.tokens) {
      const tokens = coins.filter((coin) => (typeof coin.reference !== 'undefined'));

      if (tokens.length === 0) {
        throw new Error('The driver supports tokens but there is no tokens in the json file');
      }

      tokens.forEach((token) => {
        describe(token.name || token.symbol, () => {
          test('getSupply happy path', async () => {
            await nock.back(`${driverName}-${token.reference}.json`);
            const supply = await driver.getSupply(token);
            expect(supply.circulating).toBeGreaterThan(0);
          });

          test('Total supply should be greater than zero', async () => {
            await nock.back(`${driverName}-${token.reference}.json`);
            const totalSupply = await driver.fetchTokenTotalSupply(token.reference, token.decimals);
            expect(totalSupply).toBeGreaterThan(0);
          });

          if (driver.supports.circulating) {
            test('Circulating supply should be greater than zero', async () => {
              await nock.back(`${driverName}-${token.reference}.json`);
              const circulatingSupply = await driver.fetchTokenCirculatingSupply(
                token.reference,
                token.decimals,
              );
              expect(circulatingSupply).toBeGreaterThan(0);
            });

            test('Circulating supply should be less than or equal to total supply', async () => {
              await nock.back(`${driverName}-${token.reference}.json`);
              const totalSupply = await driver.fetchTokenTotalSupply(
                token.reference,
                token.decimals,
              );
              const circulatingSupply = await driver.fetchTokenCirculatingSupply(
                token.reference,
                token.decimals,
              );
              expect(circulatingSupply).toBeLessThanOrEqual(totalSupply);
            });
          }

          if (driver.supports.max) {
            test('Max supply should be greater than zero', async () => {
              await nock.back(`${driverName}-${token.reference}.json`);
              const maxSupply = await driver.fetchTokenMaxSupply(token.reference, token.decimals);
              expect(maxSupply).toBeGreaterThan(0);
            });

            test('Max supply should be greater than or equal to total supply', async () => {
              await nock.back(`${driverName}-${token.reference}.json`);
              const totalSupply = await driver.fetchTokenTotalSupply(
                token.reference,
                token.decimals,
              );
              const maxSupply = await driver.fetchTokenMaxSupply(
                token.reference,
                token.decimals,
              );
              expect(maxSupply).toBeGreaterThanOrEqual(totalSupply);
            });
          }

          if (driver.supports.balances) {
            if (Array.isArray(token.modifiers) === false || token.modifiers.length === 0) {
              throw new Error('Token should have modifiers');
            }

            token.modifiers.forEach((modifier) => {
              test('Modifier balance should be greater than or equal to zero', async () => {
                await nock.back(`${driverName}-${token.reference}.json`);
                const balances = await driver.fetchTokenBalance(
                  token.reference,
                  modifier,
                  token.decimals,
                );
                expect(balances).toBeGreaterThanOrEqual(0);
              });
            });
          }
        });
      });
    }
  });
});