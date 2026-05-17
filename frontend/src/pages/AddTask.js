import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_PATHS } from "../api/apipath";
import "./AddTask.css";

function AddTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  // Fetch task (fixed with useCallback)
  const fetchTask = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        API_PATHS.TASK.GET_TASK_BY_ID(id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const task = res.data;

      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate
          ? task.dueDate.split("T")[0]
          : "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to fetch task");
    }
  }, [id]);

  // useEffect fixed
  useEffect(() => {
    if (isEditMode) {
      fetchTask();
    }
  }, [fetchTask, isEditMode]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isEditMode) {
        await axios.put(
          API_PATHS.TASK.UPDATE_TASK(id),
          formData,
          config
        );
      } else {
        await axios.post(
          API_PATHS.TASK.CREATE_TASK,
          formData,
          config
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task-container">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <h2>
          {isEditMode ? "Edit Task" : "Create Task"}
        </h2>

        {/* Title */}
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter task description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Due Date */}
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Task"
            : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default AddTask;