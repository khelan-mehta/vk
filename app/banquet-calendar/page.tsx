"use client";

import { useEffect, useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";

interface Booking {
  _id: string;
  userId: string;
  banquetId: string;
  bookingDate: string;
}

const BanquetCalendar = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null | Error>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3001/bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(error as string | null | Error);
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const isDateBooked = (date: string) => {
    return bookings.some((booking) => booking.bookingDate === date);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div className="mt-32 max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white">
      {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
      <h2 className="text-2xl font-bold mb-4">Banquet Booking Calendar</h2>
      <p className="mb-4">This is a placeholder for the calendar.</p>
      {selectedDate && (
        <div>
          <p>Selected Date: {selectedDate}</p>
          <p>
            Availability:{" "}
            {isDateBooked(selectedDate) ? (
              <span className="text-red-500">Booked</span>
            ) : (
              <span className="text-green-500">Available</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default BanquetCalendar;
