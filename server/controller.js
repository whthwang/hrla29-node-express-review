const db = require('../database/models.js');

module.exports = {
  get: (req, res) => {
    console.log('in get lmfao ---------')
    const { listName } = req.query;
    db.Todo.findAll({
      where: {
        listName: listName
      }
    }) //this is where we can have our specific conditions in our search
      .then(items => {
        if (items) {
          res.status(200).send(items); //.send will automatically stringify
        } else {
          res.status(204).send('No items found')
        }
      })
      .catch(err => {
        res.status(404).send('get failed');
      });
  },
  post: (req, res) => {
    console.log('in post--------')
    const { todo, listName } = req.body
    db.Todo.create({ todo, listName })
      .then(() => {
        res.status(201).send('post successful');
      })
      .catch(err => {
        res.status(404).send('Post failed', err)
      })
  },
  delete: (req, res) => {
    console.log('in delete -----------');
    const { id } = req.query; //this one will be query
    db.Todo.destroy({
      where: {
        id: id
      }
    })
      .then(() => {
        res.status(202).send('success deleting');
      })
      .catch(err => {
        res.status(404).send('delete failed');
      })
  }
}