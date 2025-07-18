import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from "react-icons/fa";

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-800 w-full p-4'>
      <div className='font-bold text-sky-400 text-2xl'>Projects</div>
      <div className='m-2 p-2 w-1/4 bg-[#00000073] rounded-xl'>
        <div className='m-2 p-2'>
          <div className='font-bold text-xl'>Campus Navigator</div>
          <div className='m-2'><Image src="/campus1.png" width={300} height={400} alt='campus'></Image></div>
          <div className='m-2 text-lg font-bold'>Features</div>
          <ul className='m-2'>
            <li>🔍 Search for Directions – Get the best path between buildings and rooms.</li>
            <li>🎙️ Voice-Based Navigation – Speak your query instead of typing.</li>
            <li>🗺️ Dynamic Floor Maps – Interactive SVG-based maps for easy navigation.</li>
            <li>📡 REST API Integration – Fetches real-time navigation paths from the backend.</li>
          </ul>
          <div className='m-2'>
            <Link href="https://github.com/Eaman006/Campus-Navigator.git" className='bg-blue-600 p-2 flex w-1/3 rounded-lg'><span className='m-1'><FaGithub /></span>Github</Link>
          </div>
        
        </div>
      </div>
           
    </div>
  )
}

export default page
