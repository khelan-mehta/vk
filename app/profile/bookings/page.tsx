"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { format } from "date-fns";
import { CalendarDays, Clock, User, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaymentHistoryTable from "@/components/PaymentHistoryTable"; // Import the PaymentHistoryTable component

// Define types for Booking and PaymentHistory
export interface PaymentHistory {
  amountPaid: number;
  paymentDate: Date;
  transactionId?: string;
}

export interface Booking {
  _id: string;
  userId: string;
  banquetId: string;
  restaurantId: string;
  status: "Accepted" | "Cancelled";
  bookingDate: Date;
  functionDate: Date;
  duration?: number;
  startTime?: string;
  totalAmount: number;
  amountPaid: number;
  remainingBalance: number;
  paymentStatus?: "Pending" | "Completed";
  paymentHistory: PaymentHistory[];
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, selectedDate]);

  const formattedDate = selectedDate
    ? new Date(selectedDate.setUTCHours(0, 0, 0, 0)).toISOString()
    : null;

  const fetchBookings = async () => {
    try {
      const response = await axios.get<Booking[]>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}bookings/filters`,
        {
          params: {
            status: statusFilter,
            bookingDate: formattedDate ? formattedDate : "",
            restaurantId: "671f29d1302bf0abe9f58485",
          },
        }
      );
      setBookings(response.data);
      setFilteredBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const togglePaymentHistory = (bookingId: string) => {
    setExpandedBookingId((prev) => (prev === bookingId ? null : bookingId));
  };

  return (
    <div className="flex flex-col md:flex-row h-fit pt-32 bg-white">
      <Sidebar activeItem="bookings" />
      <div className="flex-1 px-4">
        <div className="bg-white rounded-3xl p-4 md:p-8 max-w-7xl mx-auto border shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-[#650000]">
            Booking History
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              {/* Date Picker for Booking Date */}
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="px-4 py-2 w-full md:w-96 border rounded-full mr-2"
                placeholderText="Select booking date"
              />
              <select
                className="px-4 py-2 border rounded-full bg-white text-[#650000] focus:outline-none"
                value={statusFilter}
                onChange={handleStatusFilter}
              >
                <option value="">All Bookings</option>
                <option value="Accepted">Accepted Bookings</option>
                <option value="Cancelled">Cancelled Bookings</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg flex flex-col p-4 border border-[#65000022]"
              >
                <div className="flex items-center mb-4">
                  <CalendarDays size={24} className="text-[#650000] mr-2" />
                  <span className="font-semibold">
                    {format(new Date(booking.functionDate), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      booking.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <CreditCard size={24} className="text-[#650000] mr-2" />
                  <span>₹{booking.totalAmount}</span>
                </div>
                <div className="flex items-center mb-4">
                  <Clock size={24} className="text-[#650000] mr-2" />
                  <span>{booking.startTime}</span>
                </div>
                <div className="flex items-center mb-4">
                  <User size={24} className="text-[#650000] mr-2" />
                  <span>{booking.duration} Hour(s)</span>
                </div>

                {/* Toggle Button for Payment History */}
                <div
                  onClick={() => togglePaymentHistory(booking._id)}
                  className="flex items-center cursor-pointer text-[#650000] mb-4"
                >
                  <span className="font-semibold">Payment History</span>
                  {expandedBookingId === booking._id ? (
                    <ChevronUp size={24} className="ml-2" />
                  ) : (
                    <ChevronDown size={24} className="ml-2" />
                  )}
                </div>

                {/* Payment History Table */}
                {expandedBookingId === booking._id && (
                  <PaymentHistoryTable paymentHistory={booking.paymentHistory} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
