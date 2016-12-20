const _ = require('lodash');

const networking = require('../components/networking');

module.exports = class {

  constructor(config) {
    this._config = config;
  }

  getById({ id } = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!id) return reject('folder id is missing');

      return networking.get({ url: `ui/api/v1/folders/${id}`, authToken: this._config.accessToken, debug: this._config.debug }, resolve, reject);
    });
  }

  getAll(fetchParams = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');

      const queryParams = {};

      ['divisionId', 'productId', 'parentFolderId', 'statusId', 'name', 'pageNumber', 'pageSize'].forEach((queryElement) => {
        if (_.has(fetchParams, queryElement)) {
          queryParams[queryElement] = fetchParams[queryElement];
        }
      });

      return networking.get({ url: 'ui/api/v1/folders', authToken: this._config.accessToken, queryParams, debug: this._config.debug }, resolve, reject);
    });
  }
};
