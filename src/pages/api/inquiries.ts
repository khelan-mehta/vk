// pages/api/inquiries.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dummyInquiries = [
    {
      _id: "1",
      userId: "user123",
      banquetId: "banquet456",
      status: "Pending",
      inquiryDate: "2024-10-03",
      desiredBookingDate: "2024-10-15",
    },
    {
      _id: "2",
      userId: "user789",
      banquetId: "banquet123",
      status: "Accepted",
      inquiryDate: "2024-09-29",
      desiredBookingDate: "2024-10-10",
    },
    {
      _id: "3",
      userId: "user321",
      banquetId: "banquet456",
      status: "Pending",
      inquiryDate: "2024-10-03",
      desiredBookingDate: "2024-10-15",
    },
    {
      _id: "4",
      userId: "user987",
      banquetId: "banquet123",
      status: "Accepted",
      inquiryDate: "2024-09-29",
      desiredBookingDate: "2024-10-10",
    },
  ];

  res.status(200).json(dummyInquiries);
}
