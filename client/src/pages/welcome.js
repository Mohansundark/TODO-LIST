import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../hook/userContext";

const Welcome = () => {
  const location = useLocation();
  const { username: locationUsername } = location.state || {};
  const { username, setUsername } = useContext(UserContext);

  useEffect(() => {
    if (locationUsername) {
      setUsername(locationUsername);
    }
  }, [locationUsername, setUsername]);

  return (
    <div className="Welcome">
      <h1>Welcome, {username}!</h1>
      <p>This is your personalized welcome page.</p>
    </div>
  );
};

export default Welcome;
