import React, { useState } from 'react';
import { ArrowLeft, Sparkles, KeyRound, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('⚡ Access Denied: Please fill out all authentication gates.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate interactive authentication delay flow
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Demo Login Initiated:', { email, password });
      navigate('/admin'); // Move smoothly to admin view on demo click
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0c1d] bg-[radial-gradient(#1f1d3a_1px,transparent_1px)] [background-size:20px_20px] flex flex-col items-center justify-center p-4 font-sans text-white select-none">
      
      {/* Back Button with hover sliding animation */}
      <button 
        onClick={() => navigate('/')} 
        className="group flex items-center gap-2 text-gray-400 hover:text-[#5ce1e6] transition-all duration-300 mb-8 text-xs font-bold tracking-widest uppercase cursor-pointer"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Back to Study Corner
      </button>

      {/* Interactive Main Form Container */}
      <div className="relative w-full max-w-md group/card">
        {/* Pulsing colored glow backdrop layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7c83fd] to-[#fbc5b3] rounded-2xl translate-x-2 translate-y-2 opacity-60 group-hover/card:translate-x-2.5 group-hover/card:translate-y-2.5 transition-transform duration-300 -z-10 blur-[2px]"></div>
        
        {/* Structural Form Wrapper Card */}
        <div className="w-full bg-[#161527] border border-[#2b2a42] rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-md">
          
          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#f3d371] animate-bounce duration-1000">
              <Sparkles size={20} />
            </div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-[#b19ffa] via-[#ecb09d] to-[#fbc5b3] bg-clip-text text-transparent drop-shadow-md">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-xs mt-2 tracking-wide font-medium">
              Sign in to unleash your administrative dashboard power.
            </p>
          </div>

          {/* Validation Alert Box */}
          {error && (
            <div className="mb-6 p-3 bg-red-950/40 border border-red-500/50 rounded-xl text-red-400 text-xs font-semibold text-center tracking-wide animate-shake">
              {error}
            </div>
          )}

          {/* Form Content Block */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field with internal icon placement */}
            <div className="space-y-2">
              <label className="block text-xs font-black tracking-widest text-gray-300 uppercase pl-1">
                Email Address
              </label>
              <div className="relative group/input">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-[#7c83fd] transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#0d0c1d] border border-[#2d2c45] rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-[#7c83fd] focus:ring-2 focus:ring-[#7c83fd]/20 transition-all duration-300 font-medium"
                />
              </div>
            </div>

            {/* Password Field with internal icon placement */}
            <div className="space-y-2">
              <label className="block text-xs font-black tracking-widest text-gray-300 uppercase pl-1">
                Password
              </label>
              <div className="relative group/input">
                <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-[#7c83fd] transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0d0c1d] border border-[#2d2c45] rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-[#7c83fd] focus:ring-2 focus:ring-[#7c83fd]/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Premium Button Action with loading time-flow sequence */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative overflow-hidden bg-[#f3d371] hover:bg-[#f5da87] text-[#0d0c1d] font-black text-xs tracking-widest uppercase py-4 rounded-xl border border-black shadow-[0_4px_14px_rgba(243,211,113,0.3)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 cursor-pointer group/btn"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-[#0d0c1d] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Sign In'
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            </button>
          </form>

          {/* Registration Helper Footer link */}
          <div className="text-center mt-8 text-xs text-gray-400 font-medium">
            New to Study Corner?{' '}
            <button 
              onClick={() => console.log('Redirecting registration')} 
              className="text-[#5ce1e6] hover:text-[#42cfd4] hover:underline font-extrabold tracking-wide transition-colors"
            >
              Create an account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;