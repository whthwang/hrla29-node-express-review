const express = require('express');
const path = require('path'); //middleware that we need to include
const parser = require('body-parser'); //middleware that we need to include
const db = require('../database/index.js')//sets up the connection to the db
const todo_list = require('../database/models.js');
const routes = require('./routes.js');


//path and parser are middleware that express uses


const app = express();
const port = 3000;

//now lets use middleware
app.use(parser.json()); //this parser will take things coming in and make it json
//req.body, req.query, req.params are all json now thanks to parser
app.use(parser.urlencoded({ extended: true })); //just remember that this needs to be there.

app.use(express.static(path.resolve(__dirname, '../static'))); //this needs to connect where bundle.js is
//because this is ES5 and not ES6. you need to connect to ES5 in order for it to render.

app.use('/api', routes); //app.use is for the middleware


//the three below are tests to check that our end points work

app.get('/api/todoList', (req, res) => { //trying to get inside of our end pt
  console.log('I AM IN GET LOL -----------------');
  const { listName } = req.query;
  todo_list.Todo.findAll({
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
  })

app.post('/api/todoList', (req, res) => {
  console.log('I AM IN POST LOL +++++++++++++++++');
  const { todo, listName } = req.body
  todo_list.Todo.create({ todo, listName })
    .then(() => {
      res.status(201).send('post successful');
    })
    .catch(err => {
      res.status(404).send('Post failed', err)
    })
})

app.delete('/api/todoList', (req, res) => {
  console.log('I AM IN DELETE LOL -----------------');
  const { id } = req.query; //this one will be query
  todo_list.Todo.destroy({
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
})














app.listen(port, () => console.log(`yo man ur server works rn at ${port}`))
