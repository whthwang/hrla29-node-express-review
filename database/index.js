const Sequelize = require('sequelize');
const mysql = require('mysql2');

const connection = new Sequelize('todo_list', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

connection
  .authenticate()
  .then(() => {
    console.log('Successfully connected to the database!!');
  })
  .catch(err => {
    console.error('Unable to connect to the database', err);
  });

  module.exports = connection;