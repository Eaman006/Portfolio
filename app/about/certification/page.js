import React from 'react'
import Image from 'next/image'
import { MdPictureAsPdf } from "react-icons/md";
import { FaDownload } from "react-icons/fa";

const page = () => {
  return (
    <div className='bg-gradient-to-b from-gray-800 w-full p-4'>
      <div className='text-2xl font-bold text-sky-400'>Certifications</div>
      <div className='max-h-[80vh] overflow-hidden overflow-y-scroll'>
        <div className='flex m-6 bg-[#00000087] p-4 rounded-lg'>
          <div>
            <Image src="/aws.png" width={100} height={100} alt='aws'></Image>
          </div>
          <div>
            <div className='m-2 font-bold'>AWS Certified Machine Learning - Natural Language Speciality</div>
            <div className='mx-4'>Issued on June 2025</div>
            <div className='mx-4'><span className='font-semibold'>Skills:</span> Amazon Web Services (AWS) · Machine Learning · Natural Language Processing (NLP) · AWS SageMaker</div>
            <div className='mx-4 my-2'>
              <a
                href="/certification/awsmachine.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="View Certificate"

              >
                <span className="text-red-600 text-3xl cursor-pointer flex"><MdPictureAsPdf /><span className='text-lg text-white underline'>Certificate.pdf</span><span className='text-blue-600 text-lg m-2'><FaDownload /></span></span>
              </a>
            </div>
          </div>
        </div>
        <div className='flex m-6 bg-[#00000087] p-4 rounded-lg'>
          <div>
            <Image src="/aws.png" width={100} height={100} alt='aws'></Image>
          </div>
          <div>
            <div className='m-2 font-bold'>AWS Certified Machine Learning - Natural Language Speciality</div>
            <div className='mx-4'>Issued on June 2025</div>
            <div className='mx-4'><span className='font-semibold'>Skills:</span> Amazon Web Services (AWS) · Machine Learning · Natural Language Processing (NLP) · AWS SageMaker</div>
            <div className='mx-4 my-2'>
              <a
                href="/certification/awsmachine.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="View Certificate"

              >
                <span className="text-red-600 text-3xl cursor-pointer flex"><MdPictureAsPdf /><span className='text-lg text-white underline'>Certificate.pdf</span><span className='text-blue-600 text-lg m-2'><FaDownload /></span></span>
              </a>
            </div>
          </div>
          
        </div>
        <div className='flex m-6 bg-[#00000087] p-4 rounded-lg'>
          <div>
            <Image src="/aws.png" width={100} height={100} alt='aws'></Image>
          </div>
          <div>
            <div className='m-2 font-bold'>AWS Certified Machine Learning - Natural Language Speciality</div>
            <div className='mx-4'>Issued on June 2025</div>
            <div className='mx-4'><span className='font-semibold'>Skills:</span> Amazon Web Services (AWS) · Machine Learning · Natural Language Processing (NLP) · AWS SageMaker</div>
            <div className='mx-4 my-2'>
              <a
                href="/certification/awsmachine.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="View Certificate"

              >
                <span className="text-red-600 text-3xl cursor-pointer flex"><MdPictureAsPdf /><span className='text-lg text-white underline'>Certificate.pdf</span><span className='text-blue-600 text-lg m-2'><FaDownload /></span></span>
              </a>
            </div>
          </div>
          
        </div>
        <div className='flex m-6 bg-[#00000087] p-4 rounded-lg'>
          <div>
            <Image src="/aws.png" width={100} height={100} alt='aws'></Image>
          </div>
          <div>
            <div className='m-2 font-bold'>AWS Certified Machine Learning - Natural Language Speciality</div>
            <div className='mx-4'>Issued on June 2025</div>
            <div className='mx-4'><span className='font-semibold'>Skills:</span> Amazon Web Services (AWS) · Machine Learning · Natural Language Processing (NLP) · AWS SageMaker</div>
            <div className='mx-4 my-2'>
              <a
                href="/certification/awsmachine.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="View Certificate"

              >
                <span className="text-red-600 text-3xl cursor-pointer flex"><MdPictureAsPdf /><span className='text-lg text-white underline'>Certificate.pdf</span><span className='text-blue-600 text-lg m-2'><FaDownload /></span></span>
              </a>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default page
