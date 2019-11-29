const cloudscraper = require('cloudscraper');

const headers = {};

if (process.env.USER_AGENT) {
  // TODO: dont use env, but let Supplies take some options
  headers['User-Agent'] = process.env.USER_AGENT;
}

const request = cloudscraper.defaults({
  timeout: 20000,
  pool: { maxSockets: 50 },
  headers,
  json: true,
});

module.exports = request;
