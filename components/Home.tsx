import React, { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { useGSAP } from "@gsap/react";
import pin from "../public/pin.png";
import PartyBooking from "./PartyBooking";
import gsap from "gsap";
import Button from "./Button";
import Footer from "./Footer";
import Contact from "./Contact";
import PartyBookingSection from "./PartyBookingSection";
import PricingPlans from "./Pricing";

const Home = () => {
  const paneerRefDesktop = useRef<HTMLDivElement | null>(null);
  const paneerRefMobile = useRef<HTMLDivElement | null>(null);
  const newSection = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleAnimation = () => {
      if (paneerRefDesktop.current) {
        gsap.fromTo(
          paneerRefDesktop.current,
          { y: 0, x: 0, scale: 1, rotation: 0 },
          {
            y: 300,
            x: 100,
            scale: 1.5,
            rotation: -90,
            scrollTrigger: {
              trigger: paneerRefDesktop.current,
              start: "top 30%",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          paneerRefDesktop.current,
          { y: 300, x: 100, scale: 1.5, rotation: -90 },
          {
            y: 900,
            x: -250,
            scale: 4,
            rotation: -42.5,
            scrollTrigger: {
              trigger: newSection.current,
              start: "top center",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      if (paneerRefMobile.current) {
        console.log("balle");
        gsap.fromTo(
          paneerRefMobile.current,
          { y: 50, x: 0, scale: 1.0 },
          {
            y: 0,
            scale: 1.2,
            rotation: 30,
            scrollTrigger: {
              trigger: paneerRefMobile.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      }
    };

    requestAnimationFrame(handleAnimation);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="gap-4 bg-white">
        <div className="bg-[#fff]">
          {" "}
          <MobileView>
            <div className="text-black">
              <div className="px-[2rem] relative flex flex-col gap-12 text-black bg-white mt-[15vh]">
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
                <div className="absolute  right-[0] bottom-[0px]  z-[0] mt-[0]">
                  <Icons.heroImg width={"500px"} />
                </div>
                <div className="absolute -right-16 bottom-1/2 z-[0] mt-[-120px]">
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
                    <Button label="Menu"></Button>
                    <div className="flex">
                      <Button variant="secondary" label="Call Us"></Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  gap-7 font-medium">
                  {" "}
                  <div className="flex bg-white justify-center w-full z-10 px-2 mt-80 rounded-lg border-dashed border-2 border-[#650002]">
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
              </div>{" "}
              <div className="flex justify-center w-screen z-[-1] mt-[90px]">
                <Image
                  src={separator}
                  width={1000}
                  height={40}
                  alt="sep"
                ></Image>
              </div>
              <div className="text-black mt-20">
                <div className="flex flex-col justify-center items-center gap-4 w-screen  ">
                  <div
                    ref={newSection}
                    className="w-full h-96 flex justify-center items-center relative overflow-hidden"
                  >
                    <div className="absolute left-[0vw] top-[5vh] z-[0]">
                      <Image
                        src={swirlyArrow}
                        alt="swirlyArrow"
                        width={300}
                        height={300}
                        className="rotate-[0deg] w-36"
                      />
                      <p>
                        <span
                          style={{
                            textShadow: "2px -2px 0px #650002",
                            WebkitTextStroke: "2px #650002",
                            WebkitTextFillColor: "transparent",
                          }}
                          className="text-[10vw] absolute -top-[5vh] left-10"
                        >
                          HYGENIC
                        </span>
                      </p>
                    </div>
                    <div className="absolute right-[0vw] bottom-[5vh] z-[0]">
                      <Image
                        src={swirlyArrow}
                        alt="swirlyArrow"
                        width={300}
                        height={300}
                        className="rotate-[180deg] w-36"
                      />
                      <p>
                        <span
                          style={{
                            textShadow: "2px -2px 0px #650002",
                            WebkitTextStroke: "2px #650002",
                            WebkitTextFillColor: "transparent",
                          }}
                          className="text-[8vw] absolute -bottom-[5vh] -left-10"
                        >
                          HEALTHY
                        </span>
                      </p>
                    </div>
                    <div
                      ref={paneerRefMobile}
                      className="absolute right-[0vw] top-[0vh] z-[30]"
                    >
                      <Image
                        src={paneer}
                        alt="paneer"
                        width={500}
                        height={500}
                        className="rotate-0"
                      />
                    </div>
                    <h1 className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2  text-[15vh] opacity-10">
                      #
                    </h1>
                    <h1 className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2  text-[15vh] opacity-10">
                      #
                    </h1>
                  </div>
                </div>{" "}
              </div>
              <PartyBookingSection />
            </div>
            <PricingPlans />
            <Contact />
            <Footer />
          </MobileView>
          <DesktopView>
            <div className="text-black">
              <div className="px-[5rem] flex flex-col gap-12 text-black  bg-transparent mt-[130px]">
                <div className="flex flex-col text-[40px] gap-1 font-extrabold">
                  <p>
                    EMBRACE THE
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
                    IN ESSENCE OF
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
                  <div className="flex gap-7">
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
                    <Button
                      label="Menu"
                      variant="primary"
                      onClick={() => alert("Primary Button Clicked")}
                    />

                    <div className="flex ">
                      <Button
                        label="Call Us"
                        variant="secondary"
                        onClick={() => alert("Secondary Button Clicked")}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  gap-7 font-medium">
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
              <div className="text-black">
                <div className="flex flex-col justify-center items-center gap-4 w-screen z-[-1] mt-[80px] mb-[200px]">
                  <div
                    ref={newSection}
                    className="w-full h-screen flex justify-center items-center relative overflow-hidden"
                  >
                    <div className="absolute left-[25vw] top-[25vh] z-[0]">
                      <Image
                        src={swirlyArrow}
                        alt="swirlyArrow"
                        width={300}
                        height={300}
                        className="rotate-[-250deg]"
                      />
                      <p>
                        <span
                          style={{
                            textShadow: "2px -2px 0px #650002",
                            WebkitTextStroke: "2px #650002",
                            WebkitTextFillColor: "transparent",
                          }}
                          className="text-[54px] absolute top-[25vh] -left-40"
                        >
                          HYGENIC
                        </span>
                      </p>
                    </div>
                    <div className="absolute right-[15vw] top-[25vh] z-[0]">
                      {" "}
                      <p>
                        <span
                          style={{
                            textShadow: "2px -2px 0px #650002",
                            WebkitTextStroke: "2px #650002",
                            WebkitTextFillColor: "transparent",
                          }}
                          className="text-[54px]  absolute -top-20 -right-20"
                        >
                          HEALTHY
                        </span>
                      </p>
                      <Image
                        src={swirlyArrow}
                        alt="swirlyArrow"
                        width={300}
                        height={300}
                        className="rotate-[250deg]"
                      />{" "}
                    </div>
                    <h1 className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2  text-[75vh] opacity-10">
                      #
                    </h1>
                    <h1 className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2  text-[75vh] opacity-10">
                      #
                    </h1>
                  </div>
                </div>
                <PartyBookingSection />
              </div>
              <div
                ref={paneerRefDesktop}
                className="absolute right-[25vw] top-[27vh] z-[30]"
              >
                <Image
                  src={paneer}
                  alt="paneer"
                  width={150}
                  height={150}
                  className="rotate-45"
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
            <PricingPlans />
            <Contact />
            <Footer />
          </DesktopView>
        </div>
      </div>
    </>
  );
};

export default Home;
