'use strict';

const request = require('request');

request('http://localhost:8080/users', {
  method: 'GET',
  json: true
}, (error, response) => {
  if (error) {
    return console.log(error);
  }

  const { body } = response;

  console.log(JSON.stringify(body, null, 2));

  request('localhost/users', {
    method: 'PATCH',
    json: true
  }, (error, response) => {
    if (error) {
      return console.log(error);
    }

    const { body } = response;

    console.log(JSON.stringify(body, null, 2));
  });
});
