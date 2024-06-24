// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogin, handleSignup, handleLogout }) => {
  return (
    <nav className="navbar">
      <h1>My App</h1>
      <div className="nav-buttons">
        {!isLoggedIn ? (
          <>
            <button className="button login_btn" onClick={handleLogin}>
              Login
            </button>
            <button className="button login_btn" onClick={handleSignup}>
              Signup
            </button>
          </>
        ) : (
          <button className="button login_btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
