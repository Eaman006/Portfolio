import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../Components/Sidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Md Eaman Adeep",
  description: "Portfolio Website",
};

export default function AboutLayout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
