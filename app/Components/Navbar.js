"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();
  const [title, setTitle] = useState('Computer Engineer');

  useEffect(() => {
    const titles = ['Computer Engineer', 'Fullstack Developer'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % titles.length;
      setTitle(titles[index]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  const getActiveClass = (path) => {
    // Special case for root path to avoid '/' matching everything
    if (path === "/") {
      return pathname === "/" ? "text-blue-500" : "hover:text-blue-500";
    }
    return pathname.startsWith(path) ? "text-blue-500" : "hover:text-blue-500";
  };
  return (
    <div className='p-3 flex justify-between'>
      <div className='font-bold text-3xl flex items-center'>
        <div className='text-sky-300'>Eaman |</div>
        <div
          key={title}
          className='text-xl text-center pt-1 text-blue-400 fade-in'
        >
          {title}
        </div>
      </div>
      <div className='flex gap-5'>
        <Link href="/" className={`${getActiveClass("/")}`}>Home</Link>
        <Link href="/project" className={`${getActiveClass("/project")}`}>Project</Link>
        <Link href="/about" className={`${getActiveClass("/about")}`}>About</Link>
        <Link href="/contact" className={`${getActiveClass("/contact")}`}>Contact me</Link>
        <Link href="/services" className={`${getActiveClass("/services")}`}>Services</Link>
      </div>
    </div>
  )
}

export default Navbar