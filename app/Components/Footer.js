import React from 'react'
import { FcCallback } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full bg-black text-white py-1 md:py-2'>
      <div className='text-center text-xs md:text-sm mb-1'>Developed by Eaman</div>
      <div className='flex flex-wrap justify-center items-center gap-2 md:gap-4 lg:gap-6 text-xs'>
        <div className='flex items-center'>
          <span className='mr-1'><FcCallback /></span>
          <a href="tel:+91933070391" className='hover:text-gray-300 transition-colors'>+91 933070391</a>
        </div>
        <div className='flex items-center'>
          <span className='mr-1 text-blue-400'><FaLinkedin /></span>
          <a href="https://www.linkedin.com/in/md-eaman-adeep-219628278" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300 transition-colors'>
            <span className='hidden sm:inline'>Md Eaman Adeep</span>
            <span className='sm:hidden'>LinkedIn</span>
          </a>
        </div>
        <div className='flex items-center'>
          <span className='mr-1'><FaGithub /></span>
          <a href="https://github.com/Eaman006" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300 transition-colors'>
            GitHub
          </a>
        </div>
        <div className='flex items-center'>
          <span className='mr-1 text-red-400'><SiGmail /></span>
          <a href="mailto:eamanadeep006@gmail.com" className='hover:text-gray-300 transition-colors hidden sm:inline'>
            eamanadeep006@gmail.com
          </a>
          <a href="mailto:eamanadeep006@gmail.com" className='hover:text-gray-300 transition-colors sm:hidden'>
            Email
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
