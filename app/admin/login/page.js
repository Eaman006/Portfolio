'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdErrorOutline, MdArrowBack } from 'react-icons/md';
import { BsShieldLockFill } from 'react-icons/bs';
import AnimatedBackground from '@/app/Components/AnimatedBackground';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid credentials. Please try again.');
        setIsLoading(false);
        return;
      }

      // Store tab session indicator in sessionStorage (cleared when browser tab/window closes)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin_session', 'active');
        sessionStorage.setItem('admin_login_time', Date.now().toString());
      }

      // Redirect to admin dashboard
      router.push('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please check your network and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center p-4 bg-gradient-to-b from-gray-900 via-black to-gray-950 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 shadow-2xl shadow-blue-600/20 home-fade-in">
        
        {/* Header Icon and Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40 mb-4 animate-pulse">
            <BsShieldLockFill className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Enter your credentials to access the management dashboard</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/60 border border-red-500/50 rounded-xl text-red-300 text-sm flex items-center gap-3 animate-shake">
            <MdErrorOutline className="text-xl text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-blue-400 text-xl">
                <MdEmail />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full bg-gray-950/80 text-white pl-11 pr-4 py-3 rounded-xl border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all duration-200 placeholder-gray-600 text-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-blue-400 text-xl">
                <MdLock />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-gray-950/80 text-white pl-11 pr-11 py-3 rounded-xl border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all duration-200 placeholder-gray-600 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-blue-400 transition-colors text-xl"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="text-xs text-gray-500 flex items-center justify-between">
            <span>🔒 Session expires when page is closed</span>
            <span className="text-blue-400/80">Protected Route</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-sky-500 via-blue-600 to-blue-700 hover:from-sky-400 hover:to-blue-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin</span>
            )}
          </button>
        </form>

        {/* Return to Home Link */}
        <div className="mt-8 pt-6 border-t border-gray-800/80 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors"
          >
            <MdArrowBack />
            <span>Return to Portfolio Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
