"use client";
import React from "react";
import { Icons } from "./Icons";
import { User2 } from "lucide-react";
import Link from "next/link";
import DesktopView from "./views/desktopView";
import MobileView from "./views/mobileView";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const blacklistUrls = ["/membership"];

  // Check if the current pathname is in the blacklist
  if (blacklistUrls.includes(pathname)) {
    return null; // Don't render the Navbar
  }
  return (
    <>
      <MobileView>
        <div className="relative z-20">
          <div className="flex flex-col w-screen p-8 overflow-hidden">
            <div className="flex relative justify-between items-center">
              <div className="flex sm:ml-0 ml-[-30px]">
                <Link href="/">
                  {" "}
                  <Icons.Logo />
                </Link>
              </div>
              <Sidebar activeItem="Home" />
            </div>
            <hr className="w-[80%] self-center mt-5" />
          </div>
        </div>
      </MobileView>
      <DesktopView>
        <div className="relative z-20">
          <div className="flex flex-col w-screen p-8 overflow-hidden">
            <div className="flex justify-between items-center">
              <div className="flex sm:ml-0 ml-[-30px]">
                <Link href="/">
                  {" "}
                  <Icons.Logo />
                </Link>
              </div>
              <div className="hidden md:flex gap-12 uppercase items-center text-gray-700 hover:text-gray-900 font-extrabold text-xs tracking-wider text-[18px]">
                <Link href="/gallery">
                  <div className="self-center cursor-pointer">Gallery</div>
                </Link>
                <Link href="/">
                  <div className="self-center cursor-pointer">Home</div>
                </Link>
                <div className="self-center">About</div>
                <Link href="/menu">
                  <div className="self-center">Menu</div>
                </Link>
                <Link
                  href="/auth/login"
                  className="p-3 bg-gradient-to-b from-accent-500 to-accent-800 uppercase rounded-full text-white"
                >
                  <User2 />
                </Link>
              </div>
            </div>

            <hr className="w-[80%] self-center mt-5" />
          </div>
        </div>
      </DesktopView>
    </>
  );
};

export default Navbar;
