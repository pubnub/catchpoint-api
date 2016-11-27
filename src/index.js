const NodesAPI = require('./endpoints/nodes');
const NodeGroupsAPI = require('./endpoints/node_groups');
const AuthorizationAPI = require('./endpoints/authorize');

module.exports = class {

  constructor() {
    this.version = 1;
    this._config = {};

    // mount endpoints;
    this.nodes = new NodesAPI(this._config);
    this.nodeGroups = new NodeGroupsAPI(this._config);
    this.authorization = new AuthorizationAPI(this._config);
  }

  setAccessToken(token) {
    this._config.accessToken = token;
  }
};
