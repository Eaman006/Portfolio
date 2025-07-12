import React from 'react'
import Image from 'next/image'


const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-800 w-full'>
      <div className='m-2 p-2 text-3xl font-bold text-sky-300'>
        Md Eaman Adeep
      </div> 
      <ul className='mx-6 p-2'>
        <li>Gender: Male</li>
        <li>D.O.B: 01/01/2006</li>
        <li>Nationality: Indian</li>

      </ul>   
    </div>
  )
}

export default page
