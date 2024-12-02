// pages/booking.tsx
"use client";

import { useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";

const BookingPage = () => {
  const [userId, setUserId] = useState("");
  const [banquetId, setBanquetId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [error, setError] = useState<string | null | Error>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          banquetId,
          bookingDate,
          paymentAmount,
          paymentStatus,
        }),
      });
      if (response.ok) {
        console.log("Booking created");
      } else {
        console.error("Error creating booking");
      }
    } catch (error) {
      setError(("error creating bookings: " + error) as string | null | Error);
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div className="mt-32 max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6">Booking Form</h1>
      {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User ID:
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Banquet ID:
          </label>
          <input
            type="text"
            value={banquetId}
            onChange={(e) => setBanquetId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Booking Date:
          </label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Amount:
          </label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Status:
          </label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            required
          >
            <option value="">Select payment status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
