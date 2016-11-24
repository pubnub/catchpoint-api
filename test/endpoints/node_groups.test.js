/* global describe, beforeEach, it, before, afterEach, after */
/* eslint no-console: 0 */

const CatchpointEntry = require('../../src/');
const utils = require('../utils');
const nock = require('nock');
const assert = require('assert');

describe('node groups API', () => {

  this.apiInstance = null;

  beforeEach(() => {
    this.apiInstance = new CatchpointEntry();
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.enableNetConnect();
  });

  describe('#getById', () => {
    it('fails to run if access token is missing', (done) => {
      this.apiInstance.nodeGroups.getById({ id: 123 })
        .catch((error) => {
          assert.equal(error, 'missing access token');
          done();
        });
    });

    it('fails to run if nodeGroups id is missing', (done) => {
      this.apiInstance.setAccessToken('myToken');
      this.apiInstance.nodeGroups.getById()
        .catch((error) => {
          assert.equal(error, 'node group id is missing');
          done();
        });
    });

    it('responds with payload if token is passed', (done) => {
      const scope = utils.createNock().get('/ui/api/v1/nodeGroups/11')
        .matchHeader('Authorization', 'Bearer bXlUb2tlbg==')
        .reply(200, '{ "mock": "response"}');

      this.apiInstance.setAccessToken('myToken');
      this.apiInstance.nodeGroups.getById({ id: 11 })
        .then((response) => {
          assert.deepEqual(response, { mock: 'response' });
          assert.equal(scope.isDone(), true);
          done();
        });
    });

  });

  describe('#getAll', () => {
    it('fails to run if access token is missing', (done) => {
      this.apiInstance.nodeGroups.getAll()
        .catch((error) => {
          assert.equal(error, 'missing access token');
          done();
        });
    });

    it('responds with payload if token is passed', (done) => {
      const scope = utils.createNock().get('/ui/api/v1/nodeGroups')
        .matchHeader('Authorization', 'Bearer bXlUb2tlbg==')
        .reply(200, '{ "mock": "response"}');

      this.apiInstance.setAccessToken('myToken');
      this.apiInstance.nodeGroups.getAll()
        .then((response) => {
          assert.deepEqual(response, { mock: 'response' });
          assert.equal(scope.isDone(), true);
          done();
        });
    });
  });
});
