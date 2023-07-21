const { Web3 } = require('web3');
const Driver = require('../models/driver');
const Supply = require('../models/supply');
const Coin = require('../models/coin');
const SupplyModifier = require('../models/supply-modifier');
const { promisesMap } = require('../util');

const abi = [
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: '_totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: '_initialSupply',
    outputs: [
      {
        name: '',
        type: 'uint',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

/**
 * Web3 driver. Supports circulating and total supply for ethereum and
 * tokens on the ethereum blockchain.
 *
 * @augments Driver
 * @memberof Driver
 */
class Web3Eth extends Driver {
  constructor(options) {
    super({
      timeout: 200, // 5 requests per second
      supports: {
        balances: true,
        native: false,
        tokens: true,
        web3: true,
        blockchains: ['Ethereum'],
      },
      options,
    });
  }

  contract(reference) {
    this.web3 = new Web3('https://cloudflare-eth.com');
    this.web3.eth.handleRevert = true;

    return new this.web3.eth.Contract(abi, reference);
  }

  /**
   * @augments Driver.fetchTokenTotalSupply
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @async
   */
  async fetchTokenTotalSupply(reference) {
    const contract = this.contract(reference);

    const decimals = await contract.methods.decimals().call();
    let totalSupply = await contract.methods.totalSupply().call();

    try {
      totalSupply = await contract.methods._totalSupply().call();
      totalSupply = await contract.methods._initialSupply().call();
    } catch (error) {
      // if a driver does not support _totalSupply or _initialSupply it should not throw an error
    }

    return Number(totalSupply) / (10 ** Number(decimals));
  }

  /**
   * @augments Driver.fetchTokenBalance
   * @param {string} reference The unique identifier of a coin. Usually a smart contract address.
   * @param {SupplyModifier} modifier {@link SupplyModifier}
   * @async
   */
  async fetchTokenBalance(reference, modifier) {
    const contract = this.contract(reference);

    const decimals = await contract.methods.decimals().call();
    const balance = await contract.methods.balanceOf(modifier).call();

    return balance / (10 ** decimals);
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
        const balance = await this.fetchTokenBalance(coin.reference, modifier, coin.decimals);
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
