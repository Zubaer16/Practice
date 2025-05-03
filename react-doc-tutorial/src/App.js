import { useState } from 'react'
import AddTodo from './AddTodo.js'
import TaskList from './TaskList.js'

let nextId = 3
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
]

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos)

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false,
      },
    ])
  }

  function handleChangeTodo(nextTodo) {
    setTodos(
      todos.map((t) => {
        if (t.id === nextTodo.id) {
          return nextTodo
        } else {
          return t
        }
      })
    )

    // const todo = todos.find((t) => t.id === nextTodo.id)
    // todo.title = nextTodo.title
    // todo.done = nextTodo.done
  }

  function handleDeleteTodo(todoId) {
    setTodos(todos.filter((t) => t.id !== todoId))
    // const index = todos.findIndex((t) => t.id === todoId)
    // todos.splice(index, 1)
  }

  return (
    <>
      <AddTodo onAddTodo={handleAddTodo} />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  )
}
