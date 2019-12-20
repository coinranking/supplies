const path = require('path');
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

const { drivers, Coin } = supplies;

drivers.forEach((driverName) => {
  describe(driverName, () => {
    const driver = new supplies[driverName]({
      useThrottle: false,
      useCache: false,
    });

    // Set a secret to avoid an error from being thrown while testing
    if (driver.supports.secret) {
      driver.secret = 'OurLittleSecret';
    }

    // Load the coins from the ./coins dir and do new Coin()

    if (driver.supports.native) {
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

      // driver.supports.balances
    }

    // driver.assets
    //   driver.supports.circulating
    //   driver.supports.max
    //   driver.supports.balances
  });
});
