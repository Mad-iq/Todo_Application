import React from 'react';

export function Todos({ todos, onComplete }) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo._id} className="todo-item">
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button
            className="button"
            onClick={() => onComplete(todo._id)}
            disabled={todo.completed}
          >
            {todo.completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}
