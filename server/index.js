const express = require('express');
const path = require('path');
const parser = require('body-parser');

/*
Express: Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
*/

const db = require('../database/index.js');
const todo_list = require('../database/models.js');
const PORT = 3000;
//middlewares: https://medium.com/@agoiabeladeyemi/a-simple-explanation-of-express-middleware-c68ea839f498
const app = express();

app.use(parser.json());
//Parses the text as JSON and exposes the resulting object on req.body, req.query or req.params, depending on the type of request.

app.use(parser.urlencoded({ extended: true }));
/*Parses the text as URL encoded data (which is how browsers tend to send form data 
  from regular forms set to POST) and exposes the resulting object (containing the keys and values) 
  on req.body. */
app.use(express.static(path.resolve(__dirname, '../static')));

app.get('/api/todoList', (req, res) => {

  const { listName } = req.query;

  todo_list.Todo.findAll({
    where: {
      listName: listName
    }
  })
  .then(items => {
    if (items) {
      res.status(200).send('Success getting items!');
    } else {
      res.status(404).send('Items not found');
    }
  })
  .catch(err => {
    res.status(404).send('Error getting items', err);
  });
});

app.post('/api/todoList', (req, res) => {

  const { todo, listName } = req.body;

  todo_list.Todo.create({ todo, listName })
  .then(() => {
    res.status(201).send('Success creating entry!');
  })
  .catch(err => {
    res.status(404).send('Error creating new entry', err);
  });
});

app.delete('/api/todoList', (req, res) => {

  const { index } = req.query;

  todo_list.Todo.destroy({
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
});



app.listen(PORT, () => console.log('App is listening on: ', PORT));