import React, { Component } from 'react';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import uuid from 'uuid';
import axios from 'axios';
import './App.css';

class App extends Component {
// Originally, the IDs used for the each todo, where placed in a static way, but since for this
// application example, what we want is to add more todo items to the todo list, we need a way
// to generate IDs and add them to the id value. The solution used for this, is using the uuid 
// library.
  state = {
    /* This is the original static state of the component, before using http request to fill the todos.
    todos: [
      {
        id: uuid.v4(),
        title: 'Take out the trash.',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Talk to your lady.',
        completed: true
      },
      {
        id: uuid.v4(),
        title: 'Finish the ReactJS Crash course.',
        completed: false
      }
    ]
    */

    todos: []
  }

    componentDidMount() {
      axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
    } 

    // One important thing with the arrow functions in React, is that it is not required to
    // use the .bind method when calling the function.
    markComplete = (id) => {
      // Remember that to change the state of the component, use this.setState() as a function.
      this.setState({
        todos: this.state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
          }
          return todo;
        })
      });
    }

    delTodo = (id) => {
      // This is called the filter method to clean array states.
      /* Commenting section to be replaced by axios logic.
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      }); */
      axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
    }

    addTodo = (title) => {
      /* Commenting section to replace it for the http request/response implementation with axios.
      // This is where the new title gets added to the state obj.
      const newTodo = {
        id: uuid.v4(),
        title,
        completed: false
      }
      // Using the spread operator to create a copy and add the state.
      this.setState({
        todos: [...this.state.todos, newTodo]
      });
      */
      axios.post('http://jsonplaceholder.typicode.com/todos?_limit=10', {
        title,
        completed: false
      }).then(
        res => this.setState({
          todos: [...this.state.todos, res.data]
        })
      );
    }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                {/* This is the section where the Todos component is included within the App component */}
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />  
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>    
        </div>
      </Router>
    );
  }
}

export default App;
