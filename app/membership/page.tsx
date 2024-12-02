"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/Icons";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    text: "Get More With Your Favourite Restro",
    author: "Ms. Suhani Gaikwad",
    position: "Team Lead",
    company: "The Samvad",
  },
  {
    text: "Exceptional services and delightful experiences!",
    author: "Mr. Rajesh Patel",
    position: "Senior Manager",
    company: "Foodies Inc.",
  },
  {
    text: "I love the personalized recommendations!",
    author: "Ms. Pooja Sharma",
    position: "Marketing Expert",
    company: "TasteMakers",
  },
];

// JSON for Membership Plans
const membershipPlans = [
  {
    name: "Gold",
    price: "$99",
    tenure: "1 Year",
    benefits: ["Priority Reservations", "Free Desserts on Special Days"],
  },
  {
    name: "Plus",
    price: "$149",
    tenure: "1 Year",
    benefits: [
      "Priority Reservations",
      "Free Desserts on Special Days",
      "Personalized Recommendations",
    ],
  },
  {
    name: "Complete",
    price: "$199",
    tenure: "1 Year",
    benefits: [
      "Priority Reservations",
      "Free Desserts on Special Days",
      "Personalized Recommendations",
      "Exclusive Discounts on New Items",
    ],
  },
];

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(() => {
    // Get the selected plan from localStorage, default to "Gold"
    return localStorage.getItem("selectedPlan") || "Gold";
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // UseRef to store the interval ID

  // Function to reset the interval
  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear existing interval
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000); // Start a new interval
  };

  // Auto-slide effect with reset on index change
  useEffect(() => {
    resetInterval(); // Initialize the interval
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Cleanup on unmount
    };
  }, [currentIndex]); // Runs every time `currentIndex` changes

  // Handlers for navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    resetInterval(); // Reset the interval on manual navigation
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    resetInterval(); // Reset the interval on manual navigation
  };

  // Framer Motion Variants for Top-to-Bottom Animation
  const variants = {
    enter: { y: "-100%", opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  const handlePlanSelect = (planName: any) => {
    setSelectedPlan(planName);
    localStorage.setItem("plan", planName); // Store the selected plan in localStorage
  };

  const currentPlan = membershipPlans.find(
    (plan) => plan.name === selectedPlan
  );

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      {/* Background and Header */}
      <img
        src="/bg-designs.png"
        className="w-screen h-screen z-[-1] fixed top-0"
        alt="Background"
      />
      <div className="m-6 md:m-12">
        <Icons.LogoAuth />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full h-full items-center justify-between px-6 lg:px-12">
        {/* Left Content */}
        <div className="text-white max-w-md">
          <h1 className="text-2xl lg:text-4xl font-bold mb-4">
            {currentPlan?.name} Membership
          </h1>
          <p className="text-sm lg:text-lg font-light mb-4">
            Get the best experience with exclusive benefits and discounts.
          </p>
          <ul className="flex flex-col gap-2 text-xs lg:text-sm">
            {currentPlan?.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <Check className="text-[#650000] bg-green-600 p-1 rounded-full w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="bg-white p-4 lg:p-6 rounded-[20px] shadow-lg text-left mt-2 lg:mt-0 w-full max-w-md">
          <h2 className="text-lg lg:text-xl font-semibold">Checkout</h2>
          <hr className="w-full bg-black my-2" />
          <div className="h-[120px] lg:h-[200px] p-6">
            <table className="w-full text-left overflow-x-auto">
              <tbody>
                {/* Tenure Row */}
                <tr className="rounded-lg">
                  <td className="font-semibold text-sm sm:text-base md:text-lg text-gray-700 py-2 pr-4">
                    Tenure:
                  </td>
                  <td className="text-sm sm:text-base md:text-lg text-right text-gray-900">
                    {currentPlan?.tenure}
                  </td>
                </tr>

                {/* Plan Name Row */}
                <tr className="hover:bg-gray-100 transition-colors rounded-lg">
                  <td className="font-semibold text-sm sm:text-base md:text-lg text-gray-700 py-2 pr-4">
                    Plan Name:
                  </td>
                  <td className="text-sm sm:text-base md:text-lg text-right text-gray-900">
                    {currentPlan?.name}
                  </td>
                </tr>

                {/* Price Row */}
                <tr className="hover:bg-gray-100 transition-colors rounded-lg mb-4">
                  <td className="font-semibold text-sm sm:text-base md:text-lg text-gray-700 py-2 pr-4">
                    Price:
                  </td>
                  <td className="text-sm sm:text-base md:text-lg text-right text-gray-900 font-bold">
                    {currentPlan?.price}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="w-full mt-3 py-2 lg:py-4 bg-gradient-to-r from-[#910A04] via-[#910A04] to-[#650000] text-white rounded-full uppercase font-bold text-xs lg:text-md">
            Become a Member
          </button>
        </div>
      </div>

      {/* Footer with Animated Reviews */}
      <div className="mt-8 bg-white w-screen flex flex-col md:flex-row h-[40vh] md:h-[15vh] items-center justify-around  px-4 py-4 lg:py-6 relative">
        <div className="flex gap-8">
          <div className="flex flex-col items-center text-center mx-4 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <img
                  src="/quotations.png"
                  alt="Quotation Icon"
                  className="w-4 lg:w-6 h-4 lg:h-6 mb-2"
                />
                <p className="text-sm lg:text-lg font-bold text-[#650000] mb-2">
                  {reviews[currentIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex gap-8">
          <ChevronLeft
            onClick={handlePrev}
            className="text-gray-500 hidden lg:block hover:text-gray-700 self-center  cursor-pointer w-6 h-6 lg:w-8 lg:h-8"
          />
          <div className="md:flex hidden md:flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <p className="text-xs lg:text-sm font-semibold">
                  - {reviews[currentIndex].author}
                </p>
                <p className="hidden lg:block text-gray-600">
                  {reviews[currentIndex].position}
                </p>
                <p className="hidden lg:block text-gray-600">
                  {reviews[currentIndex].company}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <ChevronRight
            onClick={handleNext}
            className="text-gray-500 hidden lg:block self-center  hover:text-gray-700 cursor-pointer w-6 h-6 lg:w-8 lg:h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
