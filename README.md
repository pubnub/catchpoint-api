# catchpoint-api
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
  catchPoint.authorize({
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

  catchPoint.authorize({
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

### Get specific node
* Requires authentication
```javascript
  catchPoint.nodeGroups.getById({id: 123}).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.error(error);
  })
```
