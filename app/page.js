'use client';
import Image from "next/image";
import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";
import { IoCall } from "react-icons/io5";
import { useLoader } from './Components/Loader';

export default function Home() {
  const { triggerLinkLoader } = useLoader();

  const handleLinkClick = () => {
    triggerLinkLoader();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 justify-between bg-gradient-to-b from-gray-800">
      <div className="m-5 lg:w-2/3 pt-5 px-2 ">
        <div className="bg-black p-2 mt-2 rounded-xl text-xl border-2 border-blue-400 w-fit flex home-fade-in">
          <span>👋Hi there, I&apos;m </span>
          <span className="text-blue-400 px-2 font-bold">Eaman</span>
        </div>        
        <div className="p-2 border-2 rounded-xl text-xl my-5 bg-black border-blue-400 w-full lg:w-3/4 home-fade-in-delayed">
          <div className="mb-4">A <span className="font-bold text-blue-400">Computer Engineer</span>. I engineer meaningful solutions, transforming complex challenges into elegant, impactful code.</div>
          <div className="flex justify-evenly my-3">
            <Link href="/about" className="my-2 bg-gradient-to-b from-sky-400 to-blue-600 hover:active:to-white hover:to-blue-400 rounded-full p-2 home-fade-in-delayed1" onClick={handleLinkClick}>
              <div className="text-lg font-bold flex gap-1">
                <span className="m-1"><CgDetailsMore /></span>
                <span>Know more</span>
              </div>
            </Link>
            <Link href="/contact" className="my-2 bg-gradient-to-b from-gray-800 border-white border hover:active:to-white hover:from-gray-600 rounded-full p-2 home-fade-in-delayed2" onClick={handleLinkClick}>
              <div className="text-lg font-bold flex gap-1">
                <span className="m-1"><IoCall /></span>
                <span>Contact me</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:w-[90vw] lg:h-[90vh] w-[90vw] h-[20vh] overflow-hidden relative m-2 p-2">
        <Image
          src="/main.png"
          alt="Full Screen Image"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
