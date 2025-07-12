import React from 'react'
import { FcCallback } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <div className='fixed bottom-1 w-full bg-black'>
      <div className='text-center'>Developed by Eaman</div>
      <div className='flex justify-center gap-10'>
        <div className='flex'><span className='m-1'><FcCallback /></span><a href="tel:+91933070391">+91 933070391</a></div>
        <div className='flex'><span className='m-1'><FaLinkedin /></span><a href="https://www.linkedin.com/in/md-eaman-adeep-219628278">Md Eaman Adeep</a></div>
        <div className='flex'><span className='m-1'><FaGithub /></span><a href="https://github.com/Eaman006">Eaman006</a></div>
        <div className='flex'><span className='m-1'><SiGmail /></span><a href="mailto:eamanadeep006@gmail.com">eamanadeep006@gmail.com</a></div>        
      </div>
      
    </div>
  )
}

export default Footer
