// components/PartyBooking.js
import Image from "next/image";
import balloons from "../public/balloons.png";
import graph1 from "../public/graph 1.png";
import mG from "../public/Mask group.png";
import MobileView from "./views/mobileView";
import TabView from "./views/tabView";
import DesktopView from "./views/desktopView";
import Link from "next/link";

const PartyBooking = () => {
  return (
    <>
      <MobileView>
        <div className="flex py-[2rem] w-[80vw]  ">
          <div className="flex flex-col w-full p-3 rounded-[10px] h-[60vh] m-3">
            <div className="flex gap-12 ">
              <div className="flex gap-6">
                <div className="flex relative rounded-[50%] w-[100px] h-[100px] border-solid border-[#f7866433] border-2 p-8">
                  <Image
                    src={balloons}
                    alt="balloon"
                    width={40}
                    height={1}
                    className="self-start absolute left-4 z-[1]"
                  />
                  <Image
                    src={graph1}
                    alt="balloon"
                    width={90}
                    height={1}
                    className="self-start absolute top-1 z-[0] left-1"
                  />
                </div>
                <div className="text-[40px] text-[#650002] self-center lancelot-regular font-bold">
                  Party Bookings
                </div>
              </div>
            </div>
            <div className="text-left mt-3 lato-light w-[100%] text-[22px] ">
              Whether you&apos;re planning an intimate gathering or a grand
              celebration, our dedicated team ensures a memorable experience
              with personalized party booking services. At Vaikunth, indulge in
              exquisite cuisine while basking in the harmonious spirit of divine
              heritage.
            </div>
            <Link href="/booking">
              <button className="bg-[#650002] p-3  rounded-lg text-white mt-4">
                Book
              </button>
            </Link>
          </div>
          <div className="flex">
            <Image src={mG} alt="mg" className="hidden" />
          </div>
        </div>
      </MobileView>
      <TabView>
        <div className="flex py-[2rem] w-[80vw]  ">
          <div className="flex flex-col w-full p-3 rounded-[10px] h-[60vh] m-3">
            <div className="flex gap-12 ">
              <div className="flex gap-6">
                <div className="flex relative rounded-[50%] w-[100px] h-[100px] border-solid border-[#f7866433] border-2 p-8">
                  <Image
                    src={balloons}
                    alt="balloon"
                    width={40}
                    height={1}
                    className="self-start absolute left-4 z-[1]"
                  />
                  <Image
                    src={graph1}
                    alt="balloon"
                    width={90}
                    height={1}
                    className="self-start absolute top-1 z-[0] left-1"
                  />
                </div>
                <div className="text-[40px] text-[#650002] self-center lancelot-regular font-bold">
                  Party Bookings
                </div>
              </div>
            </div>
            <div className="text-left mt-3 lato-light w-[100%] text-[22px] ">
              Whether you&apos;re planning an intimate gathering or a grand
              celebration, our dedicated team ensures a memorable experience
              with personalized party booking services. At Vaikunth, indulge in
              exquisite cuisine while basking in the harmonious spirit of divine
              heritage.
            </div>
            <Link href="/booking">
              <button className="bg-[#650002] p-3  rounded-lg text-white mt-4">
                Book
              </button> 
            </Link>
          </div>
          <div className="flex">
            <Image src={mG} alt="mg" className="hidden" />
          </div>
        </div>
      </TabView>
      <DesktopView>
        <div className="flex p-[5rem] py-[2rem] w-[80vw]  ">
          <div className="flex flex-col w-full  p-3 rounded-[10px] h-[60vh] m-3">
            <div className="flex gap-12 ">
              <div className="flex gap-6">
                <div className="flex relative rounded-[50%] w-[100px] h-[100px] border-solid border-[#f7866433] border-2 p-8">
                  <Image
                    src={balloons}
                    alt="balloon"
                    width={40}
                    height={1}
                    className="self-start absolute left-4 z-[1]"
                  />
                  <Image
                    src={graph1}
                    alt="balloon"
                    width={90}
                    height={1}
                    className="self-start absolute top-1 z-[0] left-1"
                  />
                </div>
                <div className="text-[40px] text-[#650002] self-center lancelot-regular font-bold">
                  Party Bookings
                </div>
              </div>
            </div>
            <div className="text-left mt-3 lato-light w-[100%] text-[22px] ">
              Whether you&apos;re planning an intimate gathering or a grand
              celebration, our dedicated team ensures a memorable experience
              with personalized party booking services. At Vaikunth, indulge in
              exquisite cuisine while basking in the harmonious spirit of divine
              heritage.
            </div>
            <Link href="/booking">
              <button className="bg-[#650002] p-3 w-[10vw] rounded-lg text-white mt-4">
                Book
              </button>
            </Link>
          </div>
          <div className="flex">
            <Image
              src={mG}
              alt="mg"
              width={1100}
              height={90}
              className="h-[60vh]"
            />
          </div>
        </div>
      </DesktopView>
    </>
  );
};

export default PartyBooking;
