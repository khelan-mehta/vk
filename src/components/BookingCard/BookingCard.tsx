import React from "react";

interface BookingCardProps {
  booking: {
    _id: string;
    userId: string;
    banquetId: string;
    status: string;
    bookingDate: string;
    totalAmount: number;
    amountPaid: number;
    remainingBalance: number;
  };
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="text-lg font-bold">{booking.status}</h3>
      <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
      <p>Total Amount: ${booking.totalAmount}</p>
      <p>Amount Paid: ${booking.amountPaid}</p>
      <p>Remaining Balance: ${booking.remainingBalance}</p>
      <p>User ID: {booking.userId}</p>
      <p>Banquet ID: {booking.banquetId}</p>
    </div>
  );
};

export default BookingCard;
