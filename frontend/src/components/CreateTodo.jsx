import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateTodo({ addTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();  // Use navigate hook

  const handleAddTodo = () => {
    const newTodo = { title, description };
    addTodo(newTodo);
    navigate("/todos");  // Navigate to /todos after adding a new todo
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h2>                     Todo Application</h2>
      <input
        style={{width: 800, padding: 10, margin: 10 }}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        style={{ width: 800,padding: 10, margin: 10 }}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button style={{ padding: 10, margin: 10 }} onClick={handleAddTodo}>
        Add a todo
      </button>


    </div>
  );
}
