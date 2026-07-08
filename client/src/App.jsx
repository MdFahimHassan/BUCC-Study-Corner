import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Course from './pages/Course.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import { clearSession, getSession, saveSession } from './lib/auth.js';

function ProtectedRoute({ children, role }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'admin' && session.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (role === 'user' && !['user', 'admin'].includes(session.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState(getSession());
  const navigate = useNavigate();

  const handleLogin = (event, userRole) => {
    event.preventDefault();

    if (userRole === 'admin') {
      if (email === 'admin@bucc.com' && password === 'studycorner') {
        saveSession('admin');
        setSession(getSession());
        setError('');
        navigate('/admin');
        return;
      }

      setError('Invalid admin credentials.');
      return;
    }

    if (email && password) {
      saveSession('user');
      setSession(getSession());
      setError('');
      navigate('/dashboard');
      return;
    }

    setError('Please enter both email and password.');
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar session={session} onLogout={handleLogout} />
      <main className="min-h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/course/:id" element={<Course />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <Login
                onLogin={handleLogin}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                error={error}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
