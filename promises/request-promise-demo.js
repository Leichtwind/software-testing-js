'use strict';

const { requestPromise } = require('../helper/util');

requestPromise('http://localhost:8080/users', { method: 'GET', json: true })
  .then(response => {
    const { body } = response;

    console.log(JSON.stringify(body, null, 2));

    return requestPromise('localhost/users', { method: 'PATCH', json: true });
  })
  .then(response => {
    const { body } = response;

    console.log(JSON.stringify(body, null, 2));
  })
  .catch(error => {
    console.log(error);
  });
