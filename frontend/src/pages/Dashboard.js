import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API_PATHS } from "../api/apipath";
import TaskCard from "../components/TaskCard";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  // Search from navbar/outlet
  const context = useOutletContext();
  const search = context ? context.search : "";

  // Fetch tasks
 const fetchMyTasks = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await axios.get(API_PATHS.TASK.GET_TASKS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("TASK RESPONSE:", res.data);

    setTasks(res.data); // IMPORTANT
  } catch (error) {
    console.error(error);
    setError("Failed to load tasks");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchMyTasks();
  }, []);

  // Delete task from UI
 const handleTaskDelete = (taskId) => {
  setTasks((prev) => prev.filter((t) => t._id !== taskId));
};

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Filter + Search
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") {
      return matchesSearch && task.completed;
    }

    if (filter === "pending") {
      return matchesSearch && !task.completed;
    }

    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="dashboard-container">
        <p className="loading">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>{error}</p>

          <button onClick={fetchMyTasks}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* TOP BAR */}
      <div className="dashboard-topbar">
        <h2>My Tasks</h2>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* TOOLBAR */}
      <div className="dashboard-toolbar">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-dropdown"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <button
          className="add-task-btn"
          onClick={() => navigate("/dashboard/addtask")}
        >
          + Add Task
        </button>
      </div>

      {/* TASK LIST */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleTaskDelete}
              isOwner={true}
            />
          ))
        ) : (
          <div className="no-tasks">
            <p>No tasks found.</p>

            <button
              className="create-task-btn"
              onClick={() => navigate("/dashboard/addtask")}
            >
              Create Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;