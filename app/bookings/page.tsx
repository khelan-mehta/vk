"use client";

import { useEffect, useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";

interface Booking {
  _id: string;
  userId: string;
  banquetId: string;
  status: string;
  bookingDate: string;
  paymentAmount: number;
  paymentStatus: string;
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null | Error>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3001/bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(
          ("Error fetching bookings: " + error) as string | null | Error
        );
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="mt-32 max-w-4xl mx-auto p-4 bg-white border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Banquet ID</th>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Booking Date</th>
            <th className="border px-4 py-2">Payment Amount</th>
            <th className="border px-4 py-2">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{booking.banquetId}</td>
              <td className="border px-4 py-2">{booking.userId}</td>
              <td className="border px-4 py-2">
                {new Date(booking.bookingDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{booking.paymentAmount}</td>
              <td className="border px-4 py-2">{booking.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsPage;
