import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from "react-icons/fa";
import { IoGlobe } from "react-icons/io5";

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-800 w-full p-4'>
      <div className='font-bold text-sky-400 text-2xl'>Projects</div>
      <div className='flex justify-center items-center'>
        <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
          arrow_circle_left
        </span>

        <div className='flex overflow-x-auto gap-5 mx-2 px-2'>

          <div className='m-2 p-2 w-sm bg-[#00000073] rounded-xl flex-shrink-0'>
            <div className='m-2 p-2'>
              <div className='font-bold text-xl'>Task Manager</div>
              <div className='m-2'><Image src="/task-manager.png" width={300} height={400} alt='campus'></Image></div>
              <div className='m-2 text-lg font-bold'>Features</div>
              <ul className='m-2 h-51'>
                <li>Effectively Plan your daily task and Goals.</li>
                <li>Realtime Monitoring your Tasks.</li>
                <li>Graph to keep track on your progress.</li>

              </ul>
              <div className='flex justify-center bottom-5'>
                <div className='m-2'>
                  <Link href="https://github.com/Eaman006/Task-Manager.git" className='bg-blue-600 p-2 flex rounded-lg'><span className='m-1'><FaGithub /></span>Github</Link>
                </div>
                <div className='m-2'>
                  <Link href="https://task-manager-livid-phi.vercel.app/" className='bg-red-600 p-2 flex rounded-lg'><IoGlobe className='my-1' />Website</Link>
                </div>
              </div>

            </div>
          </div>

          <div className='m-2 p-2 w-sm bg-[#00000073] rounded-xl flex-shrink-0'>
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
              <div className='flex justify-center'>
                <div className='m-2'>
                  <Link href="https://github.com/Eaman006/Campus-Navigator.git" className='bg-blue-600 p-2 flex rounded-lg'><span className='m-1'><FaGithub /></span>Github</Link>
                </div>
                <div className='m-2'>
                  <Link href="https://campus-navigator-five.vercel.app/" className='bg-red-600 p-2 flex rounded-lg'><IoGlobe className='my-1' />Website</Link>
                </div>
              </div>

            </div>
          </div>

          <div className='m-2 p-2 w-sm bg-[#00000073] rounded-xl flex-shrink-0'>
            <div className='m-2 p-2'>
              <div className='font-bold text-xl'>Url Flix</div>
              <div className='m-2'><Image src="/url.png" width={300} height={400} alt='campus'></Image></div>
              <div className='m-2 text-lg font-bold'>Features</div>
              <ul className='m-2 h-51'>
                <li>🔗Make short Url for free</li>
                <li>🛜No signup Required</li>
              </ul>
              <div className='flex justify-center bottom-5'>
                <div className='m-2'>
                  <Link href="https://github.com/Eaman006/URLfix.git" className='bg-blue-600 p-2 flex rounded-lg'><span className='m-1'><FaGithub /></span>Github</Link>
                </div>
                <div className='m-2'>
                  <Link href="https://ur-lfix.vercel.app" className='bg-red-600 p-2 flex rounded-lg'><IoGlobe className='my-1' />Website</Link>
                </div>
              </div>

            </div>
          </div>
          <div className='m-2 p-2 w-sm bg-[#00000073] rounded-xl flex-shrink-0'>
            <div className='m-2 p-2'>
              <div className='font-bold text-xl'>Todo App</div>
              <div className='m-2'><Image src="/todo.png" width={300} height={400} alt='campus'></Image></div>
              <div className='m-2 text-lg font-bold'>Features</div>
              <ul className='m-2 h-51'>
                <li>🗃️Manage Your Todos very effectively</li>
                <li>🎙️ Use voice Typing to save your Todos</li>
              </ul>
              <div className='flex justify-center'>
                <div className='m-2'>
                  <Link href="https://github.com/Eaman006/TodoAPP.git" className='bg-blue-600 p-2 flex rounded-lg'><span className='m-1'><FaGithub /></span>Github</Link>
                </div>
                <div className='m-2'>
                  <Link href="https://todo-app-lac-phi-13.vercel.app/" className='bg-red-600 p-2 flex rounded-lg'><IoGlobe className='my-1' />Website</Link>
                </div>
              </div>

            </div>
          </div>
          <div className='m-2 p-2 w-sm bg-[#00000073] rounded-xl flex-shrink-0'>
            <div className='m-2 p-2'>
              <div className='font-bold text-xl'>Automatic Attendance System</div>
              <div className='m-2'><Image src="/attendance.png" width={180} height={400} alt='campus'></Image></div>
              <div className='m-2 text-lg font-bold'>Features</div>
              <ul className='m-2 h-51'>
                <li>Build Using OpenCV and face_recognition in Python</li>
                <li>Take Attendance precisely with date and time</li>

              </ul>
              <div className='flex justify-center'>
                <div className='m-2'>
                  <Link href="https://github.com/Eaman006/AutomaticAttendanceSystem.git" className='bg-blue-600 p-2 flex rounded-lg'><span className='m-1'><FaGithub /></span>Github</Link>
                </div>

              </div>

            </div>
          </div>
          <div className='m-2 p-2 w-sm bg-[#00000073] rounded-xl flex-shrink-0'>
            <div className='m-2 p-2'>
              <div className='font-bold text-xl'>Musico Player</div>
              <div className='m-2'><Image src="/musico.png" width={300} height={400} alt='campus'></Image></div>
              <div className='m-2 text-lg font-bold'>Features</div>
              <ul className='m-2 h-51'>
                <li>🔍 Search and Make playlist</li>
                <li>🎙️ Clear High Quality Audio</li>
                <li>🗺️ Stream music all over the world.</li>
                <li>📡 Enjoy Ads free music for free</li>
              </ul>
              <div className='flex justify-center'>
                <div className='m-2'>
                  <Link href="https://github.com/Eaman006/MusicoPlayer.git" className='bg-blue-600 p-2 flex rounded-lg'><span className='m-1'><FaGithub /></span>Github</Link>
                </div>
                <div className='m-2'>
                  <Link href="https://musico-player-sigma.vercel.app/" className='bg-red-600 p-2 flex rounded-lg'><IoGlobe className='my-1' />Website</Link>
                </div>
              </div>

            </div>

          </div>

        </div>
        <span class="material-symbols-outlined" style={{ fontSize: '48px' }}>
          arrow_circle_right
        </span>

      </div>

    </div>
  )
}

export default page
