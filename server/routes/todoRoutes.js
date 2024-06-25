const express = require("express");
const {
  getAll,
  getTitle,
  postItem,
  updateItem,
  deleteItem,
  markAsCompleted
} = require("../controller/todoController");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("Your are Authorized!!! \n Hello World from todo");
});

//get all todos of the user
Router.get("/all", getAll);

//get item by title
Router.post("/title", getTitle);

//post a new todo
Router.post("/post", postItem);

// update  a todo item by
Router.post("/update/:id", updateItem);

//delete a todo Item
Router.post("/delete/:id", deleteItem);

//mark a todo item as completed
Router.post("/completed/:id", markAsCompleted);

module.exports = Router;
