import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apipath";
import "./TaskCard.css";

function TaskCard({
  task,
  onDelete,
  showActions = true,
  isOwner = false,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  // Check overdue
  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date();

  const handleToggleComplete = async () => {
    try {
      await axiosInstance.put(
        API_PATHS.TASK.UPDATE_TASK(task._id),
        {
          completed: !task.completed,
        }
      );

      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      setIsDeleting(true);

      await axiosInstance.delete(
        API_PATHS.TASK.DELETE_TASK(task._id)
      );

      onDelete(task._id);

    } catch (error) {
      console.error(error);
      alert("Delete failed");

    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/addtask/${task._id}`);
  };

  return (
    <div
      className={`task-card ${
        isOverdue ? "overdue-task" : ""
      }`}
    >
      <div className="task-card-header">
        <h3>{task.title}</h3>

        <span
          className={
            task.completed
              ? "task-status completed"
              : isOverdue
              ? "task-status overdue"
              : "task-status pending"
          }
        >
          {task.completed
            ? "Completed"
            : isOverdue
            ? "Overdue"
            : "Pending"}
        </span>
      </div>

      <p className="task-description">
        {task.description || "No description provided"}
      </p>

      {task.dueDate && (
        <p className="due-date">
          Due:{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      {showActions && isOwner && (
        <div className="task-actions">
          <button onClick={handleToggleComplete}>
            {task.completed
              ? "Mark Pending"
              : "Mark Completed"}
          </button>

          <button
            className="edit-btn"
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskCard;