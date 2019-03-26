'use strict';

const { expect } = require('chai');
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
    const name = 'Ira';

    return requestPromise(url, {
      method: 'GET',
      json: true,
      qs: {
        name: name
      }
    }).then(response => {
      const { body, statusCode } = response;

      expect(statusCode).to.equal(200);
      expect(body).to.have.property('data').instanceOf(Array);

      const names = body.data.map(it => it.Name);

      expect(names).to.have.members([name]);
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

      expect(statusCode).to.equal(200);
      expect(body).to.have.property('data').instanceOf(Array);

      const names = body.data.map(it => it.Name);

      expect(names).to.have.members(requested);

    });
  });
});
