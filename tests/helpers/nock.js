// Credit to https://github.com/NimaSoroush for this helper
const nock = require('nock');
const path = require('path');
const zlib = require('zlib');

nock.back.fixtures = path.join(__dirname, '..', 'fixtures');
nock.back.setMode('record');

nock.enableNetConnect();

const makeCompressedResponsesReadable = (scope) => {
  if (scope.rawHeaders.indexOf('gzip') > -1) {
    while (scope.rawHeaders.indexOf('gzip') > -1) {
      const gzipIndex = scope.rawHeaders.indexOf('gzip');
      scope.rawHeaders.splice(gzipIndex - 1, 2);
    }

    const contentLengthIndex = scope.rawHeaders.indexOf('Content-Length');
    scope.rawHeaders.splice(contentLengthIndex - 1, 2);

    const fullResponseBody = scope.response && scope.response.reduce
      && scope.response.reduce((previous, current) => previous + current);

    try {
      scope.response = JSON.parse(
        zlib.gunzipSync(Buffer.from(fullResponseBody, 'hex')).toString('utf8'),
      );
    } catch (e) {
      scope.response = '';
    }
  }
  return scope;
};

const maskSecretInString = (secret) => (string) => string.split(secret).join('maskedSecret');

const maskSecret = (secret) => (scope) => {
  scope.rawHeaders = scope.rawHeaders.map(maskSecretInString(secret));
  if (typeof scope.response === 'string') {
    scope.response = maskSecretInString(secret)(scope.response);
  }
  scope.path = maskSecretInString(secret)(scope.path);
  if (typeof scope.body === 'string') {
    scope.body = maskSecretInString(secret)(scope.body);
  } else if (typeof scope.body === 'object') {
    scope.body = JSON.stringify(scope.body);
    scope.body = maskSecretInString(secret)(scope.body);
    scope.body = JSON.parse(scope.body);
  }

  return scope;
};

const defaultOptions = (secret) => ({
  afterRecord: (outputs) => {
    let parsed = outputs;
    parsed = parsed.map(makeCompressedResponsesReadable);
    if (secret) {
      parsed = parsed.map(maskSecret(secret));
    }
    return parsed;
  },
});

module.exports = { nock, defaultOptions };
