import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-800 w-full p-4'>
      <div className=' text-2xl text-sky-400 font-bold'>Skills</div>
      <div className='flex'>
        <div>
          <div className='m-2 p-2 font-bold text-xl'>Technical Skills</div>
          <div className='flex gap-5 m-4'>
            <div className=''>
              <Image src="/python.png" width={50} height={50} alt='python'></Image>
              <div>Python</div>
            </div>
            <div className=''>
              <Image src="/c++.png" width={50} height={50} alt='c++'></Image>
              <div>C++</div>
            </div>

            <div className=''>
              <Image src="/java.png" width={50} height={50} alt='java'></Image>
              <div>Java</div>
            </div>
          </div>
          <div className='flex gap-5 m-4'>
            <div className=''>
              <Image src="/html.png" width={50} height={50} alt='html'></Image>
              <div>HTML</div>
            </div>
            <div className=''>
              <Image src="/css.png" width={50} height={50} alt='css'></Image>
              <div>CSS</div>
            </div>
            <div className=''>
              <Image src="/javas.png" width={50} height={50} alt='javas'></Image>
              <div>Javascript</div>
            </div>
          </div>
          <div className='flex gap-5 m-4'>
            <div className=''>
              <Image src="/react.png" width={50} height={50} alt='react'></Image>
              <div>React</div>
            </div>
            <div className=''>
              <Image src="/next.jpeg" width={50} height={50} alt='next'></Image>
              <div>Next.js</div>
            </div>
            <div className='m-2 p-2'>
              <Image src="/aws.png" width={50} height={50} alt='aws'></Image>
              <div>AWS</div>
            </div>
          </div>
          <div className='flex gap-5 m-4'>
            <div className=''>
              <Image src="/google-cloud.png" width={50} height={50} alt='gcp'></Image>
              <div>GCP</div>
            </div>
            <div className=''>
              <Image src="/ibm.png" width={50} height={50} alt='ibm'></Image>
              <div>IBM cloud</div>
            </div>
          </div>
        </div>
        <div>
          <div className='m-2 p-2 font-bold text-xl'>Soft Skills</div>
          <div>
            <Image src="/leader.png" width={50} height={50} alt='leader'></Image>
            <div>Leadership</div>
          </div>
          <div>
            <Image src="/present.png" width={50} height={50} alt='present'></Image>
            <div>Presentation</div>
          </div>
          <div>
            <Image src="/analytic.png" width={50} height={50} alt='present'></Image>
            <div>Analytical Thinking</div>
          </div>
        </div>
      </div>



    </div>
  )
}

export default page
