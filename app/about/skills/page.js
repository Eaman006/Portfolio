import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-800 w-full p-4'>
      <div className=' text-2xl text-sky-400 font-bold'>Skills</div>
      <div className='m-2 p-2 font-bold text-xl'>Technical Skills</div>
      <div className='m-2 p-2'>
        <Image src="/python.png" width={50} height={50} alt='python'></Image>                
      </div>
      <div className='m-2 p-2'>
        <Image src="/c++.png" width={50} height={50} alt='c++'></Image>                
      </div>
      <div className='m-2 p-2'>
        <Image src="/java.png" width={50} height={50} alt='java'></Image>                
      </div>
      <div className='m-2 p-2'>
        <Image src="/html.png" width={50} height={50} alt='html'></Image>                
      </div>
      <div className='m-2 p-2'>
        <Image src="/css.png" width={50} height={50} alt='css'></Image>                
      </div>
      <div className='m-2 p-2'>
        <Image src="/javas.png" width={50} height={50} alt='javas'></Image>                
      </div><div className='m-2 p-2'>
        <Image src="/react.png" width={50} height={50} alt='react'></Image>                
      </div>
      <div className='m-2 p-2'>
        <Image src="/next.jpeg" width={50} height={50} alt='next'></Image>                
      </div>
      
    </div>
  )
}

export default page
