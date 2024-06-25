import React, { useState } from "react";
import axios from "axios";
// import '../styles/TodoForm.css';

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/to-do/post", todo);
      addTodo(response.data);
      setTodo({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={todo.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={todo.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
