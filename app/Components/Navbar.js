"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdHome } from "react-icons/io";
import { RiComputerFill } from "react-icons/ri";
import { MdFindInPage, MdMenu, MdClose } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { BsDatabaseFillGear } from "react-icons/bs";
import { useLoader } from './Loader';

const Navbar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [title, setTitle] = useState('Computer Engineer');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { triggerLinkLoader } = useLoader();

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Title animation effect
  useEffect(() => {
    if (!isMounted) return;
    
    const titles = ['Computer Engineer', 'Fullstack Developer'];
    let index = 0;
    
    // Set initial title immediately
    setTitle(titles[0]);
    
    const interval = setInterval(() => {
      index = (index + 1) % titles.length;
      setTitle(titles[index]);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isMounted]);

  const getActiveClass = (path) => {
    // Special case for root path to avoid '/' matching everything
    if (path === "/") {
      return pathname === "/" ? "text-blue-500" : "hover:text-blue-500";
    }
    return pathname.startsWith(path) ? "text-blue-500" : "hover:text-blue-500";
  };

  const handleLinkClick = () => {
    triggerLinkLoader();
  };

  return (
    <div className='p-3 flex flex-col sm:flex-row justify-between relative z-50 bg-black'>
      <div className='flex justify-between items-center'>
        <Link href="/" className='font-bold text-3xl flex items-center' onClick={handleLinkClick}>
          <div className='text-sky-300'>Eaman |</div>
          {isMounted && (
            <div
              key={title}
              className='text-xl text-center pt-1 text-blue-400 fade-in'
            >
              {title}
            </div>
          )}
        </Link>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='sm:hidden text-gray-600 focus:outline-none'
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
      
      {/* Navigation Links */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:flex gap-5 mt-3 sm:mt-0`}>
        <Link href="/" className={`${getActiveClass("/")} flex gap-0.5`} onClick={handleLinkClick}><span className='m-1'><IoMdHome /></span>Home</Link>
        <Link href="/project" className={`${getActiveClass("/project")} flex gap-0.5`} onClick={handleLinkClick}><span className='m-1'><RiComputerFill /></span>Project</Link>
        <Link href="/about" className={`${getActiveClass("/about")} flex gap-0.5`} onClick={handleLinkClick}><span className='m-1'><MdFindInPage /></span>About</Link>
        <Link href="/contact" className={`${getActiveClass("/contact")} flex gap-0.5`} onClick={handleLinkClick}><span className='m-1'><IoCall /></span>Contact me</Link>
        <Link href="/services" className={`${getActiveClass("/services")} flex gap-0.5`} onClick={handleLinkClick}><span className='m-1'><BsDatabaseFillGear /></span>Services</Link>
      </div>
    </div>
  )
}

export default Navbar