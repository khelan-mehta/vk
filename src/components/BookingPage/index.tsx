"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { format, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import axios from "axios"; // Import Axios

interface Booking {
  _id: string;
  userId: string;
  banquetId: string;
  bookingDate: string; // ISO string format for date
  totalAmount: number;
  amountPaid: number;
  remainingBalance: number;
  status: string;
  createdAt: string;
}

interface Banquet {
  _id: string;
  name: string;
}

const BookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [banquets, setBanquets] = useState<Banquet[]>([]);
  const [selectedBanquet, setSelectedBanquet] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<string>("");
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  // Fetch banquet data
  useEffect(() => {
    const fetchBanquets = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/banquets`,
        );
        setBanquets(response.data);
      } catch (error) {
        console.error("Error fetching banquets:", error);
      }
    };

    fetchBanquets();
  }, []);

  // Fetch bookings based on filters
  const fetchFilteredBookings = async (payload: {
    bookingDate: string;
    banquetId: string;
    status: string;
    restaurantId: string | null;
  }) => {
    console.log(payload);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings/filters`,
        {
          params: payload, // Send payload as query parameters
        },
      );

      if (Array.isArray(response.data)) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error("Error fetching filtered bookings:", error);
    }
  };

  // Trigger fetching filtered bookings when banquet, status, or date changes
  useEffect(() => {
    const payload = {
      bookingDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      banquetId: selectedBanquet,
      status,
      restaurantId: localStorage.getItem("_rid"),
    };

    fetchFilteredBookings(payload);
  }, [selectedBanquet, selectedDate, status]);

  // Fetch initial bookings with empty payload
  useEffect(() => {
    fetchFilteredBookings({
      bookingDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      banquetId: selectedBanquet ? selectedBanquet : "",
      status,
      restaurantId: localStorage.getItem("_rid"),
    }); // Fetch bookings with an empty payload initially
  }, []);

  // Toggle booking details view
  const toggleBookingDetails = (bookingId: string) => {
    setActiveBookingId(activeBookingId === bookingId ? null : bookingId);
  };

  return (
    <div className="w-[80%] sm:w-[100%]">
      <h1 className="mb-4 text-2xl font-bold">Bookings</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <label htmlFor="banquet" className="mb-2 block text-sm font-medium">
            Banquet Hall:
          </label>
          <select
            id="banquet"
            value={selectedBanquet}
            onChange={(e) => setSelectedBanquet(e.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="">All</option>
            {banquets
              .filter((banquet: any) => !banquet.isDeleted)
              .map((banquet) => (
                <option key={banquet._id} value={banquet._id}>
                  {banquet.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Booking Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Display bookings */}
      <div className="flex w-full flex-col-reverse justify-between gap-2 sm:flex-row">
        <div className="mt-4 flex h-fit sm:w-3/4">
          <div className="flex-1 px-4">
            <div className="mx-auto max-w-7xl rounded-3xl border shadow-md">
              <div className="container mx-auto ">
                <table className="min-w-full overflow-hidden rounded-3xl">
                  <thead className="bg-greenBlueCustom-3">
                    <tr className="text-left">
                      <th className="px-4 py-3 text-white">#</th>
                      <th className="px-4 py-3 text-white">Booking Date</th>
                      <th className="px-4 py-3 text-white">Amount Paid</th>
                      <th className="px-4 py-3 text-white">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <React.Fragment key={booking._id}>
                        <tr
                          className={`cursor-pointer border-t`}
                          onClick={() => toggleBookingDetails(booking._id)}
                        >
                          <td className="px-4 py-3">{index + 1}</td>
                          <td className="px-4 py-3">
                            {format(
                              parseISO(booking.bookingDate),
                              "dd MMM, yyyy",
                            )}
                          </td>
                          <td className="px-4 py-3">{booking.amountPaid}</td>
                          <td className="px-4 py-3">
                            <ChevronDown
                              className={`cursor-pointer text-black transition-transform duration-300 ${
                                activeBookingId === booking._id
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </td>
                        </tr>
                        <AnimatePresence>
                          {activeBookingId === booking._id && (
                            <motion.tr
                              className="border-t"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <td colSpan={4}>
                                <div className="rounded-3xl p-4">
                                  <h3 className="mb-2 text-lg font-semibold text-black-2">
                                    Booking Details
                                  </h3>
                                  <table className="w-full">
                                    <thead>
                                      <tr className="text-left">
                                        <th className="px-6 py-4 text-lg font-semibold text-black-2">
                                          Item
                                        </th>
                                        <th className="px-5 py-4 text-right text-black-2">
                                          Value
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                      {Object.entries(booking)
                                        .slice(0, -1)
                                        .map(([key, value], index) => (
                                          <tr key={index}>
                                            <td className="bg-white px-6 py-4 font-semibold text-[gray]">
                                              {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                            </td>
                                            <td className="px-5 py-4 text-right font-semibold text-black-2">
                                              {typeof value === "object"
                                                ? JSON.stringify(value)
                                                : key === "createdAt" ||
                                                    key === "updatedAt"
                                                  ? format(
                                                      new Date(value),
                                                      "dd MMM, yyyy",
                                                    )
                                                  : value}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                  <div className="mt-4 flex justify-between gap-4">
                                    <div
                                      className={`rounded px-2 py-1 text-white ${
                                        booking.status === "Accepted"
                                          ? "bg-green-500"
                                          : booking.status === "Pending"
                                            ? "bg-yellow-500"
                                            : booking.status === "Cancelled"
                                              ? "bg-red-500"
                                              : "bg-gray-500"
                                      }`}
                                    >
                                      Status: {booking.status}
                                    </div>
                                    <div>
                                      Remaining Balance:{" "}
                                      {booking.remainingBalance}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Date Picker */}
        <div className="w-[350px] flex-1 rounded-[15px] border-2 border-orangeCustom-3 p-2 sm:w-[380px]">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className=" rounded-md "
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
