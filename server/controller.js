const db = require('../database/models.js');

module.exports = {
  post: (req, res) => {
    console.log('IN POST');
  },
  get: (req, res) => {
    console.log('IN GET');
  },
  delete: (req, res) => {
    console.log('IN DELETE');
  }
};