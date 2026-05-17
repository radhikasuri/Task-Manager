const Task = require("../models/Task");

// GET TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user._id,
    }).sort({ _id: -1 });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      completed: false,
      userId: req.user._id,
    });
    if (req.body.dueDate) {
  const due = new Date(req.body.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (due < today) {
    return res.status(400).json({
      message: "Due date cannot be in the past",
    });
  }
}

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

// GET SINGLE TASK
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        msg: "Task not found",
      });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        dueDate: req.body.dueDate,
      },
      { new: true }
    );
  
    if (!task) {
      return res.status(404).json({
        msg: "Task not found",
      });
    }
    if (req.body.dueDate) {
  const due = new Date(req.body.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (due < today) {
    return res.status(400).json({
      message: "Due date cannot be in the past",
    });
  }
}

    res.json(task);

  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        msg: "Task not found",
      });
    }

    res.json({
      msg: "Task deleted",
    });

  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};