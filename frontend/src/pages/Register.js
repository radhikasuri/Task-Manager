import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apipath";
import "./Register.css";
import welcomeBackground from "../assets/bg.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { name, email, password };

    try {
      // --- API CALL ---
      const { data } = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        payload
      );
      console.log(data);

      navigate('/login');

    } catch (err) {
  console.error("Signup error:", err.response?.data || err.message);

  const message =
    err.response?.data?.message ||
    err.response?.data?.error ||
    err.response?.data?.msg ||
    err.message ||
    "Something went wrong. Please try again.";

  setError(message);
}
  };

  return (
    <div className="signup-container">
      {/* LEFT SIDE */}
      <div
        className="welcome-side"
         style={{
          backgroundImage: `url(${welcomeBackground})`,
        }}
      >
        <div className="welcome-overlay">
          <div className="welcome-logo">
            Task Manager
          </div>

          <div className="welcome-content">
            <h2>Hello Friend!</h2>
            <p>Join Task Manager community by creating an account</p>
          </div>

          <div className="login-prompt-left">
            <p>
              Already have an account? |{" "}
              <Link to="/login" className="login-hyperlink">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="form-side">

        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          {/* Error display */}
          {error && <p className="error-message">{error}</p>}

          <div className="form-row">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (min 6 characters)"
              required
            />
            <button
              type="button"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
