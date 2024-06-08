import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Welcome = () => {
  // Get the username from the location state
  const location = useLocation();
  const { username } = location.state || {};

  // State to store the username
  const [storedUsername, setStoredUsername] = useState("");

  useEffect(() => {
    // Check if the username is available in local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setStoredUsername(storedUsername);
    } else if (username) {
      // If username is provided in location state, store it in local storage
      localStorage.setItem("username", username);
      setStoredUsername(username);
    }
  }, [username]);

  return (
    <div className="Welcome">
      <h1>Welcome, {storedUsername}!</h1>
      <p>This is your personalized welcome page.</p>
    </div>
  );
};

export default Welcome;
