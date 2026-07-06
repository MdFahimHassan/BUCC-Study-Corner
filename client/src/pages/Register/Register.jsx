import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { registerUser, login } from "../../domain/authService";
import "../Login/Login.css"; // Reuse login stylesheet

export default function Register() {
  const { setAccessToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        username,
        email,
        password,
        role: isAdmin ? "admin" : "user",
        adminSecret: isAdmin ? adminSecret : undefined,
      };

      // Register the user
      await registerUser(payload);

      // Auto login after successful registration
      const { accessToken, user } = await login(email, password);
      localStorage.setItem("token", accessToken);
      setAccessToken(accessToken);
      setUser(user);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
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
        <h1 className="auth-title glow-text">Join Study Corner</h1>
        <p className="auth-subtitle">Create an account to track your progress</p>

        {error && (
          <div className="auth-error-alert animate-fade-in">
            <span>⚠️</span> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="johndoe"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

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
            <label htmlFor="password">Password (min 6 characters)</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              id="isAdmin"
              type="checkbox"
              className="checkbox-input"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="isAdmin" className="checkbox-label">
              Register as Administrator
            </label>
          </div>

          {isAdmin && (
            <div className="form-group animate-fade-in">
              <label htmlFor="adminSecret">Admin Registration Secret Key</label>
              <input
                id="adminSecret"
                type="password"
                className="form-input"
                placeholder="Secret key provided by system"
                required={isAdmin}
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          <button className="btn btn-primary auth-submit-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
