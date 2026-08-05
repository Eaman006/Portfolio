'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BsShieldCheck, 
  BsFolderSymlinkFill, 
  BsEnvelopeFill, 
  BsGearFill, 
  BsBoxArrowRight,
  BsClockHistory,
  BsPersonBadgeFill,
  BsActivity,
  BsPencilSquare,
  BsTrashFill,
  BsPlusLg,
  BsXCircle,
  BsCheckCircleFill,
  BsCloudUploadFill
} from 'react-icons/bs';
import { MdOutlineSecurity, MdOutlineCleaningServices, MdDashboard, MdOutlineImage, MdOutlineEditNote } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import { IoGlobe } from 'react-icons/io5';
import AnimatedBackground from '@/app/Components/AnimatedBackground';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loginTime, setLoginTime] = useState('');

  // Projects State
  const [projects, setProjects] = useState([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  
  // Modals & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  
  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formGithub, setFormGithub] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Handle Image File Upload to /public/project-image
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setFormError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormImage(data.imagePath); // Sets image path e.g. /project-image/1723485_filename.png
      } else {
        setFormError(data.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      setFormError('Network error uploading image file');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Fetch projects from server API
  const fetchProjects = async () => {
    setIsProjectsLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success && data.projects) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setIsProjectsLoading(false);
    }
  };

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
          fetchProjects();
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

  // Open Create Modal
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedProjectId(null);
    setFormTitle('');
    setFormImage('');
    setFormFeatures('');
    setFormGithub('');
    setFormWebsite('');
    setFormError('');
    setIsModalOpen(true);
  };

  // Open Edit Modal by clicking on project name or edit button
  const openEditModal = (project) => {
    setModalMode('edit');
    setSelectedProjectId(project.id);
    setFormTitle(project.title || '');
    setFormImage(project.image || '');
    setFormFeatures(Array.isArray(project.features) ? project.features.join('\n') : (project.features || ''));
    setFormGithub(project.github || '');
    setFormWebsite(project.website || '');
    setFormError('');
    setIsModalOpen(true);
  };

  // Save Project (Create or Update)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Project title is required.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    const featuresArray = formFeatures
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const payload = {
      title: formTitle,
      image: formImage,
      features: featuresArray,
      github: formGithub,
      website: formWebsite,
    };

    try {
      let res;
      if (modalMode === 'create') {
        res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/projects/${selectedProjectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        fetchProjects();
      } else {
        setFormError(data.error || 'Failed to save project.');
      }
    } catch (err) {
      console.error('Error saving project:', err);
      setFormError('Network error while saving project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDeleteConfirmId(null);
        fetchProjects();
      }
    } catch (err) {
      console.error('Error deleting project:', err);
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

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 home-fade-in pb-20">
        
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
            { id: 'projects', label: `Projects (${projects.length})`, icon: BsFolderSymlinkFill },
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
          <div 
            onClick={() => setActiveTab('projects')}
            className="bg-gray-900/80 border border-blue-500/30 rounded-2xl p-5 backdrop-blur-md hover:border-blue-400 cursor-pointer transition-all shadow-xl group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Active Projects</p>
                <h3 className="text-3xl font-extrabold text-white mt-1 group-hover:text-blue-400 transition-colors">{projects.length}</h3>
              </div>
              <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                <BsFolderSymlinkFill className="text-xl" />
              </div>
            </div>
            <p className="text-xs text-blue-400/80 mt-4 flex items-center gap-1">
              <span>● Click to manage showcase projects</span>
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
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-medium text-center text-gray-300 hover:text-white transition-all"
                    >
                      Manage Projects ({projects.length})
                    </button>
                    <Link
                      href="/project"
                      target="_blank"
                      className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-medium text-center text-gray-300 hover:text-white transition-all"
                    >
                      View Live Portfolio
                    </Link>
                    <Link
                      href="/contact"
                      className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-medium text-center text-gray-300 hover:text-white transition-all"
                    >
                      Test Contact Form
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

          {/* PROJECTS MANAGEMENT SECTION */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BsFolderSymlinkFill className="text-blue-400" />
                    Portfolio Projects Management
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Click on any project name or edit button to update details, or delete projects directly.
                  </p>
                </div>

                <button
                  onClick={openCreateModal}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2 text-sm transition-all duration-200 transform active:scale-95"
                >
                  <BsPlusLg />
                  <span>Add New Project</span>
                </button>
              </div>

              {isProjectsLoading ? (
                <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-3 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading showcase projects...</span>
                </div>
              ) : projects.length === 0 ? (
                <div className="p-8 text-center bg-gray-950/60 border border-gray-800 rounded-xl text-gray-400">
                  No projects found. Click &quot;Add New Project&quot; to create one.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-gray-950/80 border border-gray-800 hover:border-blue-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-lg group relative overflow-hidden"
                    >
                      <div>
                        {/* Top Bar with clickable Name & Action buttons */}
                        <div className="flex justify-between items-start gap-2 mb-3">
                          <button
                            onClick={() => openEditModal(project)}
                            className="text-left font-bold text-lg text-white hover:text-sky-300 transition-colors group-hover:underline flex items-center gap-2"
                            title="Click project name to edit"
                          >
                            <span>{project.title}</span>
                            <BsPencilSquare className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => openEditModal(project)}
                              className="p-2 bg-blue-950/60 hover:bg-blue-900 border border-blue-500/40 text-blue-300 hover:text-white rounded-lg text-sm transition-all"
                              title="Edit Project"
                            >
                              <BsPencilSquare />
                            </button>

                            <button
                              onClick={() => setDeleteConfirmId(project.id)}
                              className="p-2 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-400 hover:text-white rounded-lg text-sm transition-all"
                              title="Delete Project"
                            >
                              <BsTrashFill />
                            </button>
                          </div>
                        </div>

                        {/* Image Preview */}
                        <div 
                          onClick={() => openEditModal(project)}
                          className="relative w-full h-36 bg-black/60 rounded-xl overflow-hidden mb-3 cursor-pointer border border-gray-800/80 group-hover:border-blue-500/30 transition-all flex items-center justify-center"
                        >
                          <Image
                            src={project.image || '/project.png'}
                            alt={project.title}
                            fill
                            className="object-contain p-2"
                            unoptimized={project.image?.startsWith('http')}
                          />
                        </div>

                        {/* Features preview */}
                        <div className="space-y-1 mb-4">
                          <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Features</p>
                          <ul className="text-xs text-gray-300 space-y-1 line-clamp-3">
                            {Array.isArray(project.features) && project.features.map((feat, idx) => (
                              <li key={idx} className="truncate">• {feat}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer Links */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-800 text-xs">
                        <div className="flex items-center gap-3">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              <FaGithub />
                              <span>GitHub</span>
                            </a>
                          )}
                          {project.website && (
                            <a
                              href={project.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <IoGlobe />
                              <span>Live Site</span>
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => openEditModal(project)}
                          className="text-xs text-blue-400 hover:text-sky-300 font-semibold transition-colors"
                        >
                          Edit Details &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

      {/* EDIT / CREATE PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-gray-950 border border-blue-500/40 rounded-2xl p-6 shadow-2xl text-white space-y-5">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BsPencilSquare className="text-blue-400" />
                <span>{modalMode === 'create' ? 'Add New Project' : 'Edit Project Details'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                <BsXCircle />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveProject} className="space-y-4">
              {/* Project Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Project Title *
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-blue-400 text-lg">
                    <MdOutlineEditNote />
                  </span>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Task Manager"
                    className="w-full bg-black/80 text-white pl-10 pr-4 py-2.5 rounded-xl border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>

              {/* Image Upload & URL */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Project Image
                  </label>
                  <label className="cursor-pointer bg-blue-900/60 hover:bg-blue-800 border border-blue-500/40 text-sky-300 hover:text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all">
                    <BsCloudUploadFill className="text-sm" />
                    <span>{isUploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="relative flex items-center">
                  <span className="absolute left-3 text-blue-400 text-lg">
                    <MdOutlineImage />
                  </span>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="e.g. /project-image/my-image.png or /task-manager.png"
                    className="w-full bg-black/80 text-white pl-10 pr-4 py-2.5 rounded-xl border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>

                <p className="text-[11px] text-gray-400 mt-1 flex items-center justify-between">
                  <span>📁 Uploaded images are saved to <code className="text-sky-300">/public/project-image/</code></span>
                  {formImage && <span className="text-emerald-400">Path set</span>}
                </p>

                {/* Live Image Preview Thumbnail */}
                {formImage && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-black/60 border border-gray-800 rounded-xl">
                    <div className="relative w-16 h-12 bg-black/40 rounded-lg overflow-hidden border border-gray-800 flex-shrink-0">
                      <Image
                        src={formImage}
                        alt="Preview"
                        fill
                        className="object-contain p-0.5"
                        unoptimized={formImage.startsWith('http')}
                      />
                    </div>
                    <div className="text-xs text-gray-300 truncate">
                      <span className="text-gray-500 block text-[10px]">Preview:</span>
                      <span className="font-mono text-sky-300">{formImage}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Features list */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Key Features (One feature per line)
                </label>
                <textarea
                  rows={4}
                  value={formFeatures}
                  onChange={(e) => setFormFeatures(e.target.value)}
                  placeholder="🔍 Search for Directions&#10;🎙️ Voice-Based Navigation&#10;🗺️ Interactive SVG Maps"
                  className="w-full bg-black/80 text-white p-3 rounded-xl border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-sans"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    GitHub Repository Link
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 text-base">
                      <FaGithub />
                    </span>
                    <input
                      type="url"
                      value={formGithub}
                      onChange={(e) => setFormGithub(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full bg-black/80 text-white pl-9 pr-3 py-2.5 rounded-xl border border-gray-800 focus:border-blue-500 outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Live Website Link
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-red-400 text-base">
                      <IoGlobe />
                    </span>
                    <input
                      type="url"
                      value={formWebsite}
                      onChange={(e) => setFormWebsite(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-black/80 text-white pl-9 pr-3 py-2.5 rounded-xl border border-gray-800 focus:border-blue-500 outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-xl text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <BsCheckCircleFill />
                      <span>{modalMode === 'create' ? 'Create Project' : 'Save Changes'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-gray-950 border border-red-500/40 rounded-2xl p-6 max-w-sm w-full text-white space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 bg-red-950/80 border border-red-500/50 rounded-full flex items-center justify-center mx-auto text-red-400 text-2xl">
              <BsTrashFill />
            </div>
            <h3 className="text-lg font-bold text-white">Delete Project?</h3>
            <p className="text-xs text-gray-400">
              Are you sure you want to delete this project? This action will remove it from the portfolio showcase.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/30"
              >
                Yes, Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
