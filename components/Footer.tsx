import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  PhoneCall,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
} from "lucide-react";
import { Icons } from "./Icons";
function Footer() {
  return (
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
                  Lunch: 11:00 to 3:30 PM
                </span>
              </li>
              <li className="flex items-center">
                <Clock size={14} className="mr-2" />
                <span className="whitespace-nowrap">
                  Dinner: 6:30 to 11:00 PM
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
                  <span>opp. Shiv Aradhana, Kuha, Gujarat - 382433</span>
                </div>
              </li>
              <li className="flex items-center">
                <Phone size={14} className="mr-4" />
                <span>+91 99250 38082</span>
              </li>
              <li className="flex items-center">
                <MailIcon size={14} className="mr-4" />
                <span>vaikunthvillagerestaurant@gmail.com</span>
              </li>
              <li className="flex items-center">
                <FacebookIcon
                  size={24}
                  className="mr-4 bg-blue-500 text-white rounded-full p-1"
                />
                <span>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/share/19GhYN3wrw/?mibextid=LQQJ4d"
                  >
                    Vaikunth Village Restaurant
                  </a>
                </span>
              </li>
              <li className="flex items-center">
                <InstagramIcon
                  size={24}
                  className="mr-4 bg-red-500 text-white rounded-full p-1"
                />
                <span>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/vaikunthvillagerestaurant/profilecard"
                  >
                    Insta Handle - Vaikunth VillageRestaurant
                  </a>
                </span>
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
  );
}

export default Footer;
