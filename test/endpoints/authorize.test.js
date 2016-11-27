/* global describe, beforeEach, it, before, afterEach, after */
/* eslint no-console: 0 */

const CatchpointEntry = require('../../src/');
const utils = require('../utils');
const nock = require('nock');
const assert = require('assert');

describe('authorization API', () => {
  this.apiInstance = null;

  beforeEach(() => {
    this.apiInstance = new CatchpointEntry();
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.enableNetConnect();
  });

  it('fails to run if clientId is missing', (done) => {
    this.apiInstance.authorization.createSession()
      .catch((error) => {
        assert.equal(error, 'clientId is missing');
        done();
      });
  });

  it('fails to run if clientSecret', (done) => {
    this.apiInstance.authorization.createSession({ clientId: 'cid' })
      .catch((error) => {
        assert.equal(error, 'clientSecret is missing');
        done();
      });
  });

  it('responds with token', (done) => {
    const scope = utils.createNock().post('/ui/api/token', 'grant_type=client_credentials&client_id=cid&client_secret=csid')
      .reply(200, '{ "mock": "response"}');

    this.apiInstance.authorization.createSession({ clientId: 'cid', clientSecret: 'csid' })
      .then((response) => {
        assert.deepEqual(response, { mock: 'response' });
        assert.equal(scope.isDone(), true);
        done();
      });
  });
});
