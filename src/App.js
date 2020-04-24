import React, { useState, useCallback, useEffect } from 'react';


/* const App = () => {
  const [name, setName] = useState('Sebas119');
  const onNameChange = useCallback((event) => {
    setName(event.target.value)
  }, [])
  return (
    <div>
      <form>
        <label>Enter your name:</label>
        <input
          type="text"
          value={name}
          onChange={onNameChange} />
      </form>
      <h1>{name}</h1>
    </div>
  );
} */

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value)
  }, []);
  const formSubmited = useCallback((event) => {
    event.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        content: newTodo,
        done: false,
      },
    ]);
    setNewTodo('');
  }, [newTodo, todos]);

  const addTodo = useCallback((todo, index) => (event) => {
    const newTodos = todos.slice();
    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    });
    setTodos(newTodos)
  }, [todos])

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos])

  const markAllDone = useCallback(() => {
    const newTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
      };
    })
    setTodos(newTodos)
  }, [todos]);

  useEffect(() => {
    console.log('todos', todos);
  }, [todos]);
  return (
    <div>
      <form onSubmit={formSubmited}>
        <label htmlFor="newTodo">Enter a To-Do:</label>
        <input
          id="newTodo"
          type="text"
          value={newTodo}
          autoFocus
          onChange={onNewTodoChange} />
        <button>Add Todo</button>
      </form>
      <button onClick={markAllDone}>Mark all done</button>
      <ul>
        {todos.map((todo, index) => (

          <li key={todo.id}>
            <input
              value={todo.checked}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
