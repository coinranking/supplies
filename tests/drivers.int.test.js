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

    if (driver.supports.assets) {
      const assets = coins.filter((coin) => (typeof coin.reference !== 'undefined'));

      if (assets.length === 0) {
        throw new Error('The driver supports assets but there is no assets in the json file');
      }

      assets.forEach((asset) => {
        describe(asset.name || asset.symbol, () => {
          test('Total supply should be greater than zero', async () => {
            await nock.back(`${driverName}-${asset.reference}.json`);
            const totalSupply = await driver.fetchAssetTotalSupply(asset.reference, asset.decimals);
            expect(totalSupply).toBeGreaterThan(0);
          });

          if (driver.supports.circulating) {
            test('Circulating supply should be greater than zero', async () => {
              await nock.back(`${driverName}-${asset.reference}.json`);
              const circulatingSupply = await driver.fetchAssetCirculatingSupply(
                asset.reference,
                asset.decimals,
              );
              expect(circulatingSupply).toBeGreaterThan(0);
            });

            test('Circulating supply should be less than or equal to total supply', async () => {
              await nock.back(`${driverName}-${asset.reference}.json`);
              const totalSupply = await driver.fetchAssetTotalSupply(
                asset.reference,
                asset.decimals,
              );
              const circulatingSupply = await driver.fetchAssetCirculatingSupply(
                asset.reference,
                asset.decimals,
              );
              expect(circulatingSupply).toBeLessThanOrEqual(totalSupply);
            });
          }

          if (driver.supports.max) {
            test('Max supply should be greater than zero', async () => {
              await nock.back(`${driverName}-${asset.reference}.json`);
              const maxSupply = await driver.fetchAssetMaxSupply(asset.reference, asset.decimals);
              expect(maxSupply).toBeGreaterThan(0);
            });

            test('Max supply should be greater than or equal to total supply', async () => {
              await nock.back(`${driverName}-${asset.reference}.json`);
              const totalSupply = await driver.fetchAssetTotalSupply(
                asset.reference,
                asset.decimals,
              );
              const maxSupply = await driver.fetchAssetMaxSupply(
                asset.reference,
                asset.decimals,
              );
              expect(maxSupply).toBeGreaterThanOrEqual(totalSupply);
            });
          }

          if (driver.supports.balances) {
            if (Array.isArray(asset.modifiers) === false || asset.modifiers.length === 0) {
              throw new Error('Asset should have modifiers');
            }

            asset.modifiers.forEach((modifier) => {
              test('Modifier balance should be greater than or equal to zero', async () => {
                await nock.back(`${driverName}-${asset.reference}.json`);
                const balances = await driver.fetchAssetBalance(
                  asset.reference,
                  modifier,
                  asset.decimals,
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
