const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

/**
 * Web3 Ethereum driver. Supports circulating and total supply for ethereum and
 * tokens on the ethereum blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Web3Eth extends Driver {
  constructor(options) {
    super({
      timeout: 500, // 2 requests per second
      supports: {
        balances: true,
        native: false,
        tokens: true,
        secret: true,
        blockchains: ['Ethereum'],
      },
      options,
    });
  }

  get secret() {
    if (!this._secret) {
      throw new Error('API key is required');
    }
    return this._secret;
  }

  set secret(secret) {
    this._secret = secret;
  }

  /**
   * Driver.fetchSmartContractAttributes()
   *
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchSmartContractAttributes(reference) {
    let result;
    try {
      result = await this.request({
        method: 'POST',
        url: 'https://graphql.bitquery.io',
        headers: {
          'X-API-KEY': this.secret,
        },
        json: {
          query: `
            query($token: String!) {
              ethereum(network: ethereum) {
                address(address: {is: $token}) {
                  smartContract {
                    attributes {
                      name
                      value
                    }
                  }
                }
              }
            }
          `,
          variables: {
            token: reference,
          },
        },
      });
    } catch (error) {
      if (error.error.errors && error.error.errors.length > 0) {
        throw new Error(error.error.errors[0].message);
      }

      throw new Error(error.message);
    }

    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message);
    }

    if (result.data.ethereum.address[0].smartContract.attributes === null) {
      return {};
    }

    const attributes = {};

    result.data.ethereum.address[0].smartContract.attributes.forEach((attribute) => {
      attributes[attribute.name] = attribute.value;
    });

    return attributes;
  }

  /**
   * Driver.fetchSmartContractMintedTotal()
   *
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchSmartContractMintedTotal(reference) {
    let result;
    try {
      result = await this.request({
        method: 'POST',
        url: 'https://graphql.bitquery.io',
        headers: {
          'X-API-KEY': this.secret,
        },
        json: {
          query: `
            query ($token: String!) {
              supply: ethereum(network: ethereum) {
                mint: transfers(
                  currency: {is: $token}
                  sender: {is: "0x0000000000000000000000000000000000000000"}
                ) {
                  amount(calculate: sum)
                }
              }
            }
          `,
          variables: {
            token: reference,
          },
        },
      });
    } catch (error) {
      if (error.error.errors && error.error.errors.length > 0) {
        throw new Error(error.error.errors[0].message);
      }

      throw new Error(error.message);
    }

    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message);
    }

    return Number(result.data.supply.mint[0].amount);
  }

  /**
   * Driver.fetchTokenBurnedAmount
   *
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenBurnedAmount(reference) {
    let result;
    try {
      result = await this.request({
        method: 'POST',
        url: 'https://graphql.bitquery.io',
        headers: {
          'X-API-KEY': this.secret,
        },
        json: {
          query: `
            query ($token: String!) {
              balance: ethereum(network: ethereum) {
                burn: transfers(
                  currency: {is: $token}
                  receiver: {in: [
                    "0x0000000000000000000000000000000000000000",
                    "0x0000000000000000000000000000000000000001",
                    "0x000000000000000000000000000000000000dead"
                   ]}
                ) {
                  amount(calculate: sum)
                }
              }
            }
          `,
          variables: {
            token: reference,
          },
        },
      });
    } catch (error) {
      if (error.error.errors && error.error.errors.length > 0) {
        throw new Error(error.error.errors[0].message);
      }

      throw new Error(error.message);
    }

    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message);
    }

    return Number(result.data.balance.burn[0].amount);
  }

  /**
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {number} decimals The number of decimals the token uses.
   * @async
   */
  async fetchTokenTotalSupply(reference, decimals) {
    const attributes = await this.fetchSmartContractAttributes(reference);
    if (
      attributes.totalSupply
      || attributes._totalSupply
      || attributes._initialSupply
    ) {
      const totalSupply = Number(
        attributes.totalSupply
        || attributes._totalSupply
        || attributes._initialSupply,
      );
      const getDecimals = Number(attributes.decimals || decimals || 18);
      return totalSupply / (10 ** getDecimals);
    }

    const totalMinted = await this.fetchSmartContractMintedTotal(reference);
    const totalBurned = await this.fetchTokenBurnedAmount(reference);

    return totalMinted - totalBurned;
  }

  /**
   * @augments Driver.fetchTokenBalance
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchTokenBalance(reference, modifier) {
    let result;
    try {
      result = await this.request({
        method: 'POST',
        url: 'https://graphql.bitquery.io',
        headers: {
          'X-API-KEY': this.secret,
        },
        json: {
          query: `
            query ($address: String!, $token: String!) {
              balance: ethereum (network: ethereum) {
                address(address: {is: $address}) {
                  balances(currency: {is: $token}) {
                    value
                  }
                }
              }
            }
          `,
          variables: {
            token: reference,
            address: modifier,
          },
        },
      });
    } catch (error) {
      if (error.error.errors && error.error.errors.length > 0) {
        throw new Error(error.error.errors[0].message);
      }

      throw new Error(error.message);
    }

    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message);
    }

    if (result.data.balance.address[0].balances === null) {
      return 0;
    }

    const balance = Number(result.data.balance.address[0].balances[0].value);

    if (balance < 0) {
      return 0;
    }

    return balance;
  }

  /**
   * @augments Driver.getSupply
   * @param {Coin} coin {@link Coin}
   */
  async getSupply(coin) {
    const total = await this.fetchTokenTotalSupply(coin.reference, coin.decimals);

    const modifiersWithBalances = await promisesMap(
      coin.modifiers,
      async (modifier) => {
        const balance = await this.fetchTokenBalance(coin.reference, modifier);
        return {
          reference: modifier,
          balance,
        };
      },
    );
    const circulating = modifiersWithBalances
      .reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      circulating,
      modifiers: modifiersWithBalances,
    });
  }
}

module.exports = Web3Eth;
