import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadVideos } from "../lib/videos";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Load data when the page opens
  useEffect(() => {
    async function init() {
      const data = await loadVideos();
      setVideos(data);
    }
    init();
  }, []);

  // Filter logic
  const filtered = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Study Corner</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search courses..."
        className="border p-2 rounded mb-6 w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((video) => (
            <div key={video.id} className="border p-4 rounded-xl shadow-sm">
              <h2 className="font-bold text-lg">{video.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{video.description}</p>
              
              <button
                onClick={() => navigate(`/course/${video.id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Open Course
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
}