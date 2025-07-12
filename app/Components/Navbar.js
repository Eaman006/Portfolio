"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();
  const getActiveClass =(path)=>{
    return pathname === path? 'text-blue-500':'hover:text-blue-500';
  }
  return (
    <div className='p-3 flex justify-between'>
      <div className='font-bold text-3xl flex items-center'>
        <div className='text-sky-300'>Eaman |</div>
        <div className='text-xl text-center pt-1 text-blue-400'>Computer Engineer</div>
      </div>
      <div className='flex gap-5'>
        <Link href="/" className={`${getActiveClass("/")}`}>Home</Link>
        <Link href="/services" className={`${getActiveClass("/services")}`}>Services</Link>
        <Link href="/about" className={`${getActiveClass("/about")}`}>About</Link>
        <Link href="/contact" className={`${getActiveClass("/contact")}`}>Contact me</Link>
        
      </div>

    </div>
  )
}

export default Navbar
