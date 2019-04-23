class Throttle {
  constructor(timeout) {
    this.running = false;
    this.timeout = timeout;
    this.queue = [];
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  push() {
    return new Promise(async (resolve, reject) => {
      try {
        this.queue.push({ resolve, reject });

        if (!this.running) {
          this.running = true;

          while (this.queue.length > 0) {
            const { resolve: itemResolve } = this.queue.shift();

            itemResolve();

            await Throttle.sleep(this.timeout); // eslint-disable-line no-await-in-loop
          }

          this.running = false;
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = Throttle;
