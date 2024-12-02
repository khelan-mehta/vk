"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";

const Billing = () => {
  return (
    <div className="flex mt-32 w-full bg-white">
      {/* Sidebar */}
      <Sidebar activeItem="billing" /> {/* Set active item to billing */}
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-12 lg:py-8 flex-1">
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 mx-auto border shadow-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 lg:mb-8 text-[#650000]">
              Billing and Payment
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Next Billing Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className=" py-1 flex items-center justify-center sm:px-4 sm:py-2 whitespace-nowrap">
                      <div className="my-4 relative">
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
                          Gold Member
                        </span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-30 blur-md"></div>
                      </div>
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      Active
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      Sep 30, 2024
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
