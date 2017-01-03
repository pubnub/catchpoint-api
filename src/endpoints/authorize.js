const networking = require('../components/networking');

module.exports = class {

  constructor(config) {
    this._config = config;
  }

  createSession({ clientId = '', clientSecret = '' } = {}) {
    return new Promise((resolve, reject) => {
      clientId = clientId.trim();
      clientSecret = clientSecret.trim();

      if (!clientId) { return reject('clientId is missing'); }
      if (!clientSecret) { return reject('clientSecret is missing'); }

      const postBody = {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      };

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: 'ui/api/token',
        body: postBody,
        postType: 'form'
      });

      return networking.post(requestParams, resolve, reject);
    });
  }
};
