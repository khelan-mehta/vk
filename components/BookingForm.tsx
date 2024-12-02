// components/BookingForm.tsx
"use client";

import { useState } from "react";

interface BookingFormProps {
  banquetId: string; // Pass the banquet ID as a prop
}

const BookingForm: React.FC<BookingFormProps> = ({ banquetId }) => {
  const [userId, setUserId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [confirmationMessage, setConfirmationMessage] = useState("");

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
          numberOfGuests,
          paymentAmount,
          paymentStatus,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setConfirmationMessage(
          `Booking successful! Your booking ID is ${data._id}.`
        );
      } else {
        const errorData = await response.json();
        setConfirmationMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      setConfirmationMessage("An error occurred while creating the booking.");
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Booking Form</h2>
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
            Number of Guests:
          </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(Number(e.target.value))}
            min="1"
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </form>
      {confirmationMessage && (
        <p className="mt-4 text-green-500">{confirmationMessage}</p>
      )}
    </div>
  );
};

export default BookingForm;
