"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaClipboardList } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { BsTools } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
import { GiLaurelsTrophy } from "react-icons/gi";
import { useLoader } from './Loader';

const Sidebar = () => {
  const Pathname = usePathname();
  const { triggerLinkLoader } = useLoader();

  const getActiveClass=(path)=>{
    return path===Pathname? 'text-blue-500 bg-[#76767664] border-neutral-500 border':'hover:text-blue-500'
  }

  const handleLinkClick = () => {
    triggerLinkLoader();
  };

  return (
    <div className='bg-black h-[87vh]'>
      <div className='m-2 p-2 text-xl'>
        <div className={`my-5 ${getActiveClass("/about")}  rounded-full p-2`}>
          <Link href="/about" className='flex gap-1' onClick={handleLinkClick}><span className='mt-1'><FaClipboardList /></span>General</Link>
        </div>
        <div className={`my-5 ${getActiveClass("/about/education")} rounded-full p-2`}>
          <Link href="/about/education" className='flex gap-1' onClick={handleLinkClick}><span className='mt-1'><ImBooks /></span>Education</Link>
        </div>
        <div className={`my-5 ${getActiveClass("/about/skills")} rounded-full p-2`}>
          <Link href="/about/skills" className='flex gap-1' onClick={handleLinkClick}><span className='mt-1'><BsTools /></span>Skills</Link>
        </div>
        <div className={`my-5 ${getActiveClass("/about/certification")} rounded-full p-2`}>
          <Link href="/about/certification" className='flex gap-1' onClick={handleLinkClick}><span className='mt-1'><PiCertificateFill /></span>Certification</Link>
        </div>
        <div className={`my-5 ${getActiveClass("/about/achivements")} rounded-full p-2`}>
          <Link href="/about/achivements" className='flex gap-1' onClick={handleLinkClick}><span className='mt-1'><GiLaurelsTrophy /></span>Achievements</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
