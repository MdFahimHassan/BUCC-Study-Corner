import React from "react";
import "./VideoCard.css";

export default function VideoCard({ video, isAdmin, onDelete }) {
  return (
    <div className="video-card glass-container animate-fade-in">
      <a
        href={video.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="thumbnail-link"
      >
        <div className="thumbnail-wrapper">
          <img src={video.thumbnailUrl} alt={video.title} className="video-thumbnail" />
          <div className="play-overlay">
            <span className="play-icon">▶</span>
          </div>
        </div>
      </a>
      <div className="video-info">
        <a
          href={video.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="title-link"
        >
          <h3 className="video-title" title={video.title}>{video.title}</h3>
        </a>
        <div className="video-footer">
          <span className="video-date">
            {new Date(video.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          {isAdmin && (
            <button
              className="btn-delete"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(video._id);
              }}
              title="Delete video"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
