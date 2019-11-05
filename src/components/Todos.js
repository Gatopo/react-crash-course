import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component {
    render() {
        return this.props.todos.map((todo) => (
            /* The reason the 'key' attribute is being used, is because it is required for an iteration of a map.
               This is done in order to avoid js errors. */
            <TodoItem key={todo.id} todo={ todo } markComplete={this.props.markComplete} delTodo={this.props.delTodo} />
        ));
    }
}
// PropTypes
Todos.propTypes = {
    /* The name is defined as 'todos' because that is the name that was used to pass the state of the App component
       to this component. */
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

export default Todos;
