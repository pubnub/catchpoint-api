const _ = require('lodash');

const networking = require('../components/networking');
const utils = require('../utils');


module.exports = class {

  constructor(config) {
    this._config = config;
  }

  getById({ id } = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!id) return reject('test id is missing');

      return networking.get({
        url: `ui/api/v1/tests/${id}`,
        authToken: this._config.accessToken,
        debug: this._config.debug
      }, resolve, reject);
    });
  }

  create(createParams = {}) {
    // create is just an update with id of 0.
    createParams.id = 0;

    return this.update(createParams);
  }

  update(updateParams = {}) {
    return new Promise((resolve, reject) => {
      const timeNow = new Date();
      let timeNowString = `${timeNow.getMonth()}/${timeNow.getDate()}/${timeNow.getFullYear()}`;
      timeNowString += ` ${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`;

      const postBody = {
        start: timeNowString,
        change_date: timeNowString,
        id: updateParams.id,
        test_type: utils.convertTestType(updateParams.testType),
        monitor: utils.convertMonitor(updateParams.monitor),
        status: {
          id: 0,
          name: 'Active'
        }
      };
      const fields = [
        'name',
        'productId',
        'divisionId',
        'testUrl'
      ];

      fields.forEach((field) => {
        if (_.has(updateParams, field)) {
          postBody[_.snakeCase(field)] = updateParams[field];
        }
      });

      return networking.post({
        url: `ui/api/v1/tests/${updateParams.id}`,
        authToken: this._config.accessToken,
        debug: this._config.debug,
        postType: 'form',
        body: JSON.stringify(postBody),
      }, resolve, reject);
    });
  }

  getAll(fetchParams = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');

      const filters = [
        'divisionId',
        'productId',
        'parentFolderId',
        'statusId',
        'typeId',
        'monitorId',
        'url',
        'name',
        'alertsPaused',
        'pageNumber',
        'pageSize',
      ];

      const queryParams = {};

      filters.forEach((queryElement) => {
        if (_.has(fetchParams, queryElement)) {
          queryParams[queryElement] = fetchParams[queryElement].trim();
        }
      });

      return networking.get({
        url: 'ui/api/v1/tests',
        authToken: this._config.accessToken,
        debug: this._config.debug,
        queryParams
      }, resolve, reject);
    });
  }
};
