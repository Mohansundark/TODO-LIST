const Todo = require("../models/itemModel");

// Get all todos of the authenticated user
const getAll = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
};

// Get a todo item by title
const getTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await Todo.find({
      user: req.userId,
      title: { $regex: title, $options: "i" },
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json( todo);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todo" });
  }
};

// Mark a todo item as completed
const markAsCompleted = async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.userId },
      { completed: true, completedAt: Date.now() },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Error marking todo as completed" });
  }
};

// Post a new todo
const postItem = async (req, res) => {
  console.log(req.userId, req.body.title, req.body.description);
  try {
    if (!req.userId) {
      console.log("No id");
    }
    // Validate request body
    if (!req.body.title || !req.body.description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const { title, description } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
      user: req.userId,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error creating todo" });
  }
};

// Update a todo item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description },
      { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error updating todo" });
  }
};

// Delete a todo item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      user: req.userId,
    });
    if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
};

module.exports = {
  getAll,
  getTitle,
  postItem,
  updateItem,
  deleteItem,
  markAsCompleted,
};
