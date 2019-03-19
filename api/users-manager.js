'use strict';

class UsersManager {
  /**
   * @param {DB} db
   */
  constructor(db) {
    this._db = db;
  }

  /**
   * @param {Object} filter
   * @return {Promise}
   */
  selectBy(filter = {}) {
    let query = 'SELECT * FROM ??';
    const values = [UsersManager.tableName];
    const where = [];

    Object.keys(filter).forEach(column => {
      const value = filter[column];

      // ignore empty values
      if (typeof value !== 'undefined' && value !== null) {
        values.push(column, value);
        where.push(Array.isArray(value) ? ' ?? IN (?)' : ' ?? = ?');
      }
    });

    if (where.length) {
      query = ''.concat(query, ' WHERE', ...where);
    }

    return this._db.query(query + ';', values);
  }

  /**
   * @param {String} names
   * @return {Promise}
   */
  insert(...names) {
    const query = 'INSERT INTO ?? (??) VALUES ?';
    const values = [UsersManager.tableName, 'Name', names.map(it => [it])];

    return this._db.query(query, values);
  }

  /**
   * @param {Object} filter
   * @return {Promise}
   */
  delete(filter) {
    let query = 'DELETE FROM ??';
    const values = [UsersManager.tableName];
    const where = [];

    Object.keys(filter).forEach(column => {
      const value = filter[column];

      // ignore empty values
      if (typeof value === 'undefined' || value === null) {
        return;
      }

      values.push(column, value);
      where.push(Array.isArray(value) ? ' ?? IN (?)' : ' ?? = ?');
    });

    if (where.length) {
      query = ''.concat(query, ' WHERE', ...where);
    }

    return this._db.query(query + ';', values);
  }

  /**
   * @return {Promise}
   */
  createTable() {
    return this._db.query(`CREATE TABLE IF NOT EXISTS Users(
      Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      Name VARCHAR(255) NOT NULL,
      PRIMARY KEY(Id)
    );`);
  }

  /**
   * @return {Promise}
   */
  dropTable() {
    return this._db.query(`DROP TABLE Users;`);
  }

  /**
   * @return {String}
   */
  static get tableName() {
    return 'Users';
  }
}

module.exports = UsersManager;
