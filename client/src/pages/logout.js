import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.post("/api/user/logout");
        setLoggedOut(true);
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loggedOut) {
      navigate("/home");
    }
  }, [loggedOut, navigate]);

  return (
    <div>
      <h1>Logout Page</h1>
      {loggedOut ? (
        <div>
          <h2>Logged Out Successfully</h2>
          <p>You are now logged out.</p>
        </div>
      ) : (
        <p>Logging out...</p>
      )}
    </div>
  );
};

export default Logout;
