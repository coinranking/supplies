const Throttle = require('../throttle');
const Coin = require('./coin');
const Supply = require('./supply');
const cache = require('../cache');
const request = require('../request');
const socket = require('../socket');

/**
 * Driver parent class, to be extended by drivers for specific block explorers.
 *
 * @namespace Driver
 * @class
 */
class Driver {
  constructor(config) {
    this.supports = {
      native: true,
      total: true,
      circulating: false,
      balances: false,
      tokens: false,
      max: false,
      decimals: false,
      secret: false,
      ...config.supports,
    };

    const options = config.options || {};
    this.options = {
      useThrottle: true,
      useCache: true,
      ...options,
    };

    this.blockchain = config.blockchain;

    if (options.useThrottle !== false) {
      this.throttle = new Throttle(config.timeout || 100);
    }
  }

  async request(options) {
    let key;
    if (typeof options === 'string') {
      key = options;
    } else {
      key = JSON.stringify(options);
    }

    if (this.options.useCache) {
      if (cache.has(key)) return cache.get(key);
    }

    if (this.options.useThrottle) {
      await this.throttle.push();
    }

    const body = await request(options);

    if (this.options.useCache) {
      cache.set(key, body, 60);
    }

    return body;
  }

  async socket(action, url, code) {
    const key = `${url}:${code}`;

    if (this.options.useCache) {
      if (cache.has(key)) return cache.get(key);
    }

    if (this.options.useThrottle) {
      await this.throttle.push();
    }

    let body;
    if (action === 'waitOn') {
      body = await socket.waitOn(url, code);
    } else if (action === 'request') {
      body = await socket.request(url, code);
    } else {
      throw new Error('Action not supported');
    }

    if (this.options.useCache) {
      cache.set(key, body, 60);
    }

    return body;
  }

  /**
   * Fetch the total supply of a coin.
   *
   * @namespace Driver.fetchTotalSupply
   * @returns {number}
   *   All the currently mined coins.
   */

  /**
   * Fetch the circulating supply of a coin.
   *
   * @namespace Driver.fetchCirculatingSupply
   * @returns {number}
   *   The total supply minus coins not in circulation, such as burned, premined or escrowed coins.
   */

  /**
   * Fetch the maximum supply of a coin.
   *
   * @namespace Driver.fetchMaxSupply
   * @returns {number} The maximum possible amount of supply ever to be reached.
   */

  /**
   * Fetch the balance on a specific address.
   *
   * @namespace Driver.fetchBalance
   * @returns {number} The amount of coins on a specific address, which can be used as a modifier.
   *   to determine the circulating supply.
   */

  /**
   * Fetch the total supply of an token.
   *
   * @namespace Driver.fetchTokenTotalSupply
   * @returns {number} Total amount of a token.
   */

  /**
   * Fetch token balance.
   *
   * @namespace Driver.fetchTokenBalance
   * @returns {number}
   *   Balance of a specific token on a specific address, to be used as supply modifier in order to
   *   calculate the circulating supply.
   */

  /**
   * Drivers must include a getSupplies method. This method will call supported supply data
   * such as methods to fetch total, circulating and max supply.
   *
   * @namespace Driver.getSupply
   * @param {Coin} [coin]
   *   The getSupply method gets called with an [coin instance]{@link Coin}.
   * @returns {Promise.<Supply>} Returns a promise of a supply model.
   */
  async getSupply(coin) { // eslint-disable-line no-unused-vars
    throw new Error('must be implemented by driver');
  }
}

module.exports = Driver;
