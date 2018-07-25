# CatchPoint API - JS Wrapper
[![Build Status](https://travis-ci.org/pubnub/catchpoint-api.svg?branch=master)](https://travis-ci.org/pubnub/catchpoint-api)
[![codecov](https://codecov.io/gh/pubnub/catchpoint-api/branch/master/graph/badge.svg)](https://codecov.io/gh/pubnub/catchpoint-api)
[![npm](https://img.shields.io/npm/v/catchpoint-api.svg)](https://www.npmjs.com/package/catchpoint-api)
[![Known Vulnerabilities](https://snyk.io/test/npm/catchpoint-api/badge.svg)](https://snyk.io/test/npm/catchpoint-api)

JS based API wrapper to call catchpoint functionality (https://io.catchpoint.com/ui/help)


# Contributing
  * Please open PR's against `develop` branch
  * Install dependencies via `npm install` and gulp via `npm install -g gulp`
  * Add functionality and contribute tests in the `tests` directory
  * run `gulp test`

# Documentation
## Initialization
```javascript
  const CatchPointAPI = require('catchpoint-api');
  const catchPoint = new CatchPointAPI();
```

## Authentication
```javascript
  catchPoint.authorization.createSession({
    clientId: 'myClientId',
    clientSecret: 'myClientSecret'
  }).then((response) => {
    console.log("my token is: ", response.access_token);
  }).catch((error) => {
    console.error(error);
  })
```

## Adding access token to client
```javascript
  catchpoint.setAccessToken('myToken');
```

### Auth Example
```javascript
  const CatchPointAPI = require('catchpoint-api');
  const catchPoint = new CatchPointAPI();

  catchPoint.authorization.createSession({
    clientId: 'myClientId',
    clientSecret: 'myClientSecret'
  }).then((response) => {
    catchpoint.setAccessToken(response.access_token);
  }).catch((error) => {
    console.error(error);
  })
```

## Nodes
### Get all nodes
* Requires authentication
```javascript
  catchPoint.nodes.getAll().then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
  })
```

### Get specific node
* Requires authentication
```javascript
  catchPoint.nodes.getById({id: 123}).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
  })
```

## Node Groups
### Get all node groups
* Requires authentication
```javascript
  catchPoint.nodeGroups.getAll().then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
  })
```

### Get specific node group
* Requires authentication
```javascript
  catchPoint.nodeGroups.getById({id: 123}).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
  })
```

## Folders
### Get all folders with filtering.
* Requires authentication
```javascript

  const filterParams = {
    divisionId: 123, // optional
    productId: 1234, // optional
    parentFolderId: 1234, // optional
    statusId: 12, // optional
    name: 'name', // optional
    pageNumber: 1, // optional
    pageSize: 10 // optional
  };

  catchPoint.folders.getAll(filterParams).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
  })
```

### Get specific folder
* Requires authentication
```javascript
  catchPoint.folders.getById({id: 123}).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
  })
```

## Products
### Get all products with filtering.
* Requires authentication
```javascript

  const filterParams = {
    divisionId: 123, // optional
    statusId: 12, // optional
    name: 'name', // optional
    pageNumber: 1, // optional
    pageSize: 10 // optional
  };

  catchPoint.products.getAll(filterParams).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
  })
```

### Get specific product
* Requires authentication
```javascript
  catchPoint.products.getById({id: 123}).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
  })
```
