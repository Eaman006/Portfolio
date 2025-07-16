import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-5 justify-between bg-gradient-to-b from-gray-800">
      <div className="m-5 w-2/3 pt-5">
        <div className="bg-black p-2 mt-2 rounded-xl text-xl border-2 border-blue-400 w-fit flex">
          <span>👋Hi there, I&apos;m </span>
          <span className="text-blue-400 px-2 font-bold">Eaman</span>
        </div>        
        <div className="p-2 border-2 rounded-xl text-xl my-5 bg-black border-blue-400 w-3/4">
          <div className="">A <span className="font-bold text-blue-400">Computer Engineer</span>. I engineer meaningful solutions, transforming complex challenges into elegant, impactful code.</div>
          <div className="flex justify-evenly my-3">
            <Link href="/about" className="my-2 bg-gradient-to-b from-sky-400 to-blue-600 hover:active:to-white hover:to-blue-400 rounded-full p-2">
              <div className="text-lg font-bold">Know more</div>
            </Link>
            <Link href="/contact" className="my-2 bg-gradient-to-b from-gray-800 border-white border hover:active:to-white hover:from-gray-600 rounded-full p-2">
              <div className="text-lg font-bold">Contact me</div>
            </Link>

          </div>
        </div>
      </div>
      <div className="w-[90vw] h-[90vh] overflow-hidden relative m-2 p-2">
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
