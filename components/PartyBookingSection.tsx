import React from "react";
import PartyBooking from "./PartyBooking";
import MobileView from "./views/mobileView";
import DesktopView from "./views/desktopView";

const PartyBookingSection = () => {
  return (
    <>
      {/* Desktop View */}
      <DesktopView>
        <div className="hidden lg:flex flex-col justify-center items-center gap-4 w-screen z-[-1]">
          <div className="w-[80%] h-[79vh] overflow-y-hidden z-[1] overflow-x-scroll customScrollBar2 flex rounded-[20px] relative">
            <div className="flex w-[500vw]">
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
            <div className="bg-[transparent] border-solid border-[#f7866433] border-2 z-[0] h-[56vh] absolute top-[-59vh] left-[10%] rounded-[20px]" />
            <div className="bg-[#6500020c] z-[0] h-[56vh] absolute top-[-73vh] left-[10%] rounded-[20px]" />
          </div>
        </div>
      </DesktopView>

      {/* Mobile View */}
      <MobileView>
        <div className="flex lg:hidden rounded-xl  border-2 border-black mx-5 my-12 flex-col justify-center items-center gap-4  z-[-1]">
          <div className="w-[90%] h-[80vh] overflow-y-auto z-[1] flex flex-col gap-12 rounded-[20px] relative">
            <PartyBooking />
            <PartyBooking />
            <PartyBooking />
            <PartyBooking />
          </div>
        </div>
      </MobileView>
    </>
  );
};

export default PartyBookingSection;
