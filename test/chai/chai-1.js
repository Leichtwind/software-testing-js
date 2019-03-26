'use strict';

const { expect } = require('chai');
const { requestPromise } = require('../../helper/util');

describe('/users GET test with chai', () => {

  it('/users GET should return an array in data field', () => {
    return requestPromise('http://localhost:8080/users', { method: 'GET', json: true })
      .then(response => {
        const { body, statusCode } = response;

        expect(statusCode).to.equal(200);

        expect(body).to.have.property('data').instanceOf(Array);
      });
  });
});
