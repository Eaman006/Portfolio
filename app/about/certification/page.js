import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-800 w-full p-4'>
      <div className='text-2xl font-bold text-sky-400'>Certifications</div>
      <div>
        <div className='flex m-2'>
          <Image src="/aws.png" width={100} height={100} alt='aws'></Image>
          <div> 
          <div className='m-2 font-bold'>AWS Certified Machine Learning - Natural Language Speciality</div>
          <div className='mx-4'>Issued on June 2025</div>
          <div className='mx-4'><span className='font-semibold'>Skills:</span> Amazon Web Services (AWS) · Machine Learning · Natural Language Processing (NLP) · AWS SageMaker</div>
          <div>
            
          </div>
          </div>        
        </div>
      </div>
      
    </div>
  )
}

export default page
