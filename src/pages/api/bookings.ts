// pages/api/bookings.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dummyBookings = [
    {
      _id: "1",
      userId: "user456",
      banquetId: "banquet789",
      status: "Confirmed",
      bookingDate: "2024-10-10",
      totalAmount: 5000,
      amountPaid: 3000,
      remainingBalance: 2000,
      paymentHistory: [
        { amountPaid: 3000, paymentDate: "2024-09-13", transactionId: "tx123" },
      ],
    },
    {
      _id: "2",
      userId: "user999",
      banquetId: "banquet321",
      status: "Pending",
      bookingDate: "2024-09-25",
      totalAmount: 7000,
      amountPaid: 2000,
      remainingBalance: 5000,
      paymentHistory: [
        { amountPaid: 2000, paymentDate: "2024-09-25", transactionId: "tx999" },
      ],
    },
  ];

  res.status(200).json(dummyBookings);
}
