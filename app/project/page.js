import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";
import { IoGlobe } from "react-icons/io5";
import { getProjects } from '@/lib/projects';

export const revalidate = 0; // Dynamic rendering so edits in admin update immediately

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className='bg-gradient-to-b from-gray-800 w-full p-4 min-h-[85vh]'>
      <div className='font-bold text-sky-400 text-2xl mb-4'>Projects</div>
      <div className='flex justify-center items-center'>
        <span className="material-symbols-outlined text-gray-400 select-none cursor-pointer" style={{ fontSize: '48px' }}>
          arrow_circle_left
        </span>

        <div className='flex overflow-x-auto gap-5 mx-2 px-2 py-2 max-w-full scrollbar-thin'>
          {projects.map((proj) => (
            <div key={proj.id} className='m-2 p-2 w-80 sm:w-88 bg-[#00000073] border border-gray-800/60 rounded-xl flex-shrink-0 flex flex-col justify-between hover:border-blue-500/40 transition-all'>
              <div className='m-2 p-2 flex flex-col h-full justify-between'>
                <div>
                  <div className='font-bold text-xl text-white mb-2'>{proj.title}</div>
                  <div className='m-2 relative w-full h-48 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center border border-gray-800'>
                    <Image
                      src={proj.image || '/project.png'}
                      alt={proj.title}
                      fill
                      className="object-contain p-1"
                      unoptimized={proj.image?.startsWith('http')}
                    />
                  </div>
                  <div className='m-2 text-lg font-bold text-sky-300'>Features</div>
                  <ul className='m-2 text-sm text-gray-200 space-y-1 h-40 overflow-y-auto'>
                    {proj.features && proj.features.map((feat, idx) => (
                      <li key={idx} className="leading-relaxed">{feat}</li>
                    ))}
                  </ul>
                </div>

                <div className='flex justify-center gap-3 mt-4 pt-3 border-t border-gray-800/80'>
                  {proj.github && (
                    <Link
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 flex items-center gap-1.5 rounded-lg font-semibold text-sm transition-all'
                    >
                      <FaGithub />
                      <span>Github</span>
                    </Link>
                  )}
                  {proj.website && (
                    <Link
                      href={proj.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='bg-red-600 hover:bg-red-500 text-white px-3 py-2 flex items-center gap-1.5 rounded-lg font-semibold text-sm transition-all'
                    >
                      <IoGlobe />
                      <span>Website</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <span className="material-symbols-outlined text-gray-400 select-none cursor-pointer" style={{ fontSize: '48px' }}>
          arrow_circle_right
        </span>
      </div>
    </div>
  );
}
