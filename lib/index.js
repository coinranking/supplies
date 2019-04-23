const drivers = require('./drivers');

module.exports = {
  ...drivers,
  drivers: Object.keys(drivers),
};
