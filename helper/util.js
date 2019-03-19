'use strict';

const request = require('request');

class Util {
  /**
   * @param {String} uri
   * @param {Object} options
   * @return {Promise}
   */
  static requestPromise(uri, options) {
    return new Promise((resolve, reject) => {
      request(uri, options, (err, response) => {
        if (err) {
          return reject(err);
        }

        return resolve(response);
      });
    });
  }
}

module.exports = Util;
