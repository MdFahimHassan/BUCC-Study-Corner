import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { login } from "../../domain/authService";
import "./Login.css";

export default function Login() {
  const { setAccessToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { accessToken, user } = await login(email, password);
      localStorage.setItem("token", accessToken);
      setAccessToken(accessToken);
      setUser(user);

      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-back-link">
        <Link to="/">← Back to Study Corner</Link>
      </div>

      <div className="auth-card glass-container animate-fade-in">
        <h1 className="auth-title glow-text">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to access your dashboard</p>

        {error && (
          <div className="auth-error-alert animate-fade-in">
            <span>⚠️</span> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button className="btn btn-primary auth-submit-btn" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          New to Study Corner? <Link to="/register" className="auth-link">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
