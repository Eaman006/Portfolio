import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-800 w-full'>
      <div>
        <div className='text-2xl m-2 p-2 text-sky-400 font-bold'>Educational Qualifications</div>
        <div className='m-2 p-2'>
          <div className='text-xl font-bold'>B.Tech in Computer Science and Engineering</div>
          <div className='flex gap-2'>
            <Image src="/logo.jpeg" width={50} height={50} alt='logo'></Image>
            <div className='m-1'>
              <div>Vellore Institute of Technology (VIT), Bhopal</div>
              <div>Year: 2023-2027</div>
            </div>            
          </div>
          <div className='mt-5 text-xl font-bold'>
            Higher Secondary (PCMB)
          </div>
          <div className='flex gap-2'>
            <Image src="/slogo.jpg" width={70} height={70} alt='logo'></Image>
            <div>
              <div>Board: CBSE</div>
              <div>B.D.M.International</div>
              <div>Year: 2021-2023</div>
            </div>
            
          </div>
          <div className='mt-5 font-bold text-xl'>
            Secondary Schooling
          </div>
          <div className='flex gap-2'>
            <Image src="/slogo.jpg" width={70} height={70} alt='logo'></Image>
            <div>
              <div>Board: CBSE</div>
              <div>B.D.M.International</div>
              <div>Year: 2009-2021</div>
            </div>
            
          </div>
          

          
          
          
        </div>
      </div>      
    </div>
  )
}

export default page
