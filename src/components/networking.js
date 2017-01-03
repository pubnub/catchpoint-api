const request = require('request');
const _ = require('lodash');

const path = 'https://io.catchpoint.com';

const convertParamsKV = (input) => {
  const response = [];

  for (const objKey of Object.keys(input)) {
    response.push({ name: objKey, value: input[objKey] });
  }

  return response;
};

const commonRequestConfig = (requestConfig, requestParams, resolve, reject) => {
  if (requestConfig.authToken) {
    const authHeader = `Bearer ${new Buffer(requestConfig.authToken).toString('base64')}`;
    requestParams.har.headers.Authorization = authHeader;
  }

  requestParams.har.headers = convertParamsKV(requestParams.har.headers);

  if (requestConfig.debug) {
    console.log('-- outgoing har --', '\n', JSON.stringify(requestParams, 0, '\t'), '\n', '--     --'); //eslint-disable-line
  }

  request(requestParams, (error, response, body) => {
    if (error) {
      reject(error);
    } else {
      resolve(JSON.parse(body));
    }
  });
};

module.exports = {
  createBaseRequestParams: (config, extraConfig) => {
    const requestParams = {
      queryParams: {},
      authToken: config.accessToken,
      debug: config.debug
    };

    if (extraConfig) {
      _.assign(requestParams, extraConfig);
    }

    return requestParams;
  },
  get: (requestConfig, resolve, reject) => {
    const requestParams = {
      har: {
        method: 'GET',
        url: `${path}/${requestConfig.url}`,
        qs: requestConfig.queryParams || {},
        headers: { Accept: 'application/json' }
      }

    };

    commonRequestConfig(requestConfig, requestParams, resolve, reject);
  },

  post: (requestConfig, resolve, reject) => {
    const requestParams = {
      har: {
        method: 'POST',
        url: `${path}/${requestConfig.url}`,
        qs: requestConfig.queryParams || {},
        headers: { Accept: '*/*' },
        postData: {
          mimeType: 'application/x-www-form-urlencoded',
          params: convertParamsKV(requestConfig.body)
        }
      }
    };

    commonRequestConfig(requestConfig, requestParams, resolve, reject);

    /*
    request.end((err, resp) => {
      if (err) return reject(err);
      return resolve(JSON.parse(resp.text));
    });
    */
  },
};
