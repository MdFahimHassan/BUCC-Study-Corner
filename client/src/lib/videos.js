const STORAGE_KEY = 'study-corner-videos';

const fallbackVideos = [
  {
    id: '1',
    title: 'Problem Solving with Data Structures',
    description: 'A practical walkthrough of core data structure techniques and examples for interviews.',
    category: 'Algorithms',
    duration: '18 min',
    instructor: 'BUCC Mentors',
    url: 'https://www.youtube.com/watch?v=8hly31xKli0'
  },
  {
    id: '2',
    title: 'React Architecture for Modern UIs',
    description: 'Learn how to structure components, state, and reusable logic in a clean, future-proof way.',
    category: 'Frontend',
    duration: '24 min',
    instructor: 'Nadia',
    url: 'https://www.youtube.com/watch?v=DLX62G4lc44'
  },
  {
    id: '3',
    title: 'Database Design Basics',
    description: 'Build a strong mental model for schemas, relationships, and efficient queries.',
    category: 'Database',
    duration: '16 min',
    instructor: 'Rafi',
    url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
  }
];

export function getVideos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return fallbackVideos;
  }

  try {
    const parsed = JSON.parse(stored);
    return parsed.length ? parsed : fallbackVideos;
  } catch {
    return fallbackVideos;
  }
}

export function saveVideos(videos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}
