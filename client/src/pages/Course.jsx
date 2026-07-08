import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadVideos } from "../lib/videos";

export default function Course() {
  const { id } = useParams(); // Grabs the ID from the URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      const videos = await loadVideos();
      // Find the specific course by matching the ID
      const found = videos.find((v) => v.id.toString() === id.toString());
      setCourse(found);
      setLoading(false);
    }
    fetchCourse();
  }, [id]);

  if (loading) return <div className="p-10">Loading course...</div>;
  if (!course) return <div className="p-10">Course not found.</div>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-6 block">
        ← Back to Home
      </Link>
      
      <h1 className="text-4xl font-black">{course.title}</h1>
      
      <div className="mt-4 text-gray-600 space-y-2">
        <p><strong>Category:</strong> {course.category}</p>
        {course.instructor && <p><strong>Instructor:</strong> {course.instructor}</p>}
      </div>
      
      <p className="mt-6 text-lg leading-relaxed">{course.description}</p>

      {/* Video Embed Section */}
      <div className="mt-10 aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          className="w-full h-full"
          // This converts standard YouTube links into embeddable links
          src={course.url.replace("watch?v=", "embed/")}
          title={course.title}
          allowFullScreen
        />
      </div>
    </div>
  );
}