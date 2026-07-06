import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/authContext";
import { useAuthFetch } from "../../infrastructure/useAuthFetch";
import { API_BASE_URL } from "../../config/apiConfig";
import VideoCard from "../../components/VideoCard/VideoCard";
import Navbar from "../../components/Navbar/Navbar";
import "./Videos.css";

export default function Videos() {
  const { user } = useContext(AuthContext);
  const authFetch = useAuthFetch();

  const [videos, setVideos] = useState([]);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/videos?sort=${sort}`);
      if (!res.ok) throw new Error("Failed to fetch videos from server");
      const data = await res.json();
      setVideos(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [sort]);

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
    <div className="videos-page-wrapper">
      <Navbar />
      <div className="videos-page-container">
        <main className="videos-main-content">
        <header className="hero-section">
          <h1 className="hero-title">Expand Your Knowledge</h1>
          <p className="hero-subtitle">
            Explore curated educational resources, tutorials, and seminars at <span className="glow-text">BUCC Study Corner</span>.
          </p>
        </header>

        <section className="controls-section glass-container">
          <div className="controls-container">
            <span className="results-count">
              {videos.length} {videos.length === 1 ? "Video" : "Videos"} Found
            </span>
            <div className="sort-wrapper">
              <label htmlFor="sort-select" className="sort-label">Sort By:</label>
              <select
                id="sort-select"
                className="form-select sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title: A to Z</option>
                <option value="title-desc">Title: Z to A</option>
              </select>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Curating list...</p>
          </div>
        ) : error ? (
          <div className="error-container glass-container">
            <span className="error-icon">⚠️</span>
            <p className="error-message">{error}</p>
            <button className="btn btn-primary" onClick={fetchVideos}>Retry</button>
          </div>
        ) : videos.length === 0 ? (
          <div className="empty-container glass-container">
            <span className="empty-icon">📂</span>
            <p>No educational videos posted yet.</p>
            {user && user.role === "admin" && (
              <p className="admin-tip">Go to your dashboard to add videos!</p>
            )}
          </div>
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                isAdmin={user && user.role === "admin"}
                onDelete={handleDeleteVideo}
              />
            ))}
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
