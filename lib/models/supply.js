module.exports = class Supply {
  constructor(options) {
    this.total = options.total;
    this.circulating = options.circulating;
    this.max = options.max;
  }
};
