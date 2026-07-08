import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen, BrainCircuit, Code2, Search, Sparkles, Zap } from 'lucide-react';
import Category from '../components/Category.jsx';
import VideoCard from '../components/VideoCard.jsx';

const STORAGE_KEY = 'study-corner-videos';

const fallbackVideos = [
  {
    id: '1',
    title: 'DSA Crash Course: Arrays & Hashing',
    description: 'A fast, high-signal walkthrough of the most important patterns for interviews and problem solving.',
    category: 'Algorithms',
    duration: '18 min',
    instructor: 'BUCC Mentors',
    url: 'https://www.youtube.com/watch?v=0K7Q2YzZ8x0'
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

const categoryMeta = [
  { name: 'Algorithms', icon: BrainCircuit },
  { name: 'Frontend', icon: Code2 },
  { name: 'Database', icon: BookOpen },
  { name: 'Systems', icon: Zap }
];

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setVideos(parsed.length ? parsed : fallbackVideos);
      } catch {
        setVideos(fallbackVideos);
      }
    } else {
      setVideos(fallbackVideos);
    }
  }, []);

  useEffect(() => {
    if (videos.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    }
  }, [videos]);

  const categories = useMemo(() => {
    const unique = ['All', ...new Set(videos.map((video) => video.category))];
    return unique.map((name) => ({
      name,
      count: name === 'All' ? videos.length : videos.filter((video) => video.category === name).length,
      icon: name === 'All' ? Sparkles : categoryMeta.find((item) => item.name === name)?.icon || BookOpen
    }));
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
      const query = search.toLowerCase();
      const matchesSearch =
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.instructor.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, videos]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Premium study portal for BUCC members
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Learn faster with a{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
              curated resource experience
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Discover polished, high-signal video resources, explore smart categories, and keep every learning asset easy to find from a single modern dashboard.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/admin" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90">
              Add a resource
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#library" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200">
              Explore library
            </a>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-cyan-300">Live overview</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">Smart learning hub</h2>
            </div>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
              Online
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-2xl font-semibold text-white">{videos.length}</p>
              <p className="mt-1 text-sm text-slate-400">Resources</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-2xl font-semibold text-white">4</p>
              <p className="mt-1 text-sm text-slate-400">Topics</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-2xl font-semibold text-white">24/7</p>
              <p className="mt-1 text-sm text-slate-400">Access</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Explore by topic</h3>
            <p className="text-sm text-slate-400">Tailored learning routes</p>
          </div>
          <div className="space-y-3">
            {categories.map((item) => (
              <button key={item.name} onClick={() => setActiveCategory(item.name)} className="w-full text-left">
                <Category name={item.name} count={item.count} icon={item.icon} />
              </button>
            ))}
          </div>
        </div>

        <div id="library" className="glass-panel p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-cyan-300">Resource library</p>
              <h3 className="text-xl font-semibold text-white">Discover your next lesson</h3>
            </div>
            <label className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-400">
              <Search className="h-4 w-4" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search resources"
                className="w-full bg-transparent outline-none placeholder:text-slate-500"
              />
            </label>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {filteredVideos.length ? (
              filteredVideos.map((video) => <VideoCard key={video.id} video={video} />)
            ) : (
              <div className="md:col-span-2 rounded-3xl border border-dashed border-white/10 bg-slate-950/50 p-8 text-center text-slate-400">
                No resources matched your search. Try a different keyword or category.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}