const networking = require('../components/networking');

module.exports = class {

  constructor(config) {
    this._config = config;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: 'ui/api/v1/nodeGroups'
      });

      return networking.get(requestParams, resolve, reject);
    });
  }

  getById({ id } = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!id) return reject('node group id is missing');

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: `ui/api/v1/nodeGroups/${id}`
      });

      return networking.get(requestParams, resolve, reject);
    });
  }

};
