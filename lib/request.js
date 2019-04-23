const requestPromiseNative = require('request-promise-native');

const headers = {};

if (process.env.USER_AGENT) {
  headers['User-Agent'] = process.env.USER_AGENT;
}

const request = requestPromiseNative.defaults({
  timeout: 20000,
  pool: { maxSockets: 50 },
  headers,
  json: true,
});

module.exports = request;
