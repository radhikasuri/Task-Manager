const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
     dueDate: {
  type: Date,
  validate: {
    validator: function (value) {
      return !value || value >= new Date().setHours(0, 0, 0, 0);
    },
    message: "Due date cannot be in the past",
  },
},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);