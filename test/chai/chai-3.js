'use strict';

const { expect } = require('chai');
const { requestPromise } = require('../../helper/util');

const url = 'http://localhost:8080/users';

const name = 'Ira';

describe('Basic user lifecycle test', () => {

  before('Clean up Users table before test', () => {
    return requestPromise(url, {
      method: 'DELETE',
      json: true
    });
  });


  it('/users GET should return an empty array', () => {
    return requestPromise(url, { method: 'GET', json: true })
      .then(response => {
        const { body, statusCode } = response;

        expect(statusCode).to.equal(200);

        expect(body).to.have.property('message').equal('Users list');

        // noinspection BadExpressionStatementJS
        expect(body).to.have.property('data').instanceOf(Array).that.is.empty;
      });
  });


  it('/users POST should return a success message', () => {
    return requestPromise(url, { method: 'POST', json: true, body: { name } })
      .then(response => {
        const { body, statusCode } = response;

        expect(statusCode).to.equal(200);

        expect(body).to.have.property('message').that.equal(`User ${name} successfully added!`);

        expect(body).not.to.have.property('data');
      });
  });


  it('/users GET should return an array with one user', () => {
    return requestPromise(url, { method: 'GET', json: true, qs: { name } })
      .then(response => {
        const { body, statusCode } = response;

        expect(statusCode).to.equal(200);

        expect(body).to.have.property('message').equal('Users list');

        expect(body).to.have.property('data').instanceOf(Array).that.deep.includes({ Name: name, Id: 1 });
      });
  });


  it('/users DELETE should return a success message', () => {
    return requestPromise(url, { method: 'DELETE', json: true })
      .then(response => {
        const { body, statusCode } = response;

        expect(statusCode).to.equal(200);

        expect(body).to.have.property('message').equal('Collection of Users was dropped.');

        expect(body).not.to.have.property('data');
      });
  });


  it('/users GET should return an empty array', () => {
    return requestPromise(url, { method: 'GET', json: true })
      .then(response => {
        const { body, statusCode } = response;

        expect(statusCode).to.equal(200);

        expect(body).to.have.property('message').equal('Users list');

        // noinspection BadExpressionStatementJS
        expect(body).to.have.property('data').instanceOf(Array).that.is.empty;
      });
  });
});
