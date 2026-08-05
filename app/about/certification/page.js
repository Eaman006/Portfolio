import React from 'react';
import Image from 'next/image';
import { MdPictureAsPdf } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { getCertifications } from '@/lib/certifications';

export const revalidate = 0; // Dynamic rendering so edits in admin update immediately

export default function CertificationPage() {
  const certifications = getCertifications();

  return (
    <div className='bg-gradient-to-b from-gray-800 w-full p-4 min-h-[85vh]'>
      <div className='text-2xl font-bold text-sky-400 mb-2'>Certifications</div>
      <div className='max-h-[80vh] overflow-hidden overflow-y-scroll space-y-4 pr-2'>
        {certifications.map((cert) => (
          <div key={cert.id} className='flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#00000087] p-4 rounded-lg border border-gray-800 hover:border-sky-500/40 transition-all'>
            <div className="flex-shrink-0 w-24 h-24 relative bg-black/40 rounded-lg overflow-hidden flex items-center justify-center p-1 border border-gray-800">
              <Image
                src={cert.image || '/aws.png'}
                width={100}
                height={100}
                alt={cert.title}
                className="object-contain max-h-full"
                unoptimized={cert.image?.startsWith('http')}
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className='font-bold text-lg text-white'>{cert.title}</div>
              {cert.issueDate && (
                <div className='text-sm text-gray-300'>Issued on {cert.issueDate}</div>
              )}
              {cert.skills && (
                <div className='text-sm text-gray-300'>
                  <span className='font-semibold text-sky-300'>Skills:</span> {cert.skills}
                </div>
              )}
              {cert.pdfUrl && (
                <div className='pt-2'>
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Certificate"
                    className="inline-flex items-center gap-2 group"
                  >
                    <span className="text-red-500 text-2xl flex items-center gap-1 group-hover:scale-110 transition-transform">
                      <MdPictureAsPdf />
                    </span>
                    <span className='text-sm text-white underline group-hover:text-sky-300 transition-colors'>
                      Certificate.pdf
                    </span>
                    <span className='text-blue-500 text-sm group-hover:translate-x-0.5 transition-transform'>
                      <FaDownload />
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
