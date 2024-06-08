import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Welcome from "./welcome";
import ToDo from "./todo";
const Home = () => {
  const [data1, setData1] = useState(null); // State to store the fetched data
  const [data2, setData2] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("/get"); // Adjust the URL if your backend is running on a different port
      setData1(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await axios.get("/api/to-do/"); // Adjust the URL if your backend is running on a different port
      setData2(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData1();
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="Home">
      <h1>Home</h1>

      {/* Render logout button only if logged in */}
      {!data2 && data1 && (
        <div>
          <button className="button login_btn" onClick={handleLogin}>
            Login
          </button>
          <button className="button login_btn" onClick={handleSignup}>
            Signup
          </button>
          <h2>Fetched Data before logging in:</h2>
          {/* <pre>{JSON.stringify(data1, null, 2)}</pre> */}
        </div>
      )}
      {data2 && (
        <div>
          <Welcome />
          <ToDo/>
          <h2>Fetched Data after logging in:</h2>
          <button onClick={handleLogout}>Logout</button>
          {/* <pre>{JSON.stringify(data2, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
};

export default Home;
