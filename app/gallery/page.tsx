 "use client";
import React from "react";
import tables from "../../public/8.png";
import scooty from "../../public/6.png";
import dayTables from "../../public/9.png";
import Image from "next/image";
import krishna from "../../public/krishnaImg.png";
import indoors from "../../public/indoors.png";
import fv from "../../public/dineout.png";
import ra from "../../public/food.png";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import DesktopView from "@/components/views/desktopView";
import TabView from "@/components/views/tabView";

const slides = [
  {
    images: [tables, dayTables, scooty],
    number: "01",
  },
  {
    images: [ra, fv, indoors],
    number: "02",
  },
  {
    images: [tables, dayTables, scooty],
    number: "03",
  },
  {
    images: [ra, fv, indoors],
    number: "04",
  },
];

const leftAnimation = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const topAnimation = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const circlePath = {
  hidden: { strokeDasharray: "0 130" },
  show: {
    strokeDasharray: "160 200",
    transition: {
      duration: 1,
      delay: 0.6,
    },
  },
};

const fadeInNumber = {
  hidden: { opacity: 0 },
  show: { opacity: 0.6 },
};

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      <TabView>
        {" "}
        <div className="mt-32 px-24">
          <div className="flex gap-7 mt-[180px] ">
            <div className="">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={leftAnimation}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <Image
                  src={slides[currentSlide].images[0]}
                  alt="tables"

                  width={260}
                  height={360}
                  className="min-w-[260px]"
                />
                <Image
                  src={slides[currentSlide].images[1]}
                  alt="tables"
                  width={360}
                  height={360}
                  className=""
                />
              </motion.div>
            </div>
            <div className="flex">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={topAnimation}
                transition={{ duration: 0.5 }}
                className="min-w-[260px] h-[260px]"
              >
                <Image
                  src={slides[currentSlide].images[2]}
                  alt="tables"
                  width={160}
                  height={170}
                  className="min-w-[260px]"
                />
              </motion.div>
            </div>
            <div className="flex flex-col ml-[15vw] justify-center ">
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn}
                className="flex ml-[40px]"
              >
                <button
                  className="p-7 border-black border-[1px] border-solid border-r-[0px]"
                  onClick={handlePrevious}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  className="p-7 border-black border-[1px] border-solid"
                  onClick={handleNext}
                  disabled={currentSlide === slides.length - 1}
                >
                  <ChevronRightIcon />
                </button>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn}
                className="relative "
              >
                <Image
                  src={krishna}
                  alt="Krishna png"
                  width={300}
                  height={200}
                  className="mt-[12vh]"
                />

                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[5vh] ml-[25px]"
                >
                  <motion.path
                    variants={circlePath}
                    initial="hidden"
                    animate="show"
                    d="M100,40
         a80,80 0 0,1 0,160
         a80,80 0 0,1 0,-160"
                    fill="none"
                    stroke="#BE7A5B"
                    strokeWidth="1"
                    strokeLinecap="round"
                    transform="rotate(360, 360, 360)"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeInNumber}
            className="absolute top-14 font-bold opacity-60 text-[black  ] left-24 text-[180px]"
          >
            {slides[currentSlide].number}
          </motion.div>
        </div>
      </TabView>
      <DesktopView>
        <div className="mt-32 px-24">
          <div className="flex gap-7 mt-[180px] ">
            <div className="">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={leftAnimation}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <Image
                  src={slides[currentSlide].images[0]}
                  alt="tables"
                  width={360}
                  height={360}
                  className=""
                />
                <Image
                  src={slides[currentSlide].images[1]}
                  alt="tables"
                  width={360}
                  height={360}
                  className=""
                />
              </motion.div>
            </div>
            <div className="flex">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={topAnimation}
                transition={{ duration: 0.5 }}
                className="flex"
              >
                <Image
                  src={slides[currentSlide].images[2]}
                  alt="tables"
                  width={260}
                  height={470}
                  className=""
                />
              </motion.div>
            </div>
            <div className="flex flex-col ml-[15vw] justify-center ">
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn}
                className="flex ml-[40px]"
              >
                <button
                  className="p-7 border-black border-[1px] border-solid border-r-[0px]"
                  onClick={handlePrevious}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  className="p-7 border-black border-[1px] border-solid"
                  onClick={handleNext}
                  disabled={currentSlide === slides.length - 1}
                >
                  <ChevronRightIcon />
                </button>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn}
                className="relative "
              >
                <Image
                  src={krishna}
                  alt="Krishna png"
                  width={300}
                  height={200}
                  className="mt-[12vh]"
                />

                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[5vh] ml-[25px]"
                >
                  <motion.path
                    variants={circlePath}
                    initial="hidden"
                    animate="show"
                    d="M100,40
         a80,80 0 0,1 0,160
         a80,80 0 0,1 0,-160"
                    fill="none"
                    stroke="#BE7A5B"
                    strokeWidth="1"
                    strokeLinecap="round"
                    transform="rotate(360, 360, 360)"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeInNumber}
            className="absolute top-14 font-bold opacity-60 text-[white] left-24 text-[180px]"
          >
            {slides[currentSlide].number}
          </motion.div>
        </div>
      </DesktopView>
    </>
  );
}
