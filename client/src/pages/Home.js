import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Welcome from "../pages/welcome";
import Todo from "../pages/todo";
import "../styles/Home.css";

const Home = () => {
  const [data, setData] = useState({ data1: null, data2: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData1 = async () => {
    try {
      const response = await axios.get("/api/to-do/");
      console.log(response.data);
      if (response.data) {
        setData((prevData) => ({ ...prevData, data2: response.data }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/to-do/all");
      console.log(response.data);
      if (response.data) {
        setTodos(response.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchData1();
    fetchTodos();
  }, [todo]); // Depend on the todo state

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/logout");
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`/api/to-do/delete/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/to-do/post", todo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTodo({
        title: "",
        description: "",
      });
    } catch (error) {
      setError("Error creating todo. Please try again.");
      console.error("Error creating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Home">
      <h1>Home</h1>
      {!data.data2 ? (
        <>
          <button className="button login_btn" onClick={handleLogin}>
            Login
          </button>
          <button className="button login_btn" onClick={handleSignup}>
            Signup
          </button>
        </>
      ) : (
        <>
          <Welcome />
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Todo"}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
          {todos.map((todo) => (
            <Todo key={todo._id} todo={todo} onDelete={handleDelete} />
          ))}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Home;
