const networking = require('../components/networking');

module.exports = class {

  constructor(config) {
    this._config = config;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');

      return networking.get({ url: 'ui/api/v1/nodes', authToken: this._config.accessToken }, resolve, reject);
    });
  }

  getById(config) {
    const executionConfig = config || {};

    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!executionConfig.id) return reject('node id is missing');

      return networking.get({ url: `ui/api/v1/nodes/${executionConfig.id}`, authToken: this._config.accessToken }, resolve, reject);
    });
  }

};
