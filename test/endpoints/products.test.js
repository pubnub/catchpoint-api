/* global describe, beforeEach, it, before, afterEach, after */
/* eslint no-console: 0 */

const CatchpointEntry = require('../../src/');
const utils = require('../utils');
const nock = require('nock');
const assert = require('assert');

describe('products API', () => {
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
      this.apiInstance.products.getById({ id: 123 })
        .catch((error) => {
          assert.equal(error, 'missing access token');
          done();
        });
    });

    it('fails to run if product id is missing', (done) => {
      this.apiInstance.setAccessToken('myToken');
      this.apiInstance.products.getById()
        .catch((error) => {
          assert.equal(error, 'product id is missing');
          done();
        });
    });

    it('responds with payload if token is passed', (done) => {
      const scope = utils.createNock().get('/ui/api/v1/products/11')
        .matchHeader('Authorization', 'Bearer bXlUb2tlbg==')
        .reply(200, '{ "mock": "response"}');

      this.apiInstance.setAccessToken('myToken');
      this.apiInstance.products.getById({ id: 11 })
        .then((response) => {
          assert.deepEqual(response, { mock: 'response' });
          assert.equal(scope.isDone(), true);
          done();
        });
    });
  });

  describe('#getAll', () => {
    it('fails to run if access token is missing', (done) => {
      this.apiInstance.products.getAll()
        .catch((error) => {
          assert.equal(error, 'missing access token');
          done();
        });
    });

    it('responds with payload if token is passed', (done) => {
      const filterParams = {
        divisionId: 'divisionId',
        statusId: 'statusId',
        name: 'name',
        pageNumber: 'pageNumber',
        pageSize: 'pageSize'
      };

      const scope = utils.createNock().get('/ui/api/v1/products')
        .matchHeader('Authorization', 'Bearer bXlUb2tlbg==')
        .query(filterParams)
        .reply(200, '{ "mock": "response"}');

      this.apiInstance.setAccessToken('myToken');

      this.apiInstance.products.getAll(filterParams)
        .then((response) => {
          assert.deepEqual(response, { mock: 'response' });
          assert.equal(scope.isDone(), true);
          done();
        });
    });
  });
});
