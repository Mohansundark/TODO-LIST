import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Welcome from "../pages/welcome";
import Todo from "../pages/todo";
import '../styles/Home.css';

const Home = () => {
  const [data, setData] = useState({ data1: null, data2: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
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
  }, []);

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
