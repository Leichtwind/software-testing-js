'use strict';

const assert = require('assert');
const { requestPromise } = require('../../helper/util');

describe('/users GET test', () => {

  it('/users GET should return an array in data field', () => {
    return requestPromise('http://localhost:8080/users', { method: 'GET', json: true })
      .then(response => {
        const { body, statusCode } = response;

        assert.strictEqual(statusCode, 200);

        if (!Array.isArray(body.data)) {
          throw new Error('Data should be array!');
        }
      });
  });
});
