import { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/to-do/all");
        setTodos(response.data);
        if (response.data.length === 0) {
          console.log("No todos found");
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {todo.title} <pre>{todo.description}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
