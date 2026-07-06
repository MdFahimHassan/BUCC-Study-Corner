import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { logout } from "../../domain/authService";
import "./Navbar.css";

export default function Navbar() {
  const { user, setUser, setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text glow-text">BUCC Study Corner</span>
        </Link>
        <div className="navbar-auth">
          {user ? (
            <div className="user-profile">
              <span className="user-name">Hi, {user.username}</span>
              {user.role === "admin" ? (
                <div className="admin-nav-group">
                  <Link to="/admin" className="btn admin-btn-highlight admin-btn">
                    Admin Dashboard ▾
                  </Link>
                  <div className="admin-dropdown">
                    <button className="dropdown-logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button className="btn btn-danger logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="navbar-link login-link">Login</Link>
              <Link to="/register" className="btn btn-primary signup-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
