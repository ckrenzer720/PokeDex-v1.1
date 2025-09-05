import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Create user object
    const userData = {
      name: formData.username,
      email: formData.email,
      username: formData.username,
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.username)}&background=3b4cca&color=ffcb05&size=200`,
      sub: `local|${Date.now()}`
    };

    // Call the login handler
    onLogin(userData);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Trainer Login</h2>
          <p>Enter your details to access your PokéDex</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Trainer Name:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your trainer name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Start Adventure!
          </button>
        </form>

        <div className="login-footer">
          <p>No account needed - just enter your details to get started!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
