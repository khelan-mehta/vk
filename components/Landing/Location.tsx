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
const Location = () => {
  return <div className="bg-[#f9f5e9] flex flex-col"></div>;
};

export default Location;
