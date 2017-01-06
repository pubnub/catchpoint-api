const _ = require('lodash');

const networking = require('../components/networking');

module.exports = class {

  constructor(config) {
    this._config = config;
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
        change_date: timeNowString,
        id: updateParams.id,
      };
      const fields = [
        'name',
        'productId',
        'divisionId',
        'parentFolderId',
      ];

      fields.forEach((field) => {
        if (_.has(updateParams, field)) {
          postBody[_.snakeCase(field)] = updateParams[field];
        }
      });

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: `ui/api/v1/folders/${updateParams.id}`,
        postType: 'json',
        body: postBody
      });

      return networking.post(requestParams, resolve, reject);
    });
  }

  getById({ id } = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');
      if (!id) return reject('folder id is missing');

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: `ui/api/v1/folders/${id}`
      });

      return networking.get(requestParams, resolve, reject);
    });
  }

  getAll(fetchParams = {}) {
    return new Promise((resolve, reject) => {
      if (!this._config.accessToken) return reject('missing access token');

      const requestParams = networking.createBaseRequestParams(this._config, {
        url: 'ui/api/v1/folders'
      });

      ['divisionId', 'productId', 'parentFolderId', 'statusId', 'name', 'pageNumber', 'pageSize'].forEach((queryElement) => {
        if (_.has(fetchParams, queryElement)) {
          requestParams.queryParams[queryElement] = fetchParams[queryElement];
        }
      });

      return networking.get(requestParams, resolve, reject);
    });
  }
};
