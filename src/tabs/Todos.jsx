import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

const LS_KEY = "todos";

export class Todos extends Component {
state = {
  todos: [],
  isEditing: false,
  currentTodo: {},
}
  componentDidMount() {
    const localData = JSON.parse(window.localStorage.getItem(LS_KEY))
    if (localData) {
      this.setState(() => ({
        todos: localData
      }))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      window.localStorage.setItem(LS_KEY, JSON.stringify(this.state.todos))
    }
  }

  handleSubmit = (e) => {
    const newTodo = { text: e, id: nanoid() }
    this.setState(({ todos }) => ({ todos: [...todos, newTodo] }))
  }

  handleDelete = (id) => {
    this.setState(prev => ({
      todos: prev.todos.filter(todo => todo.id !== id)
  }))
  }
  
  handleEdit = (todo) => {
    this.setState({
      isEditing: true,
      currentTodo: todo,
    })
  }

  render() {
    console.log(this.state.todos);
    const { todos, isEditing, currentTodo} = this.state;
    return (
    <>
        {isEditing ? <EditForm currentTodo={currentTodo } /> : <SearchForm onSubmit={this.handleSubmit} />}
        <Grid>{todos.map((todo, index )=> (
          
        <GridItem key={todo.id}>
            <Todo todo={todo} index={index + 1} onDelete={this.handleDelete} onEdit={this.handleEdit} />
</GridItem>
      ))}</Grid>
    </>)
  }
}
