import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { useAuthFetch } from "../../infrastructure/useAuthFetch";
import { API_BASE_URL } from "../../config/apiConfig";
import { logout } from "../../domain/authService";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user, setUser, setAccessToken } = useContext(AuthContext);
  const authFetch = useAuthFetch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchAdminVideos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/videos?sort=newest`);
      if (!res.ok) throw new Error("Failed to load videos");
      const data = await res.json();
      setVideos(data.data || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchAdminVideos();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    navigate("/");
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="access-denied-container">
        <div className="access-denied-card glass-container">
          <span className="denied-icon">🚫</span>
          <h1>Access Denied</h1>
          <p>You must be logged in as an administrator to access the dashboard.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddVideo = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const res = await authFetch(`${API_BASE_URL}/videos`, {
        method: "POST",
        body: JSON.stringify({ title, youtubeUrl }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create video card");
      }

      const data = await res.json();
      setSuccess("Video card created successfully!");
      setTitle("");
      setYoutubeUrl("");
      setVideos((prev) => [data.data, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await authFetch(`${API_BASE_URL}/videos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete video");
      }
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      alert(`Error deleting video: ${err.message}`);
    }
  };

  return (
    <div className="admin-page-wrapper">
      <Navbar />

      <main className="admin-main-container">
        <div className="admin-workspace">
          
          {/* Left Panel: Sidebar Admin Controls */}
          <aside className="admin-control-sidebar glass-container">
            <div className="sidebar-header">
              <span className="sidebar-icon">🛠️</span>
              <div>
                <h2 className="sidebar-title">Admin Controls</h2>
                <p className="sidebar-subtitle">User: {user.username}</p>
              </div>
            </div>

            <div className="admin-stats-box">
              <span className="stats-label">Total Videos in Catalog:</span>
              <span className="stats-value">{videos.length}</span>
            </div>

            {/* Post Video Form */}
            <div className="sidebar-form-container">
              <h3 className="sidebar-section-heading">Post New Resource</h3>
              
              {error && <div className="admin-alert error-alert">⚠️ {error}</div>}
              {success && <div className="admin-alert success-alert">✓ {success}</div>}

              <form className="admin-sidebar-form" onSubmit={handleAddVideo}>
                <div className="form-group">
                  <label htmlFor="video-title">Video Title</label>
                  <input
                    id="video-title"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Intro to Data Structures"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="video-url">YouTube Link</label>
                  <input
                    id="video-url"
                    type="url"
                    className="form-input"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    disabled={submitting}
                  />
                </div>

                <button className="btn btn-primary submit-btn" type="submit" disabled={submitting}>
                  {submitting ? "Publishing..." : "Publish Video Card"}
                </button>
              </form>
            </div>
          </aside>

          {/* Right Panel: CMS Management Table */}
          <section className="admin-table-workspace glass-container">
            <div className="workspace-header">
              <h2 className="workspace-title">Content Management System</h2>
              <p className="workspace-subtitle">Review, test, or delete active library cards</p>
            </div>

            {loadingVideos ? (
              <div className="loading-state">
                <div className="loader"></div>
                <p>Loading database collection...</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📁</span>
                <p>No videos available. Post a video using the control panel to start building the catalog.</p>
              </div>
            ) : (
              <div className="cms-table-wrapper">
                <table className="cms-table">
                  <thead>
                    <tr>
                      <th className="th-thumb">Preview</th>
                      <th className="th-title">Video Details</th>
                      <th className="th-date">Published Date</th>
                      <th className="th-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.map((video) => (
                      <tr key={video._id} className="cms-row">
                        <td className="td-thumb">
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="cms-thumbnail"
                          />
                        </td>
                        <td className="td-details">
                          <div className="cms-video-title" title={video.title}>
                            {video.title}
                          </div>
                          <div className="cms-video-metadata">
                            <span className="metadata-badge">YouTube ID: {video.youtubeId}</span>
                          </div>
                        </td>
                        <td className="td-date">
                          {new Date(video.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="td-actions">
                          <div className="actions-button-group">
                            <a
                              href={video.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-action btn-view"
                              title="Watch on YouTube"
                            >
                              🔗 View
                            </a>
                            <button
                              className="btn-action btn-delete-row"
                              onClick={() => handleDeleteVideo(video._id)}
                              title="Delete catalog card"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
