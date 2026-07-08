import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin'; 

// Temporary shell placeholders for your teammates' pages so your router compiles safely
const HomePlaceholder = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#111122] text-white">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">Public Dashboard Placeholder</h1>
      <p className="text-gray-400 text-sm">Ahlam (Person 4) will link the viewer space here.</p>
    </div>
  </div>
);

const NavbarPlaceholder = () => (
  <nav className="w-full bg-[#1e1d30]/80 backdrop-blur-md border-b border-[#2b2a42] p-4 text-center text-xs text-gray-400 font-medium tracking-wider uppercase">
    Navbar Shell (Fahim - Person 3 is building this)
  </nav>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#111122] flex flex-col selection:bg-[#f3d371] selection:text-[#111122]">
        
        {/* Global Navigation Bar */}
        <NavbarPlaceholder /> 
        
        {/* Core Route Architecture */}
        <div className="flex-1 flex flex-col justify-center">
          <Routes>
            {/* Public Student Dashboard Link */}
            <Route path="/" element={<HomePlaceholder />} />
            
            {/* Your Space: Administrative Gatehouse */}
            <Route path="/login" element={<Login />} />
            
            {/* Your Space: Submission Control Panel */}
            <Route path="/admin" element={<Admin />} />

            {/* Fallback Catch-All Redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;