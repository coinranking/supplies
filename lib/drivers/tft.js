const Driver = require('../models/driver');
const Supply = require('../models/supply');

/** TFT driver. Supports
 * total and circulating supply
 * for TFT
 *
 *
 * @memberof Driver
 * @augments Driver
 */
class TFT extends Driver {
    constructor(options) {
        super({
            timeout: 1000, // 1 requests per second
            supports: {
                circulating: true,
            },
            options,
        });
    }

    /** get total supply for native token
     *
     * @augments Driver.fetchTotalSupply
     * @async
     */
    async fetchTotalSupply() {
        const res = await this.request('https://statsdata.threefoldtoken.com/stellar_stats/api/stats');
        return Number(res.total_tokens.split(",").join(""));
    }

    /** get circulating supply for native token
     *
     * @augments Driver.fetchCirculatingSupply
     * @async
     */
    async fetchCirculatingSupply() {
        const res = await this.request('https://statsdata.threefoldtoken.com/stellar_stats/api/stats');
        const totalTokens = Number(res.total_tokens.split(",").join(""))
        const totalLockedTokens = Number(res.total_locked_tokens.split(",").join(""))
        const totalVestedTokens = Number(res.total_vested_tokens.split(",").join(""))
        const circulating = totalTokens - (totalLockedTokens + totalVestedTokens);
        return circulating;
    }

    /**
     * @augments Driver.getSupply
     */
    async getSupply() {
        const total = await this.fetchTotalSupply();
        const circulating = await this.fetchCirculatingSupply();

        return new Supply({
            total,
            circulating,
        });
    }
}

module.exports = TFT;