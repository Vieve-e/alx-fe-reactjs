import React, { useState } from 'react';

const initialTodos = [
  { id: 1, text: 'Learn Coding', completed: false },
  { id: 2, text: 'Build Projects', completed: false },
  { id: 3, text: 'Do laundry', completed: false },
];

const TodoList = () => {
    const [todos, setTodos] = useState(initialTodos);
  
    // Toggle the completion status of a todo
    const handleToggle = (id) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };
  
    // Delete a todo
    const handleDelete = (id) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };
  
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TodoList;