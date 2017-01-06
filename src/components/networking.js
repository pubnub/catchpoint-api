const request = require('request');
const _ = require('lodash');

const path = 'https://io.catchpoint.com';

const commonRequestConfig = (method, requestConfig, resolve, reject) => {
  const consructedRequest = {
    headers: requestConfig.headers
  };

  if (requestConfig.authToken) {
    const authHeader = `Bearer ${new Buffer(requestConfig.authToken).toString('base64')}`;
    consructedRequest.headers.Authorization = authHeader;
  }

  consructedRequest.method = method;
  consructedRequest.uri = `${path}/${requestConfig.url}`;
  consructedRequest.qs = requestConfig.queryParams;
  consructedRequest.json = true;

  if (requestConfig.postType === 'form') {
    consructedRequest.form = requestConfig.body;
  }

  if (requestConfig.postType === 'json') {
    consructedRequest.body = requestConfig.body;
  }

  if (requestConfig.debug) {
    console.log('-- outgoing request --', '\n', JSON.stringify(consructedRequest, 0, '\t'), '\n', '--     --'); //eslint-disable-line
  }

  request(consructedRequest, (error, response, body) => {
    const responseStructure = {
      pageNumber: 0,
      items: [],
      hasMore: false
    };

    if (error) {
      // overcome awkward catchpoint bug
      if (error.code === 'HPE_INVALID_CONSTANT') {
        return resolve(responseStructure);
      } else {
        return reject(error);
      }
    }

    if (body.items && body.has_more) {
      responseStructure.items = body.items;
      responseStructure.hasMore = body.has_more;
      responseStructure.pageNumber = body.page_number;
      return resolve(responseStructure);
    } else {
      return resolve(body);
    }
  });
};

module.exports = {
  createBaseRequestParams: (config, extraConfig) => {
    const requestParams = {
      queryParams: {},
      authToken: config.accessToken,
      debug: config.debug,
      headers: { Accept: 'application/json' }
    };

    if (extraConfig) {
      _.assign(requestParams, extraConfig);
    }

    return requestParams;
  },
  get: (requestConfig, resolve, reject) => {
    commonRequestConfig('GET', requestConfig, resolve, reject);
  },

  post: (requestConfig, resolve, reject) => {
    commonRequestConfig('POST', requestConfig, resolve, reject);
  },
};
