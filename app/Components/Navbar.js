import React from 'react'

const Navbar = () => {
  return (
    <div className='p-3 flex justify-between'>
      <div className='font-bold text-3xl flex items-center'>
        <div className='text-sky-300'>Eaman |</div>
        <div className='text-xl text-center pt-1 text-blue-400'>Computer Engineer</div>
      </div>
      <div className='flex gap-5'>
        <div>Home</div>
        <div>Services</div>
        <div>About</div>
        <div>Contact me</div>
        
      </div>

    </div>
  )
}

export default Navbar
