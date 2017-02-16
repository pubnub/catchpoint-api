const networking = require('../components/networking');
const _ = require('lodash');

module.exports = class {

  constructor(config) {
    this._config = config;
  }

  getMultipleTestIds(fetchParams = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!fetchParams.testIds) return reject('tests ids is missing');

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: 'ui/api/v1/performance/raw'
      });

      const filters = [
        'startTime',
        'endTime'
      ];

      filters.forEach((queryElement) => {
        if (_.has(fetchParams, queryElement)) {
          requestParams.queryParams[queryElement] = fetchParams[queryElement];
        }
      });

      requestParams.queryParams.tests = fetchParams.testIds.join(',');

      return networking.get(requestParams, resolve, reject);
    });
  }

  getByTestId(fetchParams = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!fetchParams.id) return reject('test id is missing');

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: `ui/api/v1/performance/raw/${fetchParams.id}`
      });

      const filters = [
        'startTime',
        'endTime'
      ];

      filters.forEach((queryElement) => {
        if (_.has(fetchParams, queryElement)) {
          requestParams.queryParams[queryElement] = fetchParams[queryElement];
        }
      });

      return networking.get(requestParams, resolve, reject);
    });
  }
};
