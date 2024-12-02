import React from "react";

import { Icons } from "../Icons";
import { delay, motion } from "framer-motion";
import { PhoneCall, X } from "lucide-react";
import favorite from "../../public/favorite.png";
import arrowheads from "../../public/arrowheads.png";
import swirlyArrow from "../../public/swirly-arrow.png";
import upperRightArrow from "../../public/upper-right-arrow.png";
import rightArrow from "../../public/right-arrow.png";
import goodRating from "../../public/goodRating.png";
import Image from "next/image";
import MobileView from "../views/mobileView";
import TabView from "../views/tabView";
import DesktopView from "../views/desktopView";
const fadeIn = {
  hidden: {
    opacity: 0,
    x: "100%", // Start off-screen to the left
  },
  show: {
    opacity: 1,
    x: "3%", // Slide in to the final position

    transition: {
      duration: 3, // You can adjust the duration as needed
      delay: 0.2,
      type: "spring", // Delay the fade-in by 0.6 seconds
    },
  },
};
const Hero = () => {
  return (
    <div className="bg-[#f9f5e9]">
      <MobileView>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-0 bottom-[5vh] mt-[-70px]"
        >
          <Icons.heroImg width={552} height={493} />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[30vw] bottom-[5vh] z-[-1] mt-[-70px]"
        >
          <Image
            src={favorite}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[10vw] top-[25vh] z-[-1] mt-[-70px]"
        >
          <Image
            src={swirlyArrow}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
      </MobileView>
      <TabView>
        <div className="flex flex-col p-[5rem] justify-center gap-24 w-screen h-screen">
          <motion.div
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            className="flex flex-col text-[24px] gap-1 font-extrabold"
          >
            <p>
              EMBRACE THE{" "}
              <span
                style={{
                  textShadow: "2px -2px 0px #650002",
                  WebkitTextStroke: "2px #650002",
                  WebkitTextFillColor: "transparent",
                }}
                className="text-[34px]"
              >
                FOOD
              </span>
            </p>
            <p>
              IN ESSENCE OF{" "}
              <span
                style={{
                  textShadow: "2px -2px 0px #650002",
                  WebkitTextStroke: "2px #650002",
                  WebkitTextFillColor: "transparent",
                }}
                className="text-[34px]"
              >
                DIVINE
              </span>
            </p>
          </motion.div>
          <motion.div
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
            className="flex flex-col text-[20px] gap-7 font-medium"
          >
            <div className="flex gap-7">
              <Image
                src={goodRating}
                alt="gR"
                width={30}
                height={30}
                className="self-center"
              ></Image>
              <p>
                <span className="text-[#f78764] self-center">1k+ </span>5star
                Rating on Google
              </p>
            </div>
            <div className="flex gap-6">
              <motion.button
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
                className=" bg-[#650002] w-[110px] h-[6vh] text-[14px] uppercase rounded-[5px] text-white"
              >
                Menu
              </motion.button>
              <div className="flex">
                <PhoneCall
                  size={14}
                  className="border-[#650002] self-center h-[6vh] w-[6vw] p-3 rounded-l-md border-[1px] border-solid"
                />
                <motion.button
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
                  className=" flex justify-around gap-4 border-[#650002] bg-transparent border-[1px] border-l-[0px] border-solid w-[130px] h-[6vh] text-[14px] uppercase rounded-r-[5px] text-[#650002] items-center"
                >
                  Call Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-0 top-[14vh] mt-[-70px]"
        >
          <Icons.heroImg width={952} height={693} />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[30vw] top-[15vh] z-[-1] mt-[-70px]"
        >
          <Image
            src={swirlyArrow}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[10vw] top-[15vh] z-[-1] mt-[-70px]"
        >
          <Image
            src={favorite}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[37vw] top-[50vh] z-[-1] mt-[-70px]"
        >
          <Image
            src={rightArrow}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[30vw] bottom-[10vh] z-[-1] mt-[-70px]"
        >
          <Image
            src={upperRightArrow}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[4vw] bottom-[3vh]  mt-[-70px]"
        >
          <Image
            src={arrowheads}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
      </TabView>
      <DesktopView>
        <div className="flex flex-col p-[5rem] justify-center gap-24 w-screen h-screen">
          <motion.div
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            className="flex flex-col text-[40px] gap-1 font-extrabold"
          >
            <p>
              EMBRACE THE{" "}
              <span
                style={{
                  textShadow: "2px -2px 0px #650002",
                  WebkitTextStroke: "2px #650002",
                  WebkitTextFillColor: "transparent",
                }}
                className="text-[54px]"
              >
                FOOD
              </span>
            </p>
            <p>
              IN ESSENCE OF{" "}
              <span
                style={{
                  textShadow: "2px -2px 0px #650002",
                  WebkitTextStroke: "2px #650002",
                  WebkitTextFillColor: "transparent",
                }}
                className="text-[54px]"
              >
                DIVINE
              </span>
            </p>
          </motion.div>
          <motion.div
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
            className="flex flex-col text-[24px] gap-7 font-medium"
          >
            <div className="flex gap-7">
              <Image
                src={goodRating}
                alt="gR"
                width={40}
                height={40}
                className="self-center"
              ></Image>
              <p>
                <span className="text-[#f78764] self-center">1k+ </span>5star
                Rating on Google
              </p>
            </div>
            <div className="flex gap-6">
              <motion.button
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
                className=" bg-[#650002] w-[130px] h-[7vh] text-[14px] uppercase rounded-[5px] text-white"
              >
                Menu
              </motion.button>
              <div className="flex">
                <PhoneCall
                  size={14}
                  className="border-[#650002] self-center h-[7vh] w-[3vw] p-3 rounded-l-md border-[1px] border-solid"
                />
                <motion.button
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}
                  className=" flex justify-around gap-4 border-[#650002] bg-transparent border-[1px] border-l-[0px] border-solid w-[130px] h-[7vh] text-[14px] uppercase rounded-r-[5px] text-[#650002] items-center"
                >
                  Call Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-0 top-0 mt-[-70px]"
        >
          <Icons.heroImg width={1152} height={893} />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[30vw] top-[15vh]  mt-[-70px]"
        >
          <Image
            src={swirlyArrow}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[10vw] top-[15vh]  mt-[-70px]"
        >
          <Image
            src={favorite}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[37vw] top-[50vh]  mt-[-70px]"
        >
          <Image
            src={rightArrow}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[30vw] bottom-[10vh]  mt-[-70px]"
        >
          <Image
            src={upperRightArrow}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="absolute right-[4vw] bottom-[3vh]  mt-[-70px]"
        >
          <Image
            src={arrowheads}
            alt="swirlyArrow"
            width={150}
            height={150}
            className="rotate-25"
          />
        </motion.div>
      </DesktopView>
    </div>
  );
};

export default Hero;
