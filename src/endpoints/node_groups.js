const networking = require('../components/networking');

module.exports = class {

  constructor(config) {
    this._config = config;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');

      return networking.get({ url: 'ui/api/v1/nodeGroups', authToken: this._config.accessToken }, resolve, reject);
    });
  }

  getById({ id } = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!id) return reject('node group id is missing');

      return networking.get({ url: `ui/api/v1/nodeGroups/${id}`, authToken: this._config.accessToken }, resolve, reject);
    });
  }

};
