import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          setTodos(json.todos);
        } else {
          throw new Error('Failed to fetch todos');
        }
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addTodo = (newTodo) => {
    fetch("http://localhost:3001/todo", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(async (res) => {
      if (res.ok) {
        const json = await res.json();
        setTodos([...todos, json.todo]);
        navigate("/todos");  
      } else {
        throw new Error('Failed to add todo');
      }
    })
    .catch(error => {
      console.error('Error adding todo:', error);
    });
  };

  const markAsComplete = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(async (res) => {
      if (res.ok) {
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, completed: true } : todo
        ));
      } else {
        throw new Error('Failed to update todo');
      }
    })
    .catch(error => {
      console.error('Error updating todo:', error);
    });
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<CreateTodo addTodo={addTodo} />} />
          <Route path="/todos" element={loading ? <p>Loading todos...</p> : <Todos todos={todos} onComplete={markAsComplete} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
