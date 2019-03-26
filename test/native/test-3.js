'use strict';

const assert = require('assert');
const { requestPromise } = require('../../helper/util');

const url = 'http://localhost:8080/users';

describe('/users GET test 3', () => {
  before('Setting up users list', () => {
    return requestPromise(url, {
      method: 'PUT',
      json: true,
      body: ['Max', 'Lera', 'Nastea', 'Ruslan', 'Tanea', 'Ilia', 'Ira']
    });
  });

  it('/users GET should return an array with requested user in data field', () => {
    return requestPromise(url, {
      method: 'GET',
      json: true,
      qs: {
        name: 'Ira'
      }
    }).then(response => {
      const { body, statusCode } = response;

      assert.strictEqual(statusCode, 200);

      if (!Array.isArray(body.data)) {
        throw new Error('Data should be array!');
      }

      // Ira requested but Lera expected
      if (!body.data.find(it => it.Name === 'Lera')) {
        throw new Error(`'Lera was not found!`);
      }
    });
  });

  it('/users GET should return an array with requested users in data field', () => {
    const requested = ['Ira', 'Lera', 'Nastea'];

    return requestPromise(url, {
      method: 'GET',
      json: true,
      qs: {
        name: requested
      }
    }).then(response => {
      const { body, statusCode } = response;

      assert.strictEqual(statusCode, 200);

      if (!Array.isArray(body.data)) {
        throw new Error('Data should be array!');
      }

      requested.forEach(name => {
        if (!body.data.find(it => it.Name === name)) {
          throw new Error(`'Lera was not found!`);
        }
      });
    });
  });
});
