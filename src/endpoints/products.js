const networking = require('../components/networking');

module.exports = class {

  constructor(config) {
    this._config = config;
  }

  getById({ id } = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!id) return reject('product id is missing');

      return networking.get({ url: `ui/api/v1/products/${id}`, authToken: this._config.accessToken }, resolve, reject);
    });
  }

  getAll(fetchParams = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');

      const queryParams = {};

      ['divisionId', 'statusId', 'name', 'pageNumber', 'pageSize'].forEach((queryElement) => {
        if ((fetchParams[queryElement] || '').trim().length > 0) {
          queryParams[queryElement] = fetchParams[queryElement].trim();
        }
      });

      return networking.get({ url: 'ui/api/v1/products', authToken: this._config.accessToken, queryParams }, resolve, reject);
    });
  }
};
