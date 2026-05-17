const express = require("express");
const router = express.Router();
const {auth }= require("../middleware/authMiddleware");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/taskController");

// Protected routes
router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.get('/:id',auth,getTask)
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;