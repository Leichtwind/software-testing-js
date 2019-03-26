'use strict';

require('dotenv').config();

const DB = require('./db');
const express = require('express');
const UsersManager = require('./users-manager');

const db = new DB({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  acquireTimeout: 100000,
  multipleStatements: true
});

const usersManager = new UsersManager(db);
(async () => await usersManager.createTable())();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.route('/users')
  .get((req, res) => {
    const { name } = req.query;


    return usersManager
      .selectBy({ Name: name })
      .then(queryResult => {
        res.status(200).json({
          message: `Users list`,
          data: queryResult
        });
      });
  })
  .post((req, res) => {
    const { name } = req.body;

    usersManager
      .insert(name)
      .then(() => {
        res.status(200).json({
          message: `User ${name} successfully added!`
        });
      });
  })
  .put((req, res) => {
    const { body: names } = req;

    usersManager
      .dropTable()
      .then(() => usersManager.createTable())
      .then(() => usersManager.insert(...names))
      .then(() => res.status(200).json({
        message: `Collection of Users successfully replaced with ${names.join(', ')}!`
      }));
  })
  .delete((req, res) => {
    const { name } = req.query;

    Promise.resolve()
      .then(() => {
        if (!name) {
          return usersManager
            .dropTable()
            .then(() => usersManager.createTable())
            .then(() => 'Collection of Users was dropped.');
        }

        return usersManager
          .delete({ Name: name })
          .then(() => Array.isArray(name) ?
            `Users ${name.join(', ')} were deleted` :
            `User ${name} was deleted`
          );
      })
      .then(message => {
        res.status(200).json({
          message: message
        });
      });
  });

process.on('SIGTERM', () => {
  db.end();
  process.exit();
});

const port = 8080;

app.listen(port, () => console.log(`App listening on port ${port}!`));
