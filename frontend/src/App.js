import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* CREATE TASK */}
      <Route path="/dashboard/addtask" element={<AddTask />} />

      {/* EDIT TASK */}
      <Route path="/dashboard/addtask/:id" element={<AddTask />} />
    </Routes>
  );
}

export default App;