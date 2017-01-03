const networking = require('../components/networking');

module.exports = class {

  constructor(config) {
    this._config = config;
  }

  getById({ id } = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!id) return reject('product id is missing');

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: `ui/api/v1/products/${id}`
      });

      return networking.get(requestParams, resolve, reject);
    });
  }

  getAll(fetchParams = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: 'ui/api/v1/products'
      });

      ['divisionId', 'statusId', 'name', 'pageNumber', 'pageSize'].forEach((queryElement) => {
        if ((fetchParams[queryElement] || '').trim().length > 0) {
          requestParams.queryParams[queryElement] = fetchParams[queryElement].trim();
        }
      });

      return networking.get(requestParams, resolve, reject);
    });
  }
};
