"use client";
import React, { useEffect, useState } from "react";
import InquiryCard from "../enquiryCards/EnquiryCard";
import axios from "axios";
import Tabs from "../Tabs/tabs";
import { Search } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Inquiry {
  _id: string;
  userId: string;
  banquetId: string;
  restaurantId: string;
  status: "Pending" | "Accepted" | "Rejected";
  inquiryDate: string;
  desiredBookingDate: string;
}

interface Banquet {
  _id: string;
  name: string;
}

const exampleTabs = [
  { id: 1, label: "Inquiry Date", content: "This is the Inquiry section." },
  { id: 2, label: "Booking Date", content: "This is the Booking section." },
];

const EnquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedBanquet, setSelectedBanquet] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState("Inquiry Date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [banquetHalls, setBanquetHalls] = useState<Banquet[]>([]);

  // Fetch banquet halls from API
  useEffect(() => {
    const fetchBanquetHalls = async () => {
      try {
        const response = await fetch(
          "https://server-staging.vercel.app/banquets",
        );
        const data = await response.json();
        setBanquetHalls(data);
      } catch (error) {
        console.error("Error fetching banquet halls:", error);
      }
    };

    fetchBanquetHalls();
  }, []);

  // Fetch inquiries from API with server-side filtering
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const restaurantId = localStorage.getItem("_rid") || "";
        const dateParam = selectedDate
          ? selectedDate.toISOString().split("T")[0]
          : null;

        const response = await axios.get(
          "https://server-staging.vercel.app/inquiries/filters",
          {
            params: {
              status: selectedStatus,
              banquetId: selectedBanquet || "",
              desiredBookingDate:
                selectedTab === "Booking Date" ? dateParam : "",
              inquiryDate: selectedTab === "Inquiry Date" ? dateParam : "",
              restaurantId,
            },
          },
        );

        setInquiries(response.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, [selectedBanquet, selectedDate, selectedTab, selectedStatus]);

  // Handle booking confirmation
  const handleBookingConfirm = async (bookingDetails: any) => {
    try {
      await axios.post(
        "https://server-staging.vercel.app/bookings",
        bookingDetails,
      );
      // Remove the inquiry after confirming the booking
      setInquiries((prev) =>
        prev.filter((inquiry) => inquiry._id !== bookingDetails.inquiryId),
      );
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: { id: number; label: string }) => {
    setSelectedTab(tab.label);
  };

  // Handle inquiry cancellation
  const handleCancel = async (inquiryId: string) => {
    try {
      await axios.delete(
        `https://server-staging.vercel.app/inquiries/${inquiryId}`,
      );
      // Remove the canceled inquiry
      setInquiries((prev) =>
        prev.filter((inquiry) => inquiry._id !== inquiryId),
      );
    } catch (error) {
      console.error("Error canceling inquiry:", error);
    }
  };

  // Handle date selection from DayPicker
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex w-[370px] flex-col p-6 sm:w-[90%] ">
      <h1 className="mb-4 text-2xl font-bold">Enquiries</h1>

      <div className="ml-[-20px] flex flex-col gap-4 sm:ml-0">
        <label htmlFor="banquet" className="mb-2 block text-sm font-medium">
          Banquet Hall:
        </label>
        <div className="flex w-full gap-4">
          <select
            id="banquet"
            value={selectedBanquet}
            onChange={(e) => setSelectedBanquet(e.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="">All</option>
            {banquetHalls
              .filter((banquet: any) => !banquet.isDeleted)
              .map((banquet) => (
                <option key={banquet._id} value={banquet._id}>
                  {banquet.name}
                </option>
              ))}
          </select>
          <button className="flex items-center justify-center rounded bg-greenBlueCustom-3 p-2 text-white">
            <Search />
          </button>
        </div>

        <label htmlFor="status" className="mb-2 block text-sm font-medium">
          Status:
        </label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="">All</option>
          <option value="Accepted">Accepted</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:justify-between">
        <div className="mx-2 ml-[-20px] flex w-[340px] flex-col sm:ml-0 sm:w-auto">
          <Tabs
            tabs={exampleTabs}
            defaultActiveId={1}
            onTabChange={handleTabChange}
          />
          <div className="mt-2 w-full sm:w-[350px]">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="mt-4 w-[340px] rounded-lg border-2 border-orangeCustom-3 bg-transparent p-2 text-black-2 shadow sm:ml-0 sm:p-4"
            />
          </div>
        </div>

        <div className="ml-[-30px] mt-4 flex w-[350px] flex-col gap-2 rounded-lg bg-white p-2 sm:ml-0 sm:w-1/2 sm:p-3">
          {inquiries.length > 0 ? (
            inquiries.map((inquiry) => (
              <InquiryCard
                key={inquiry._id}
                inquiry={inquiry}
                onBookingConfirm={handleBookingConfirm}
                onCancel={handleCancel}
              />
            ))
          ) : (
            <p className="text-center">
              No inquiries found matching the filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiriesPage;
