import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  // State to store the logout status
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const fetchData = async () => {
    try {
      await axios.post("/api/user/logout"); // Call the logout endpoint
      setLoggedOut(true);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  useEffect(() => {
    if (loggedOut) {
      // Navigate to the home page after logging out
      navigate("/");
    }
  }, [loggedOut, navigate]); // Dependency array to run the effect when `loggedOut` or `navigate` changes

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
