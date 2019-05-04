const db = require('../database/models.js');

module.exports = {
  post: (req, res) => {
    console.log('IN POST');

    const { todo, listName } = req.body;

    db.Todo.create({ todo, listName })
    .then(() => {
      res.status(201).send('Success creating entry!');
    })
    .catch(err => {
      res.status(404).send('Error creating new entry', err);
    });
  },

  get: (req, res) => {
    console.log('IN GET');

    const { listName } = req.query;

    db.Todo.findAll({
      where: {
        listName: listName
      }
    })
    .then(items => {
      if (items) {
        res.status(200).send(items);
      } else {
        res.status(404).send('Items not found');
      }
    })
    .catch(err => {
      res.status(404).send('Error getting items', err);
    });
  },

  delete: (req, res) => {
    console.log('IN DELETE');

    const { index } = req.query;

    db.Todo.destroy({
      where: {
        id: index
      }
    })
    .then(() => {
      res.status(202).send('Success deleting item!');
    })
    .catch(err => {
      res.status(404).send('Error deleting item', err);
    });
  }

};