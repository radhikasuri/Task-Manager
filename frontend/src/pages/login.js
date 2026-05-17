import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { API_PATHS } from "../api/apipath";
import "./login.css";
import welcomeBackground from "../assets/bg.jpeg";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function
  const [showPassword, setShowPassword] = useState(false);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call the login endpoint
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);

      
      login(data);

      // On success, navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      const message =
    err.response?.data?.message ||
    err.response?.data?.error ||
    err.response?.data?.msg ||
    err.message ||
    "Something went wrong. Please try again.";

  setError(message);
    } finally {
      setLoading(false);
    }
  };

  // --- THIS IS THE CORRECT, FULL RETURN STATEMENT ---
  return (
    <div className="login-container">
      {/* ===== LEFT HALF (LOGIN FORM) ===== */}
      <div className="form-side">
       

        <form onSubmit={handleSubmit}>
          <h2>Log in to your account</h2>

          {/* Display error messages */}
          {error && <p className="form-error">{error}</p>}

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
              placeholder="Enter password"
              required
            />
           <button
  type="button"
  className="eye-icon"
  onClick={() => setShowPassword((prev) => !prev)}
>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>


          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* ===== RIGHT HALF (WELCOME BACK) ===== */}
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
            <h2>Welcome Back!</h2>
            <p>Log in to your account</p>
          </div>
          <div className="signup-prompt">
            <p>
              Don't have an account? |{" "}
              <Link to="/signup" className="signup-hyperlink">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
