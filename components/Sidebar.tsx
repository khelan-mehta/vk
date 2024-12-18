import React, { useState, useEffect } from "react";
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
import axios from "axios";
import MembershipCard from "../components/MemberShipCard"; // Assuming it's in the same folder

interface SidebarProps {
  activeItem: string;
  isSidebarOpen?: boolean;
}

const membershipDetails = [
  {
    name: "Gold",
    price: "$49",
    description: "Ideal for intimate gatherings and special occasions.",
    details: ["Online booking", "Premium support: 3 months"],
    bg: "from-yellow-400 to-yellow-700",
  },
  {
    name: "Plus",
    price: "$99",
    description: "Perfect for larger gatherings and events.",
    details: ["Hall rental", "Premium support: 6 months"],
    bg: "from-[#a83030] to-[#2b0505]",
  },
  {
    name: "Complete",
    price: "$499",
    description: "All-inclusive for weddings and large events.",
    details: ["Full service catering", "Event planning assistance"],
    bg: "from-green-300 to-green-700",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeItem, isSidebarOpen }) => {
  const { status, data } = useSession();
  const [membershipData, setMembershipData] = useState<any>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const userId = data.user._uid;
      const accessToken = data.user.access_token;
      const url = `https://server-staging.vercel.app/users/${userId}`;

      const fetchUserData = async () => {
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const userData = response.data;

          if (userData) {
            // Assuming the membership details are part of the user data.
            const membership = userData.enrolledMembership;
            console.log(userData);

            console.log(membership);

            if (membership == "gold") {
              setMembershipData(0);
            } else if (membership == "plus") {
              setMembershipData(1);
            } else if (membership == "complete") {
              setMembershipData(2);
            } else {
              setMembershipData(1);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [status, data]);

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
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white border-l z-10 rounded-l-3xl shadow-md transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:block`}
      >
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
            </div>
          </div>

          {/* Conditionally render the MembershipCard */}
          {membershipData && (
            <MembershipCard
              name={membershipDetails[membershipData].name}
              bg={membershipDetails[membershipData].bg}
            />
          )}

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
