const Driver = require('../../models/driver');
const Supply = require('../../models/supply');
const request = require('../../request');
const cache = require('../../cache');
const { promisesMap } = require('../../utils');

class EosPark extends Driver {
  constructor({ secret }) {
    super({
      name: 'eospark',
      timeout: 1000, // 1 request per second
    });

    if (!secret) throw new Error('API key is required');

    this.secret = secret;
  }

  async _fetchTotalAndMaxSupply(coin) {
    let symbol;
    let account;
    if (coin.reference === 'native') {
      symbol = 'EOS';
      account = 'eosio.token';
    } else {
      [symbol, account] = coin.reference.split(':');
    }

    const { symbol_list: list } = await cache('eospark-symbols', request('https://storage.eospark.com/data/symbols/symbols_list.json'));
    const token = list.find(item => (item.account === account && item.symbol === symbol));
    const total = token.current_supply;
    const max = token.max_supply;

    return { total, max };
  }

  async _fetchNativeBalance(coin, modifier) {
    await this.throttle.push();

    const { data } = await request(`https://api.eospark.com/api?module=account&action=get_account_balance&apikey=${this.secret}&account=${modifier.reference}`);

    const balance = Number(data.balance);
    const stakeToOthers = Number(data.stake_to_others);
    const stakeToSelf = Number(data.stake_to_self);
    const unstake = Number(data.unstake);

    return balance + stakeToOthers + stakeToSelf + unstake;
  }

  async _fetchTokenBalance(coin, modifier) {
    await this.throttle.push();

    const [symbol, account] = coin.reference.split(':');

    const { data } = await request(`https://api.eospark.com/api?module=account&action=get_token_list&apikey=${this.secret}&account=${modifier.reference}&symbol=${symbol}`);
    const { symbol_list: list } = data;
    const token = list.find(item => (item.code === account && item.symbol === symbol));

    if (!token) return 0;

    return Number(token.balance);
  }

  async getSupply(coin) {
    const { total, max } = await this._fetchTotalAndMaxSupply(coin);

    const modifiers = await promisesMap(
      coin.modifiers,
      async (modifier) => {
        if (coin.reference === 'native') {
          const balance = await this._fetchNativeBalance(coin, modifier);
          return {
            ...modifier,
            balance,
          };
        }
        const balance = await this._fetchTokenBalance(coin, modifier);
        return {
          ...modifier,
          balance,
        };
      },
    );

    const circulating = modifiers.reduce((current, modifier) => current - modifier.balance, total);

    return new Supply({
      total,
      max,
      circulating,
      modifiers,
    });
  }
}

module.exports = EosPark;
