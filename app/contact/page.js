import React from 'react'

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-800 w-full p-4'>
      <div className='text-2xl font-bold'>Contact me</div>
      <div className='m-4 p-4 bg-gray-700 w-1/2 rounded-md shadow-black shadow-lg '>
        <form action="">
          <div className='text-lg my-2'>Name</div>
          <input className='bg-[#000000a2] rounded-lg w-2/3 h-10 px-2' type="text" placeholder='Enter your Name' />
          <div className='text-lg my-2'>Email</div>
          <input className='bg-[#000000a2] rounded-lg w-2/3 h-10 px-2' type="text" placeholder='Enter your Email' />
          <div className='text-lg my-2'>Contact No.(optional)</div>
          <input className='bg-[#000000a2] rounded-lg w-2/3 h-10 px-2' type="text" placeholder='Enter your Contact number' />
          <div className='text-lg my-2'>Message</div>
          <textarea className='bg-[#000000a2] rounded-lg w-2/3 h-20 px-2' type="text" placeholder='Enter your Message' />
          <div className='flex gap-5 m-2 p-2'>
            <button className='bg-blue-600 p-3 font-bold rounded-xl'>Submit</button>
            <button  className='bg-red-600 p-3 font-bold rounded-xl'>Reset</button>
          </div>

        </form>
      </div>
      
    </div>
  )
}

export default page
