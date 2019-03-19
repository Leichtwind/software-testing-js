'use strict';

const mysql = require('mysql');

class DB {
  /**
   * @param {Object} config
   */
  constructor(config) {
    this._connection = mysql.createPool(config);
  }

  /**
   * @param {String} query
   * @param {Array} values
   * @return {Promise}
   */
  query(query, values = []) {
    return new Promise((resolve, reject) => {
      this._connection.query(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });
  }

  /**
   *
   */
  end() {
    this._connection.end();
  }
}

module.exports = DB;
