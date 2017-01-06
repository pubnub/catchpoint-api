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

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: `ui/api/v1/tests/${id}`
      });

      return networking.get(requestParams, resolve, reject);
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
      const currentMonth = timeNow.getMonth() + 1;
      let timeNowString = `${currentMonth}/${timeNow.getDate()}/${timeNow.getFullYear()}`;
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
        'parentFolderId',
        'testUrl',
        'testHtml'
      ];

      fields.forEach((field) => {
        if (_.has(updateParams, field)) {
          postBody[_.snakeCase(field)] = updateParams[field];
        }
      });

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: `ui/api/v1/tests/${updateParams.id}`,
        postType: 'json',
        body: postBody
      });

      return networking.post(requestParams, resolve, reject);
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

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: 'ui/api/v1/tests'
      });

      filters.forEach((queryElement) => {
        if (_.has(fetchParams, queryElement)) {
          requestParams.queryParams[queryElement] = fetchParams[queryElement];
        }
      });

      return networking.get(requestParams, resolve, reject);
    });
  }
};
