const connection = require('./index.js');
const Sequelize = require('sequelize');

const Todo = connection.define('todos', {
  todo: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  listName: {
    type: Sequelize.STRING(50),
    // allowNull defaults to true
    allowNull: false
  }
}, { timestamps: false});

connection.sync({ force: false });

module.exports.Todo = Todo;