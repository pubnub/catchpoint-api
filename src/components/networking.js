const superagent = require('superagent');

const path = 'https://io.catchpoint.com';

const attachSuperagentLogger = (req) => {
  const _pickLogger = () => {
    if (console && console.log) return console; // eslint-disable-line no-console
    return console;
  };

  const start = new Date().getTime();
  const timestamp = new Date().toISOString();
  const logger = _pickLogger();
  // console.log(req);
  logger.log('<<<<<');                                          // eslint-disable-line no-console
  logger.log(`[${timestamp}]`, '\n', req.url, '\n', req.qs);    // eslint-disable-line no-console
  logger.log('-----');                                          // eslint-disable-line no-console

  req.on('response', (res) => {
    const now = new Date().getTime();
    const elapsed = now - start;
    const timestampDone = new Date().toISOString();

    logger.log('>>>>>>');                                                                        // eslint-disable-line no-console
    logger.log(`[${timestampDone} / ${elapsed}]`, '\n', req.url, '\n', req.qs, '\n', res.text);  // eslint-disable-line no-console
    logger.log('-----');                                                                         // eslint-disable-line no-console
  });
};

const commonRequestConfig = (requestConfig, request) => {
  if (requestConfig.debug) {
    request.use(attachSuperagentLogger);
  }

  if (requestConfig.authToken) {
    const authHeader = `Bearer ${new Buffer(requestConfig.authToken).toString('base64')}`;

    if (requestConfig.debug) {
      console.log({ authHeader }); // eslint-disable-line no-console
    }

    request.set('Authorization', authHeader);
  }
};

module.exports = {
  get: (requestConfig, resolve, reject) => {
    const request = superagent
      .get(`${path}/${requestConfig.url}`)
      .query(requestConfig.queryParams || {})
      .set('Accept', 'application/json');

    commonRequestConfig(requestConfig, request);

    request
      .end((err, resp) => {
        if (err) return reject(err);
        return resolve(JSON.parse(resp.text));
      });
  },

  post: (requestConfig, resolve, reject) => {
    const request = superagent
      .post(`${path}/${requestConfig.url}`)
      .query(requestConfig.queryParams || {})
      // .use(attachSuperagentLogger)
      .set('Accept', '*/*')
      .send(requestConfig.body);

    if (requestConfig.postType === 'form') {
      request.type('application/x-www-form-urlencoded');
    }

    commonRequestConfig(requestConfig, request);

    request.end((err, resp) => {
      if (err) return reject(err);
      return resolve(JSON.parse(resp.text));
    });
  },
};
