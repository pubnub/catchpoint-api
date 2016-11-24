const nock = require('nock');

module.exports = {
  createNock() {
    return nock('https://io.catchpoint.com', {
      filteringScope: () => true
    });
  }
};
