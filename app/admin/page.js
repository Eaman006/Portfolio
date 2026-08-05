'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BsShieldCheck, 
  BsFolderSymlinkFill, 
  BsEnvelopeFill, 
  BsGearFill, 
  BsBoxArrowRight,
  BsClockHistory,
  BsPersonBadgeFill,
  BsActivity
} from 'react-icons/bs';
import { MdOutlineSecurity, MdOutlineCleaningServices, MdDashboard } from 'react-icons/md';
import AnimatedBackground from '@/app/Components/AnimatedBackground';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginTime, setLoginTime] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Check tab-session storage (strictly expires when user closes the admin page tab/window)
      const tabSession = sessionStorage.getItem('admin_session');
      if (!tabSession) {
        router.replace('/admin/login');
        return;
      }

      // 2. Verify server-side session cookie
      try {
        const res = await fetch('/api/admin/verify');
        const data = await res.json();

        if (res.ok && data.authenticated) {
          setIsAuthenticated(true);
          setAdminUser(data.user);
          const storedTime = sessionStorage.getItem('admin_login_time');
          if (storedTime) {
            setLoginTime(new Date(parseInt(storedTime)).toLocaleTimeString());
          } else {
            setLoginTime(new Date().toLocaleTimeString());
          }
        } else {
          sessionStorage.removeItem('admin_session');
          router.replace('/admin/login');
        }
      } catch (error) {
        console.error('Session verification error:', error);
        sessionStorage.removeItem('admin_session');
        router.replace('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('admin_session');
        sessionStorage.removeItem('admin_login_time');
      }
      router.replace('/admin/login');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col items-center gap-4 bg-gray-900/80 p-8 rounded-2xl border border-blue-500/30 backdrop-blur-md">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-300 font-medium">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white p-4 sm:p-8 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 home-fade-in">
        
        {/* Top Navbar Header */}
        <header className="bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 text-2xl">
              <BsPersonBadgeFill />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">Admin Control Center</h1>
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                  Verified Admin
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-0.5">
                Logged in as <span className="text-sky-300 font-medium">{adminUser?.email || 'eamanadeep006@gmail.com'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Session Active (Expires on Tab Close)</span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-950/70 hover:bg-red-900 border border-red-500/40 hover:border-red-500 text-red-300 hover:text-white px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all duration-200 shadow-md"
            >
              <BsBoxArrowRight className="text-base" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Navigation Tabs */}
        <div className="flex gap-3 border-b border-gray-800 pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: MdDashboard },
            { id: 'projects', label: 'Projects', icon: BsFolderSymlinkFill },
            { id: 'messages', label: 'Messages', icon: BsEnvelopeFill },
            { id: 'services', label: 'Services', icon: MdOutlineCleaningServices },
            { id: 'security', label: 'Security & Session', icon: MdOutlineSecurity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-900/60 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                <Icon />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-gray-900/80 border border-blue-500/30 rounded-2xl p-5 backdrop-blur-md hover:border-blue-400 transition-all shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Active Projects</p>
                <h3 className="text-3xl font-extrabold text-white mt-1">6</h3>
              </div>
              <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                <BsFolderSymlinkFill className="text-xl" />
              </div>
            </div>
            <p className="text-xs text-blue-400/80 mt-4 flex items-center gap-1">
              <span>● Live on portfolio</span>
            </p>
          </div>

          <div className="bg-gray-900/80 border border-blue-500/30 rounded-2xl p-5 backdrop-blur-md hover:border-blue-400 transition-all shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Contact Inquiries</p>
                <h3 className="text-3xl font-extrabold text-white mt-1">4</h3>
              </div>
              <div className="p-3 bg-sky-500/20 text-sky-400 rounded-xl">
                <BsEnvelopeFill className="text-xl" />
              </div>
            </div>
            <p className="text-xs text-sky-400/80 mt-4 flex items-center gap-1">
              <span>● 2 unread messages</span>
            </p>
          </div>

          <div className="bg-gray-900/80 border border-blue-500/30 rounded-2xl p-5 backdrop-blur-md hover:border-blue-400 transition-all shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">System Status</p>
                <h3 className="text-xl font-bold text-emerald-400 mt-2">Operational</h3>
              </div>
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <BsActivity className="text-xl" />
              </div>
            </div>
            <p className="text-xs text-emerald-400/80 mt-4 flex items-center gap-1">
              <span>● Next.js App Router v15</span>
            </p>
          </div>

          <div className="bg-gray-900/80 border border-blue-500/30 rounded-2xl p-5 backdrop-blur-md hover:border-blue-400 transition-all shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Session Started</p>
                <h3 className="text-lg font-bold text-sky-300 mt-2">{loginTime || 'Just now'}</h3>
              </div>
              <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                <BsClockHistory className="text-xl" />
              </div>
            </div>
            <p className="text-xs text-purple-300/80 mt-4 flex items-center gap-1">
              <span>● Ephemeral session</span>
            </p>
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="bg-black/70 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BsShieldCheck className="text-blue-400" />
                  Admin Controls & Overview
                </h2>
                <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-lg">
                  Environment: Production Ready
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Security Box */}
                <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-sky-300 flex items-center gap-2">
                    <MdOutlineSecurity />
                    Security Configuration
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Credentials are set safely via server environment settings. Admin credentials are protected and never sent to client bundles.
                  </p>
                  <div className="pt-2 text-xs font-mono text-gray-400 bg-black/60 p-3 rounded-lg border border-gray-800 space-y-1">
                    <div>ADMIN_EMAIL = <span className="text-emerald-400">eamanadeep006@gmail.com</span></div>
                    <div>SESSION_TYPE = <span className="text-emerald-400">Tab Lifetime (sessionStorage + Cookie)</span></div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                    <BsGearFill />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <Link
                      href="/project"
                      className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-medium text-center text-gray-300 hover:text-white transition-all"
                    >
                      View Live Projects
                    </Link>
                    <Link
                      href="/contact"
                      className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-medium text-center text-gray-300 hover:text-white transition-all"
                    >
                      Test Contact Form
                    </Link>
                    <Link
                      href="/services"
                      className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-medium text-center text-gray-300 hover:text-white transition-all"
                    >
                      Manage Services
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-3 bg-red-950/50 hover:bg-red-900/60 border border-red-800/50 rounded-xl text-xs font-medium text-center text-red-300 hover:text-white transition-all"
                    >
                      End Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Project Manager</h2>
              <p className="text-gray-400 text-sm">
                View and manage portfolio showcase items and details.
              </p>
              <div className="p-4 bg-gray-950/70 border border-gray-800 rounded-xl text-sm text-gray-300">
                You currently have 6 active showcase items in your portfolio.
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Contact Submissions</h2>
              <p className="text-gray-400 text-sm">
                Messages sent via the website contact form will appear here.
              </p>
              <div className="p-4 bg-gray-950/70 border border-gray-800 rounded-xl text-sm text-gray-300">
                No new unread submissions at this time.
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Services Configuration</h2>
              <p className="text-gray-400 text-sm">
                Manage fullstack engineering & computer science services offerings.
              </p>
              <div className="p-4 bg-gray-950/70 border border-gray-800 rounded-xl text-sm text-gray-300">
                Services listing is active.
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Security & Session Expiration</h2>
              <div className="p-4 bg-gray-950/70 border border-gray-800 rounded-xl space-y-2 text-sm text-gray-300">
                <p><span className="text-blue-400 font-semibold">Session Isolation:</span> Bound to the current browser tab (`sessionStorage`).</p>
                <p><span className="text-blue-400 font-semibold">Expiration Rule:</span> Closing the admin page tab or browser window terminates the active session.</p>
                <p><span className="text-blue-400 font-semibold">Environment Protection:</span> Admin credentials are configured in `.env.local`.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
