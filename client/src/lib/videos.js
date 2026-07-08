import {
  fetchVideos as apiFetchVideos,
  createVideo as apiCreateVideo,
  deleteVideo as apiDeleteVideo,
} from '../services/api.js';
import { getSession } from './auth.js';

/**
 * Static fallback data from your initial project files.
 * This ensures the UI works even if the backend is offline.
 */
export const FALLBACK_VIDEOS = [
  {
    id: 1,
    title: "React Basics",
    category: "Frontend",
    description: "Learn React fundamentals",
    url: "https://www.youtube.com/watch?v=SqcY0GlETPk"
  },
  {
    id: 2,
    title: "Linked List",
    category: "DSA",
    instructor: "Abdul Bari",
    description: "Complete linked list tutorial.",
    url: "https://www.youtube.com/watch?v=NobHlGUjV3g"
  },
  {
    id: 3,
    title: "SQL Basics",
    category: "Database",
    instructor: "FreeCodeCamp",
    description: "Learn SQL step by step.",
    url: "https://www.youtube.com/watch?v=HXV3zeQKqGY"
  }
];

/**
 * Returns the list of videos from the backend. 
 * Falls back to FALLBACK_VIDEOS if the request fails.
 */
export async function loadVideos() {
  try {
    const data = await apiFetchVideos();
    // Return API data if it exists, otherwise fallback
    return data && data.length > 0 ? data : FALLBACK_VIDEOS;
  } catch (error) {
    console.warn('Backend unreachable, using fallback data:', error.message);
    return FALLBACK_VIDEOS;
  }
}

/**
 * Creates a new video. Requires an authenticated admin session.
 */
export async function addVideo(video) {
  const session = getSession();
  if (!session?.token) {
    throw new Error('You must be signed in as an admin to publish resources.');
  }
  return apiCreateVideo(video, session.token);
}

/**
 * Deletes a video. Requires an authenticated admin session.
 */
export async function removeVideo(id) {
  const session = getSession();
  if (!session?.token) {
    throw new Error('You must be signed in as an admin to delete resources.');
  }
  return apiDeleteVideo(id, session.token);
}