
const networking = require('./components/networking');

const NodesAPI = require('./endpoints/nodes');
const NodeGroupsAPI = require('./endpoints/node_groups');

module.exports = class {

  constructor() {
    this.version = 1;
    this._config = {};

    // mount endpoints;
    this.nodes = new NodesAPI(this._config);
    this.nodeGroups = new NodeGroupsAPI(this._config);
  }

  setAccessToken(token) {
    this._config.accessToken = token;
  }

  authorize(config) {
    return new Promise((resolve, reject) => {
      const clientId = (config.clientId || '').trim();
      const clientSecret = (config.clientSecret || '').trim();

      if (!clientId) { return reject('clientId is missing'); }
      if (!clientSecret) { return reject('clientSecret is missing'); }

      const postBody = {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      };

      return networking.post({ url: 'ui/api/token', body: postBody }, resolve, reject);
    });
  }

  /*
  getNodes(config) {
    return new Promise((resolve, reject) => {

      return this.GET
    });
  }
      */
};
