import React, { Component } from "react";
import axios from "axios";
import ListEntry from "./ListEntry.jsx";


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      todos: [],
      listName: "Todos"
    };
    this.fetchTodos = this.fetchTodos.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  //WE ALWAYS NEED THIS SHIT HERE just questionable that we need to fetch todos tho???????
  componentDidMount() {
    this.fetchTodos();
  }
  
  //////////////////////////we can use axios instead of ajax to make a get or post request
  fetchTodos() {
    axios
    //anything that's gonna be sent is gonna be sent through params
      .get('/api/todoList', { params: { listName: this.state.listName }})
      .then(({ data }) => { //can destructure here and need to console log it out to see what we are dealing with
        console.log(data)
        this.setState({
          todos: data
        })
      })
      .catch(err => console.log(err));      
  }

  handleInput(e) {
    this.setState({
      todo: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { todo, listName } = this.state;
    axios
      .post('/api/todoList', {todo, listName})
      .then(() => this.fetchTodos())
      .catch(err => console.log('error posting ', err))

    e.target.reset();
  }

  deleteTodo(id) {
    axios
    //always need params for delete and gets under axios because it comes back under req.query
      .delete('/api/todoList', { params: {id}}) 
      .then(() => this.fetchTodos())
      .catch(err => console.log('error deleting', err))
  }

  render() {
    return (
      <div>
        <h1>{this.state.listName}</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          Add Todo: <input onKeyUp={this.handleInput} />
        </form>
        <br />
        <div>
          {this.state.todos.map((todo, index) => {
            return <ListEntry key={index} todo={todo.todo} id={todo.id} delete={this.deleteTodo} />
          }
          )}
        </div>
      </div>
    );
  }
}

export default List;
