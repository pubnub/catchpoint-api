const networking = require('../components/networking');

module.exports = class {

  constructor(config) {
    this._config = config;
  }

  getById({ id } = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!id) return reject('folder id is missing');

      return networking.get({ url: `ui/api/v1/folders/${id}`, authToken: this._config.accessToken }, resolve, reject);
    });
  }

  getAll(fetchParams = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');

      const queryParams = {};

      ['divisionId', 'productId', 'parentFolderId', 'statusId', 'name', 'pageNumber', 'pageSize'].forEach((queryElement) => {
        if ((fetchParams[queryElement] || '').trim().length > 0) {
          queryParams[queryElement] = fetchParams[queryElement].trim();
        }
      });

      return networking.get({ url: 'ui/api/v1/folders', authToken: this._config.accessToken, queryParams }, resolve, reject);
    });
  }
};
