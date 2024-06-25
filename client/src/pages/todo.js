import React from "react";
import "../styles/todo.css";

const Todo = ({ todo, onDelete }) => {
  console.log(todo.completed);
  const handleDelete = () => {
    onDelete(todo._id);
  };

  return (
    <div className="todo-item">
      <input type="checkbox" />
      <style jsx>{`
        .todo-item {
          padding: 10px;
          border-bottom: 1px solid #ccc;
          margin: 10px 0;
        }

        .todo-item:last-child {
          border-bottom: none;
        }

        .todo-item h3 {
          margin: 0;
          font-size: 20px;
          text-decoration: ${todo.completed ? "line-through" : "none"};
        }

        .todo-item pre {
          margin: 0;
          font-size: 14px;
          color: #555;
        }

        .todo-item span {
          
          cursor: pointer;
        }

        .todo-item span:hover {
          
          background-color:rgba(255,0,0,0.9);
        }

        span.delete{
        background-color:red;
        color:white;
        width:50px;
        border-radius:5px;}

        
      `}</style>

      <h3>{todo.title}</h3>
      <pre>{todo.description}</pre>
      <span className="delete"onClick={handleDelete}>delete</span>
    </div>
  );
};

export default Todo;
