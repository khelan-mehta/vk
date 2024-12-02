import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  PhoneCall,
} from "lucide-react";
import { Icons } from "./Icons";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  delay,
  motion,
  useScroll,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import favorite from "../public/favorite.png";
import arrowheads from "../public/arrowheads.png";
import swirlyArrow from "../public/swirly-arrow.png";
import upperRightArrow from "../public/upper-right-arrow.png";
import rightArrow from "../public/right-arrow.png";
import goodRating from "../public/goodRating.png";
import separator from "../public/separator.png";
import paneer from "../public/paneer.png";
import mG from "../public/Mask group.png";
import balloons from "../public/balloons.png";
import graph1 from "../public/graph 1.png";
import Image from "next/image";
import MobileView from "./views/mobileView";
import TabView from "./views/tabView";
import DesktopView from "./views/desktopView";
import Hero from "./Landing/Hero";
import Location from "./Landing/Location";
import pin from "../public/pin.png";
import PartyBooking from "./PartyBooking";
import { gsap } from "gsap";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftContentRef.current) {
      gsap.from(leftContentRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 3,
      });
    }

    if (rightContentRef.current) {
      gsap.from(rightContentRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 3,
      });
    }
  }, []);

  return (
    <>
      <div className="gap-4 bg-[#f9f5e9] ">
        <div className="bg-[#f9f5e9]">
          <MobileView>
            <div className="text-black">
              <div
                ref={leftContentRef}
                className="px-[2rem] flex flex-col gap-12 text-black  bg-transparent mt-[130px]"
              >
                <div className="flex flex-col text-[30px] gap-1 font-extrabold">
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
                </div>
                <div className="flex flex-col text-[20px] gap-7 font-medium">
                  <div ref={rightContentRef} className="flex gap-7">
                    <Image
                      src={goodRating}
                      alt="gR"
                      width={30}
                      height={30}
                      className="self-center "
                    ></Image>
                    <p>
                      <span className="text-[#f78764] self-center">1k+ </span>
                      5star Rating on Google
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <button className=" bg-[#650002] text-white w-[130px] h-[5vh] text-[14px] uppercase rounded-[5px] ">
                      Menu
                    </button>
                    <div className="flex">
                      <PhoneCall
                        size={14}
                        className="border-[#650002] self-center h-[5vh] w-[3vw] p-3 rounded-l-md border-[1px] border-solid"
                      />
                      <button className=" flex justify-around gap-4 border-[#650002] bg-transparent border-[1px] border-l-[0px] border-solid w-[130px] h-[5vh] text-[14px] uppercase rounded-r-[5px] text-[#650002] items-center">
                        Call Us
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  gap-7 font-medium">
                  {" "}
                  <div className="flex bg-white justify-center w-full z-10 px-2 rounded-lg border-dashed border-2 border-[#650002]">
                    <div className="flex w-[25%] justify-center items-center">
                      <Image
                        src={pin}
                        alt="locationIcon"
                        className="w-[30px] h-[30px]"
                        width={50}
                        height={5}
                      ></Image>
                    </div>
                    <div className="flex flex-col relative text-black w-full self-end  items-center justify-center h-[10vh] bg-white">
                      Vaikunth Village Restaurant Kuha, opp. Shiv Aradhna, Shiv
                      Aradhna, Kuha, Gujarat 382433
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-screen z-[-1] mt-[80px]">
                <Image
                  src={separator}
                  width={1000}
                  height={40}
                  alt="sep"
                ></Image>
              </div>
              <div className="flex flex-col justify-center items-center gap-4 w-screen z-[-1] mt-[80px] my-[200px]">
                <div className="w-[80%] h-[81vh] overflow-y-hidden py-[5rem] z-[1] overflow-x-scroll customScrollBar2 flex rounded-[20px] relative">
                  <div className="flex w-[500vw] ">
                    <div>
                      <PartyBooking />
                    </div>
                    <div>
                      <PartyBooking />
                    </div>
                    <div>
                      <PartyBooking />
                    </div>
                    <div>
                      <PartyBooking />
                    </div>
                  </div>
                </div>
                <div className="flex relative w-full">
                  <div className="bg-[transparent]  border-solid border-[#f7866433] border-2 z-[0] h-[76vh] absolute top-[-73vh] left-[10%] rounded-[20px]" />
                  <div className="bg-[#6500020c]  z-[0] h-[76vh] absolute top-[-73vh] left-[10%] rounded-[20px]" />
                </div>
              </div>

              <div className="absolute  right-[0] bottom-[0px]  z-[0] mt-[0]">
                <Icons.heroImg width={"500px"} />
              </div>
              <div className="absolute -right-16 bottom-1/2 z-[0] mt-[-70px]">
                <Image
                  src={swirlyArrow}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute left-[0vw] bottom-[0vh] z-[0] mt-[-70px]">
                <Image
                  src={favorite}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute left-[0vw] top-[60vh]">
                <Image
                  src={rightArrow}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className=""
                />
              </div>
              <div className="absolute -right-16 bottom-1/3">
                <Image
                  src={upperRightArrow}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-180 "
                />
              </div>
              <div className="absolute right-[4vw] bottom-[3vh]  mt-[-70px]">
                <Image
                  src={arrowheads}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
            </div>
            <div className="min-h-screen-xl w-full flex flex-col">
              <main className="flex-grow flex items-center justify-center p-4">
                <div className="rounded-xl overflow-hidden w-full flex flex-col">
                  {" "}
                  <div className="w-full p-4 h-[30vh] relative">
                    <Image
                      src="/food.png"
                      alt="Delicious food"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg ">
                      <button className="text-[#000] font-semibold">
                        Request more information
                      </button>
                    </div>
                  </div>
                  <div className="w-full p-4 rounded-xl">
                    <h2 className="text-3xl font-bold text-[#650002] mb-6">
                      Wanna say something?
                      <br />
                      Get in touch!
                    </h2>
                    <form className="space-y-4 flex flex-col gap-4">
                      <input
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        type="text"
                        placeholder="First Name"
                      />
                      <input
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        type="text"
                        placeholder="Last Name"
                      />
                      <input
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        type="email"
                        placeholder="Email"
                      />
                      <textarea
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        rows={4}
                        placeholder="Message"
                      ></textarea>
                      <button className="bg-[#650002] text-white  px-8 py-3 rounded-lg hover:bg-[#660000] transition duration-300">
                        Send
                      </button>
                    </form>

                    <div className="mt-8 flex space-x-4">
                      <a
                        href="https://www.instagram.com/explore/locations/1769609960005655/vaikunth-village-restaurant/"
                        className="text-[#000] border rounded-full p-2 border-[#000] hover: hover:bg-[#000] hover:text-white transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram size={24} />
                      </a>
                      <a
                        href="https://www.facebook.com/VAIKUNTHVILLAGE/"
                        className="text-[#000] border rounded-full p-2 border-[#000] hover: hover:bg-[#000] hover:text-white transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>

            <div className="text-center">
              <div className="text-black max-w-screen-xl mx-auto py-8 md:py-12 flex flex-col items-center justify-center">
                <div className="flex flex-col md:flex-row w-full justify-between items-start border-b pb-6 md:pb-10 gap-8">
                  <div className="flex w-full md:w-1/3 justify-start items-center flex-col gap-5 mb-6 md:mb-0">
                    <Icons.Logo />
                    <p className="text-xl md:text-2xl font-regular text-center lancelot-regular">
                      Vaikunth Village Restaurant
                    </p>
                    <p className="text-sm text-center">
                      EMBRACE THE FOOD IN ESSENCE OF DIVINE
                    </p>
                  </div>
                  <div className="flex w-full md:w-1/3 justify-start items-center flex-col gap-5 mb-6 md:mb-0">
                    <h4 className="text-base md:text-lg font-semibold mb-4">
                      Opening Hours
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Clock size={14} className="mr-2" />
                        <span className="whitespace-nowrap">
                          Lunch: 11:00 - 14:00
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Clock size={14} className="mr-2" />
                        <span className="whitespace-nowrap">
                          Dinner: 19:00 - 22:00
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex w-full md:w-1/3 justify-center items-center flex-col gap-5 mb-6 md:mb-0">
                    <h4 className="text-base md:text-lg font-semibold mb-4 text-center">
                      Contact Us
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center ">
                        <MapPin size={16} className="mr-4" />
                        <div className="m-0 p-0">
                          <span>Vaikunth Village Restaurant Kuha, </span>
                          <br />
                          <span>
                            opp. Shiv Aradhana, Kuha, Gujarat - 382433
                          </span>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <Phone size={14} className="mr-4" />
                        <span>099250 38092</span>
                      </li>
                      <li className="flex items-center">
                        <Mail size={14} className="mr-4" />
                        <span>info@vaikunth.com</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mb-6 md:mb-8">
                  <a href="#" className="hover:text-gray-400">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-gray-400">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
                <div className="text-center">
                  <p className="text-sm">
                    © 2024 Vaikunth Restaurant. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </MobileView>
          <TabView>
            <div className="text-black">
              <div
                ref={leftContentRef}
                className="px-[2rem] flex flex-col gap-12 text-black  bg-transparent mt-[130px]"
              >
                <div className="flex flex-col text-[30px] gap-1 font-extrabold">
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
                </div>
                <div className="flex flex-col text-[20px] gap-7 font-medium">
                  <div ref={rightContentRef} className="flex gap-7">
                    <Image
                      src={goodRating}
                      alt="gR"
                      width={30}
                      height={30}
                      className="self-center "
                    ></Image>
                    <p>
                      <span className="text-[#f78764] self-center">1k+ </span>
                      5star Rating on Google
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <button className=" bg-[#650002] text-white w-[130px] h-[5vh] text-[14px] uppercase rounded-[5px] ">
                      Menu
                    </button>
                    <div className="flex">
                      <PhoneCall
                        size={14}
                        className="border-[#650002] self-center h-[5vh] w-[3vw] p-3 rounded-l-md border-[1px] border-solid"
                      />
                      <button className=" flex justify-around gap-4 border-[#650002] bg-transparent border-[1px] border-l-[0px] border-solid w-[130px] h-[5vh] text-[14px] uppercase rounded-r-[5px] text-[#650002] items-center">
                        Call Us
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  gap-7 font-medium">
                  {" "}
                  <div className="flex bg-white justify-center w-full z-10 px-2 rounded-lg border-dashed border-2 border-[#650002]">
                    <div className="flex w-[25%] justify-center items-center">
                      <Image
                        src={pin}
                        alt="locationIcon"
                        className="w-[30px] h-[30px]"
                        width={50}
                        height={5}
                      ></Image>
                    </div>
                    <div className="flex flex-col relative text-black w-full self-end  items-center justify-center h-[10vh] bg-white">
                      Vaikunth Village Restaurant Kuha, opp. Shiv Aradhna, Shiv
                      Aradhna, Kuha, Gujarat 382433
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-screen z-[-1] mt-[80px]">
                <Image
                  src={separator}
                  width={1000}
                  height={40}
                  alt="sep"
                ></Image>
              </div>
              <div className="flex flex-col justify-center items-center gap-4 w-screen z-[-1] mt-[80px] mb-[200px]">
                <div className="w-[80%] h-[81vh] overflow-y-hidden py-[5rem] z-[1] overflow-x-scroll customScrollBar2 flex rounded-[20px] relative">
                  <div className="flex w-[500vw] ">
                    <div>
                      <PartyBooking />
                    </div>
                    <div>
                      <PartyBooking />
                    </div>
                    <div>
                      <PartyBooking />
                    </div>
                    <div>
                      <PartyBooking />
                    </div>
                  </div>
                </div>
                <div className="flex relative w-full">
                  <div className="bg-[transparent]  border-solid border-[#f7866433] border-2 z-[0] h-[76vh] absolute top-[-73vh] left-[10%] rounded-[20px]" />
                  <div className="bg-[#6500020c]  z-[0] h-[76vh] absolute top-[-73vh] left-[10%] rounded-[20px]" />
                </div>
              </div>
              <div className="absolute right-[0] top-[27vh] z-[30]">
                <Image
                  src={paneer}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute  right-[0] bottom-32  z-[0] mt-[0]">
                <Icons.heroImg width={"75vw"} />
              </div>
              <div className="absolute -right-16 bottom-1/2 z-[0] ">
                <Image
                  src={swirlyArrow}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute left-[0vw] bottom-[0vh] z-[0] mt-[-70px]">
                <Image
                  src={favorite}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute left-[0vw] top-[60vh]">
                <Image
                  src={rightArrow}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className=""
                />
              </div>
              <div className="absolute -right-16 bottom-1/3">
                <Image
                  src={upperRightArrow}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-180"
                />
              </div>
              <div className="absolute right-[4vw] bottom-1/2  mt-[-70px]">
                <Image
                  src={arrowheads}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
            </div>
            <div className="min-h-screen-xl p-8 w-full flex flex-col">
              <main className="flex-grow flex items-center justify-center p-4">
                <div className="rounded-xl overflow-hidden w-full flex flex-col">
                  {" "}
                  <div className="w-full p-4 h-[30vh] relative">
                    <Image
                      src="/food.png"
                      alt="Delicious food"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg ">
                      <button className="text-[#000] font-semibold">
                        Request more information
                      </button>
                    </div>
                  </div>
                  <div className="w-full p-4 rounded-xl">
                    <h2 className="text-3xl font-bold text-[#650002] mb-6">
                      Wanna say something?
                      <br />
                      Get in touch!
                    </h2>
                    <form className="space-y-4 flex flex-col gap-4">
                      <input
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        type="text"
                        placeholder="First Name"
                      />
                      <input
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        type="text"
                        placeholder="Last Name"
                      />
                      <input
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        type="email"
                        placeholder="Email"
                      />
                      <textarea
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        rows={4}
                        placeholder="Message"
                      ></textarea>
                      <button className="bg-[#650002] text-white  px-8 py-3 rounded-lg hover:bg-[#660000] transition duration-300">
                        Send
                      </button>
                    </form>

                    <div className="mt-8 flex space-x-4">
                      <a
                        href="https://www.instagram.com/explore/locations/1769609960005655/vaikunth-village-restaurant/"
                        className="text-[#000] border rounded-full p-2 border-[#000] hover: hover:bg-[#000] hover:text-white transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram size={24} />
                      </a>
                      <a
                        href="https://www.facebook.com/VAIKUNTHVILLAGE/"
                        className="text-[#000] border rounded-full p-2 border-[#000] hover: hover:bg-[#000] hover:text-white transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>

            <div className="text-center p-4">
              <div className="text-black max-w-screen-xl mx-auto py-8 md:py-12 flex flex-col items-center justify-center">
                <div className="flex flex-col md:flex-row w-full justify-between items-start border-b pb-6 md:pb-10 gap-8">
                  <div className="flex w-full md:w-1/3 justify-start items-center flex-col gap-5 mb-6 md:mb-0">
                    <Icons.Logo />
                    <p className="text-xl md:text-2xl font-regular text-center lancelot-regular">
                      Vaikunth Village Restaurant
                    </p>
                    <p className="text-sm text-center">
                      EMBRACE THE FOOD IN ESSENCE OF DIVINE
                    </p>
                  </div>
                  <div className="flex w-full md:w-1/3 justify-start items-center flex-col gap-5 mb-6 md:mb-0">
                    <h4 className="text-base md:text-lg font-semibold mb-4">
                      Opening Hours
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Clock size={14} className="mr-2" />
                        <span className="whitespace-nowrap">
                          Lunch: 11:00 - 14:00
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Clock size={14} className="mr-2" />
                        <span className="whitespace-nowrap">
                          Dinner: 19:00 - 22:00
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex w-full md:w-1/3 justify-center items-center flex-col gap-5 mb-6 md:mb-0">
                    <h4 className="text-base md:text-lg font-semibold mb-4 text-center">
                      Contact Us
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center ">
                        <MapPin size={16} className="mr-4" />
                        <div className="m-0 p-0">
                          <span>Vaikunth Village Restaurant Kuha, </span>
                          <br />
                          <span>
                            opp. Shiv Aradhana, Kuha, Gujarat - 382433
                          </span>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <Phone size={14} className="mr-4" />
                        <span>099250 38092</span>
                      </li>
                      <li className="flex items-center">
                        <Mail size={14} className="mr-4" />
                        <span>info@vaikunth.com</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mb-6 md:mb-8">
                  <a href="#" className="hover:text-gray-400">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-gray-400">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
                <div className="text-center">
                  <p className="text-sm">
                    © 2024 Vaikunth Restaurant. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </TabView>
          <DesktopView>
            <div className="text-black">
              <div
                ref={leftContentRef}
                className="px-[5rem] flex flex-col gap-12 text-black  bg-transparent mt-[130px]"
              >
                <div className="flex flex-col text-[40px] gap-1 font-extrabold">
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
                </div>
                <div className="flex flex-col text-[24px] gap-7 font-medium">
                  <div ref={rightContentRef} className="flex gap-7">
                    <Image
                      src={goodRating}
                      alt="gR"
                      width={40}
                      height={40}
                      className="self-center"
                    ></Image>
                    <p>
                      <span className="text-[#f78764] self-center">1k+ </span>
                      5star Rating on Google
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <button className=" bg-[#650002] text-white w-[130px] h-[7vh] text-[14px] uppercase rounded-[5px] ">
                      Menu
                    </button>
                    <div className="flex">
                      <PhoneCall
                        size={14}
                        className="border-[#650002] self-center h-[7vh] w-[3vw] p-3 rounded-l-md border-[1px] border-solid"
                      />
                      <button className=" flex justify-around gap-4 border-[#650002] bg-transparent border-[1px] border-l-[0px] border-solid w-[130px] h-[7vh] text-[14px] uppercase rounded-r-[5px] text-[#650002] items-center">
                        Call Us
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  gap-7 font-medium">
                  {" "}
                  <div className="flex  mt-[0px] bg-white justify-center w-[45vw] px-2 rounded-lg border-dashed border-2 border-[#650002]">
                    <div className="flex w-[15%] justify-center items-center">
                      <Image
                        src={pin}
                        alt="locationIcon"
                        className="w-[40px] h-[40px]"
                        width={50}
                        height={5}
                      ></Image>
                    </div>
                    <div className="flex flex-col  text-black z-[1] w-[85%] self-end  items-center justify-center h-[12vh] bg-white">
                      Vaikunth Village Restaurant Kuha, opp. Shiv Aradhna, Shiv
                      Aradhna, Kuha, Gujarat 382433
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-screen z-[-1] mt-[80px]">
                <Image
                  src={separator}
                  width={1000}
                  height={40}
                  alt="sep"
                ></Image>
              </div>
              <div className="flex flex-col justify-center items-center gap-4 w-screen z-[-1] mt-[80px] mb-[200px]">
                <div className="w-[80%] h-[81vh] overflow-y-hidden  py-[5rem] z-[1] overflow-x-scroll customScrollBar2 flex rounded-[20px] relative">
                  <div className="flex w-[500vw] ">
                    <div>
                      <PartyBooking />
                    </div>
                    <div>
                      <PartyBooking />
                    </div>
                    <div>
                      <PartyBooking />
                    </div>
                    <div>
                      <PartyBooking />
                    </div>
                  </div>
                </div>
                <div className="flex relative w-full">
                  <div className="bg-[transparent]  border-solid border-[#f7866433] border-2 z-[0] h-[76vh] absolute top-[-73vh] left-[10%] rounded-[20px]" />
                  <div className="bg-[#6500020c]  z-[0] h-[76vh] absolute top-[-73vh] left-[10%] rounded-[20px]" />
                </div>
              </div>
              <div className="absolute right-[25vw] top-[27vh] z-[30]">
                <Image
                  src={paneer}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute right-[-50px] top-[130px]  z-[0] mt-[-70px]">
                <Icons.heroImg width={1080} height={733} />
              </div>
              <div className="absolute right-[25vw] top-[27vh] z-[0] mt-[-70px]">
                <Image
                  src={swirlyArrow}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute right-[5vw] top-[22vh] z-[0] mt-[-70px]">
                <Image
                  src={favorite}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute right-[37vw] top-[50vh]  mt-[-70px]">
                <Image
                  src={rightArrow}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute right-[30vw] bottom-[10vh]  mt-[-70px]">
                <Image
                  src={upperRightArrow}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
              <div className="absolute right-[4vw] bottom-[3vh]  mt-[-70px]">
                <Image
                  src={arrowheads}
                  alt="swirlyArrow"
                  width={150}
                  height={150}
                  className="rotate-25"
                />
              </div>
            </div>
            <div className="min-h-screen flex flex-col">
              <main className="flex-grow flex items-center justify-center p-8">
                <div className="rounded-xl overflow-hidden  max-w-7xl w-full flex">
                  <div className="w-full md:w-1/2 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-[#650002] mb-6">
                      Wanna say something?
                      <br />
                      Get in touch!
                    </h2>
                    <form className="space-y-4 flex flex-col gap-4">
                      <input
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        type="text"
                        placeholder="First Name"
                      />
                      <input
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        type="text"
                        placeholder="Last Name"
                      />
                      <input
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        type="email"
                        placeholder="Email"
                      />
                      <textarea
                        className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                        rows={4}
                        placeholder="Message"
                      ></textarea>
                      <button className="bg-[#650002] text-white  px-8 py-3 rounded-lg hover:bg-[#660000] transition duration-300">
                        Send
                      </button>
                    </form>

                    <div className="mt-8 flex space-x-4">
                      <a
                        href="https://www.instagram.com/explore/locations/1769609960005655/vaikunth-village-restaurant/"
                        className="text-[#000] border rounded-full p-2 border-[#000] hover: hover:bg-[#000] hover:text-white transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram size={24} />
                      </a>
                      <a
                        href="https://www.facebook.com/VAIKUNTHVILLAGE/"
                        className="text-[#000] border rounded-full p-2 border-[#000] hover: hover:bg-[#000] hover:text-white transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook size={24} />
                      </a>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 relative">
                    <Image
                      src="/food.png"
                      alt="Delicious food"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                    <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg ">
                      <button className="text-[#000] font-semibold">
                        Request more information
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>

            <div className="">
              <div className=" text-black max-w-screen-xl mx-auto py-12 flex flex-col items-center justify-center">
                {/* <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col items-center">
                    <p className="text-sm">info@vaikunth.com</p>
                    <p className="text-sm">+91 099250 38092</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-sm w-32">
                      Vaikunth Village Restaurant Kuha, opp. Shiv Aradhana, Shiv
                      Aradhana, Kuha, Gujarat - 382433
                    </p>
                  </div>
                </div> */}

                <div className="flex w-full justify-between items-start w-fi border-b pb-10  gap-12">
                  <div className="flex w-1/3 justify-start items-center flex-col gap-5 mb-8">
                    <Icons.Logo />
                    <p className="text-2xl font-regular text-center lancelot-regular">
                      Vaikunth Village Restaurant
                    </p>
                    <p className="text-sm text-center">
                      EMBRACE THE FOOD IN ESSENCE OF DIVINE
                    </p>
                  </div>
                  <div className="flex w-1/3 justify-start items-center flex-col gap-5 mb-8">
                    <h4 className="text-lg font-semibold mb-4">
                      Opening Hours
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        <span className="whitespace-nowrap">
                          Lunch: 11:00 - 14:00
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        <span className="whitespace-nowrap">
                          Dinner: 19:00 - 22:00
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex w-1/3 justify-start items-center flex-col gap-5 mb-8">
                    <h4 className="text-lg font-semibold mb-4 ml-7">
                      Contact Us
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start ">
                        <MapPin size={18} className="mr-4" />
                        <div className="m-0 p-0">
                          <span>Vaikunth Village Restaurant Kuha, </span>
                          <br />
                          <span>
                            opp. Shiv Aradhana, Kuha, Gujarat - 382433
                          </span>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <Phone size={16} className="mr-4" />
                        <span>099250 38092</span>
                      </li>
                      <li className="flex items-center">
                        <Mail size={16} className="mr-4" />
                        <span>info@vaikunth.com</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mb-8">
                  <a href="#" className="hover:text-gray-400">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="hover:text-gray-400">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
                <div className="text-center">
                  <p className="text-sm">
                    © 2024 Vaikunth Restaurant. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </DesktopView>
        </div>
      </div>

      <TabView>
        <div className="text-black">
          <div className="px-[2rem] flex flex-col gap-12 text-black  bg-transparent mt-[130px]">
            <div className="flex flex-col text-[30px] gap-1 font-extrabold">
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
            </div>
            <div className="flex flex-col text-[20px] gap-7 font-medium">
              <div className="flex gap-7">
                <Image
                  src={goodRating}
                  alt="gR"
                  width={30}
                  height={30}
                  className="self-center "
                ></Image>
                <p>
                  <span className="text-[#f78764] self-center">1k+ </span>
                  5star Rating on Google
                </p>
              </div>
              <div className="flex gap-6">
                <button className=" bg-[#650002] text-white w-[130px] h-[5vh] text-[14px] uppercase rounded-[5px] ">
                  Menu
                </button>
                <div className="flex">
                  <PhoneCall
                    size={14}
                    className="border-[#650002] self-center h-[5vh] w-[3vw] p-3 rounded-l-md border-[1px] border-solid"
                  />
                  <button className=" flex justify-around gap-4 border-[#650002] bg-transparent border-[1px] border-l-[0px] border-solid w-[130px] h-[5vh] text-[14px] uppercase rounded-r-[5px] text-[#650002] items-center">
                    Call Us
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col  gap-7 font-medium">
              {" "}
              <div className="flex bg-white justify-center w-full z-10 px-2 rounded-lg border-dashed border-2 border-[#650002]">
                <div className="flex w-[25%] justify-center items-center">
                  <Image
                    src={pin}
                    alt="locationIcon"
                    className="w-[30px] h-[30px]"
                    width={50}
                    height={5}
                  ></Image>
                </div>
                <div className="flex flex-col relative text-black w-full self-end  items-center justify-center h-[10vh] bg-white">
                  Vaikunth Village Restaurant Kuha, opp. Shiv Aradhna, Shiv
                  Aradhna, Kuha, Gujarat 382433
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-screen z-[-1] mt-[80px]">
            <Image src={separator} width={1000} height={40} alt="sep"></Image>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 w-screen z-[-1] mt-[80px] mb-[200px]">
            <div className="w-[80%] h-[81vh] overflow-y-hidden py-[5rem] z-[1] overflow-x-scroll customScrollBar2 flex rounded-[20px] relative">
              <div className="flex w-[500vw] ">
                <div>
                  <PartyBooking />
                </div>
                <div>
                  <PartyBooking />
                </div>
                <div>
                  <PartyBooking />
                </div>
                <div>
                  <PartyBooking />
                </div>
              </div>
            </div>
            <div className="flex relative w-full">
              <div className="bg-[transparent]  border-solid border-[#f7866433] border-2 z-[0] h-[76vh] absolute top-[-73vh] left-[10%] rounded-[20px]" />
              <div className="bg-[#6500020c]  z-[0] h-[76vh] absolute top-[-73vh] left-[10%] rounded-[20px]" />
            </div>
          </div>
          <div className="absolute right-[0] top-[27vh] z-[30]">
            <Image
              src={paneer}
              alt="swirlyArrow"
              width={150}
              height={150}
              className="rotate-25"
            />
          </div>
          <div className="absolute  right-[0] bottom-32  z-[0] mt-[0]">
            <Icons.heroImg width={"75vw"} />
          </div>
          <div className="absolute -right-16 bottom-1/2 z-[0] ">
            <Image
              src={swirlyArrow}
              alt="swirlyArrow"
              width={150}
              height={150}
              className="rotate-25"
            />
          </div>
          <div className="absolute left-[0vw] bottom-[0vh] z-[0] mt-[-70px]">
            <Image
              src={favorite}
              alt="swirlyArrow"
              width={150}
              height={150}
              className="rotate-25"
            />
          </div>
          <div className="absolute left-[0vw] top-[60vh]">
            <Image
              src={rightArrow}
              alt="swirlyArrow"
              width={150}
              height={150}
              className=""
            />
          </div>
          <div className="absolute -right-16 bottom-1/3">
            <Image
              src={upperRightArrow}
              alt="swirlyArrow"
              width={150}
              height={150}
              className="rotate-180"
            />
          </div>
          <div className="absolute right-[4vw] bottom-1/2  mt-[-70px]">
            <Image
              src={arrowheads}
              alt="swirlyArrow"
              width={150}
              height={150}
              className="rotate-25"
            />
          </div>
        </div>
        <div className="min-h-screen-xl w-full flex flex-col">
          <main className="flex-grow flex items-center justify-center p-4">
            <div className="rounded-xl overflow-hidden w-full flex flex-col">
              {" "}
              <div className="w-full p-4 h-[30vh] relative">
                <Image
                  src="/food.png"
                  alt="Delicious food"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg ">
                  <button className="text-[#000] font-semibold">
                    Request more information
                  </button>
                </div>
              </div>
              <div className="w-full p-4 rounded-xl">
                <h2 className="text-3xl font-bold text-[#650002] mb-6">
                  Wanna say something?
                  <br />
                  Get in touch!
                </h2>
                <form className="space-y-4 flex flex-col gap-4">
                  <input
                    className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                    type="text"
                    placeholder="First Name"
                  />
                  <input
                    className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                    type="text"
                    placeholder="Last Name"
                  />
                  <input
                    className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                    type="email"
                    placeholder="Email"
                  />
                  <textarea
                    className="w-full p-4 border-b border-[#000] focus:border-[#000] focus:border-b-1 outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                    rows={4}
                    placeholder="Message"
                  ></textarea>
                  <button className="bg-[#650002] text-white  px-8 py-3 rounded-lg hover:bg-[#660000] transition duration-300">
                    Send
                  </button>
                </form>

                <div className="mt-8 flex space-x-4">
                  <a
                    href="https://www.instagram.com/explore/locations/1769609960005655/vaikunth-village-restaurant/"
                    className="text-[#000] border rounded-full p-2 border-[#000] hover: hover:bg-[#000] hover:text-white transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://www.facebook.com/VAIKUNTHVILLAGE/"
                    className="text-[#000] border rounded-full p-2 border-[#000] hover: hover:bg-[#000] hover:text-white transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={24} />
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </TabView>
    </>
  );
};

export default Home;
