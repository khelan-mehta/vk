"use client";
import React, { useState } from "react";
import {
  User,
  CreditCard,
  Clock,
  LogOut,
  BookUser,
  Home,
  Menu as MenuIcon,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import profile from "../public/profile.png";
import Image from "next/image";
interface SidebarProps {
  activeItem: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { status } = useSession();
  console.log(status);

  const getButtonStyles = (item: string) => {
    const isActive = activeItem === item;
    return `py-2 px-5 rounded-3xl flex items-center justify-start space-x-3 duration-300 transition-all group ${
      isActive
        ? "bg-[#650000] text-white"
        : "bg-white text-black hover:bg-[#650000] hover:text-white"
    }`;
  };

  const getIconColor = (item: string) => {
    return activeItem === item
      ? "text-white"
      : "text-[#650000] group-hover:text-white";
  };

  return (
    <div className=" z-50">
      <button
        className="flex z-50 right-2 top-2  bg-[#650000] text-white  px-3 py-2 rounded-full"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white border-l z-10 rounded-l-3xl shadow-md transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:block`}
      >
        <button
          className="absolute top-4 right-4 text-[#650000] text-3xl lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          &times;
        </button>
        <div className="flex flex-col p-4 lg:p-8">
          <div className="flex text-center flex-col justify-center items-center mb-6">
            <Image
              src={profile}
              alt="swirlyArrow"
              width={300}
              height={300}
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-[#650000]"
            />

            <div className="mt-4">
              <h3 className="text-2xl lg:text-3xl font-bold">
                Vaikunth Nivasi
              </h3>
              <div className="my-4 relative">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
                  Gold Member
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-30 blur-md"></div>
              </div>
            </div>
          </div>
          <div className="flex font-semibold flex-col space-y-4">
            {/* Navigation Links */}
            <Link href="/">
              <button className={getButtonStyles("home")}>
                <Home size={20} className={getIconColor("home")} />
                <span className="text-sm lg:text-base">Home</span>
              </button>
            </Link>
            <Link href="/menu">
              <button className={getButtonStyles("menu")}>
                <MenuIcon size={20} className={getIconColor("menu")} />
                <span className="text-sm lg:text-base">Menu</span>
              </button>
            </Link>
            <Link href="/checkout">
              <button className={getButtonStyles("checkout")}>
                <ShoppingCart size={20} className={getIconColor("checkout")} />
                <span className="text-sm lg:text-base">Checkout</span>
              </button>
            </Link>
            {/* Profile Links */}
            <Link href="/profile/personal-info">
              <button className={getButtonStyles("personal-info")}>
                <User size={20} className={getIconColor("personal-info")} />
                <span className="text-sm lg:text-base">
                  Personal Information
                </span>
              </button>
            </Link>
            <Link href="/profile/billing">
              <button className={getButtonStyles("billing")}>
                <CreditCard size={20} className={getIconColor("billing")} />
                <span className="text-sm lg:text-base">
                  Billing and Payment
                </span>
              </button>
            </Link>
            <Link href="/profile/orders">
              <button className={getButtonStyles("orders")}>
                <Clock size={20} className={getIconColor("orders")} />
                <span className="text-sm lg:text-base">Orders History</span>
              </button>
            </Link>
            <Link href="/profile/bookings">
              <button className={getButtonStyles("bookings")}>
                <BookUser size={20} className={getIconColor("bookings")} />
                <span className="text-sm lg:text-base">Booking History</span>
              </button>
            </Link>

            <button
              className="bg-white hover:bg-[#650000] text-black hover:text-white py-2 px-5 rounded-3xl flex items-center justify-start space-x-3 duration-300 transition-all group"
              onClick={() => {
                signOut({ redirect: true, redirectTo: "/auth/login" });
              }}
            >
              <LogOut
                size={20}
                className="text-[#650000] group-hover:text-white"
              />
              <span className="text-sm lg:text-base">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
