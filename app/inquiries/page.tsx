// pages/inquiries.tsx
"use client";

import { useEffect, useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";

interface Inquiry {
  _id: string;
  userId: string;
  banquetId: string;
  status: string;
  inquiryDate: string;
  desiredBookingDate?: string;
}

const InquiriesPage: React.FC = () => {
  const [error, setError] = useState<string | null | Error>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch("http://localhost:3001/inquiries");
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        setError(
          ("Error fetching inquiries: " + error) as string | null | Error
        );
        console.error("Error fetching inquiries:", error);
      }
    };
    fetchInquiries();
  }, []);

  return (
    <div className="mt-32 max-w-4xl mx-auto p-4 bg-white border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Inquiries</h1>
      {error && <ErrorAlert error={error} onClose={() => setError(null)} />}F
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Banquet ID</th>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Inquiry Date</th>
            <th className="border px-4 py-2">Desired Booking Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{inquiry.banquetId}</td>
              <td className="border px-4 py-2">{inquiry.userId}</td>
              <td className="border px-4 py-2">
                {new Date(inquiry.inquiryDate).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                {inquiry.desiredBookingDate
                  ? new Date(inquiry.desiredBookingDate).toLocaleDateString()
                  : "-"}
              </td>
              <td className="border px-4 py-2">{inquiry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiriesPage;
