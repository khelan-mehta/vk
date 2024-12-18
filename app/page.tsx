"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import HomePage from "@/components/Home";
import Krishna from "@/components/Loading/Krishna";
import { motion } from "framer-motion";
import Button from "@/components/LoaderButton";
import { gsap } from "gsap";

// Define the fadeIn animation
const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 1.4,
      type: "spring",
    },
  },
};

const circlePath = {
  hidden: { strokeDasharray: "0 360" },
  show: {
    strokeDasharray: "0 0",
    transition: {
      duration: 1,
      delay: 0.6,
    },
  },
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null); // Reference for the animated container
  const [userInteracted, setUserInteracted] = useState(false);

  const handleUserInteraction = () => {
    setUserInteracted(true);
  };

  useEffect(() => {
    if (userInteracted && containerRef.current) {
      // Animate the height to scroll up smoothly
      gsap.to(containerRef.current, {
        height: "0vh",
        duration: 1.5, // Duration of the animation
        ease: "power1.out", // Easing for a smooth effect
      });
    } 
  }, [userInteracted]);

  return (
    <div className="relative">
      {/* Animated container */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 z-50 w-full bg-gradient-to-b to-red-800 via-[#450001] from-[#650002] transition-all ease rounded-b-[0px]"
        style={{ height: "100vh" }}
      >
        <div className="relative flex items-center justify-center h-full text-white">
          {!userInteracted && (
            <>
              <motion.div initial="hidden" animate="show" variants={fadeIn}>
                <div className="mb-24 sm:mb-0">
                  <Krishna />
                </div>
              </motion.div>
              <svg
                width="425"
                height="425"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-[-5vh] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180"
              >
                <motion.path
                  variants={circlePath}
                  initial="hidden"
                  animate="show"
                  d="M100,10 
              a80,80 0 0,1 0,160 
              a80,80 0 0,1 0,-160"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1"
                  strokeLinecap="round"
                  transform="rotate(360, 360, 360)"
                />
              </svg>
            </>
          )}
        </div>
      </div>

      {/* Button to trigger animation */}
      {!userInteracted && (
        <div className="fixed z-50 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Button
            label="Enter Vaikunth"
            onTouchStart={handleUserInteraction}
            onClick={handleUserInteraction}
            size="large"
          />
        </div>
      )}

      {/* HomePage content after animation */}
      <div className="flex">{userInteracted && <HomePage />}</div>
    </div>
  );
}
