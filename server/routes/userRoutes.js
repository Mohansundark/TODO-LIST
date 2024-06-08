const express = require("express");
const { addUser, login, logout } = require("../controller/userController");
const Router = express.Router();

Router.post("/signup", addUser);
Router.post("/login", login);
Router.post("/logout", logout);
module.exports = Router;
