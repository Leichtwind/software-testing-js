'use strict';

const assert = require('assert');
const { requestPromise } = require('../../helper/util');

const url = 'http://localhost:8080/users';

describe('/users GET test 2', () => {

  it('/users GET should return an array in data field', () => {
    return requestPromise(url, { method: 'GET', json: true })
      .then(response => {
        const { body, statusCode } = response;

        assert.strictEqual(statusCode, 200);

        if (!Array.isArray(body.data)) {
          throw new Error('Data should be array!');
        }
      });
  });

  it.skip('this test should be skipped', () => {

  });
});
