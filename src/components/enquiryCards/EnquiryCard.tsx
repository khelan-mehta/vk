// components/InquiryCard.tsx

// import { useState } from "react";

// type Inquiry = {
//   id: string;
//   date: string;
//   brief: string;
//   details: string;
// };

// type InquiryCardProps = {
//   inquiry: Inquiry;
// };

// const EnquiryCard: React.FC<InquiryCardProps> = ({ inquiry }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <div className="mb-4 transform rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105">
//       <div className="mb-2 flex items-center justify-between">
//         <div className="text-lg font-bold">{inquiry.date}</div>
//         <button
//           className="text-sm text-orange-500 hover:text-orange-700 focus:outline-none"
//           onClick={toggleExpand}
//         >
//           {expanded ? "Close Details" : "View Details"}
//         </button>
//       </div>
//       <div className={`${expanded ? "block" : "hidden"} text-gray-700 mt-2`}>
//         {inquiry.details}
//       </div>
//     </div>
//   );
// };

// export default EnquiryCard;

// import React from "react";

// interface EnquiryCardProps {
//   inquiry: {
//     _id: string;
//     userId: string;
//     banquetId: string;
//     status: string;
//     inquiryDate: string;
//     desiredBookingDate: string;
//   };
// }

// const EnquiryCard: React.FC<EnquiryCardProps> = ({ inquiry }) => {
//   return (
//     <div className="rounded-lg bg-white p-4 shadow">
//       <h3 className="text-lg font-bold">{inquiry.status}</h3>
//       <p>Inquiry Date: {new Date(inquiry.inquiryDate).toLocaleDateString()}</p>
//       <p>
//         Desired Booking Date:{" "}
//         {new Date(inquiry.desiredBookingDate).toLocaleDateString()}
//       </p>
//       <p>User ID: {inquiry.userId}</p>
//       <p>Banquet ID: {inquiry.banquetId}</p>
//     </div>
//   );
// };

// export default EnquiryCard;

import React, { useState } from "react";

interface EnquiryCardProps {
  inquiry: {
    _id: string;
    userId: string;
    banquetId: string;
    status: string;
    inquiryDate: string;
    desiredBookingDate: string;
  };
  onBookingConfirm: (bookingDetails: any) => void;
  onCancel: (inquiryId: string) => void;
}

const EnquiryCard: React.FC<EnquiryCardProps> = ({
  inquiry,
  onBookingConfirm,
  onCancel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const handleConfirmClick = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingDetails = {
      inquiryId: inquiry._id,
      bookingDate,
      totalAmount,
      amountPaid,
      status: "Accepted", // Set status to Accepted
      banquetId: inquiry.banquetId,
      userId: inquiry.userId,
    };
    onBookingConfirm(bookingDetails);
    setIsModalOpen(false); // Close the modal after submitting
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="text-lg font-bold">{inquiry.status}</h3>
      <p>Inquiry Date: {new Date(inquiry.inquiryDate).toLocaleDateString()}</p>
      <p>
        Desired Booking Date:{" "}
        {new Date(inquiry.desiredBookingDate).toLocaleDateString()}
      </p>
      <p>User ID: {inquiry.userId}</p>
      <p>Banquet ID: {inquiry.banquetId}</p>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleConfirmClick}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Confirm Booking
        </button>
        <button
          onClick={() => onCancel(inquiry._id)}
          className="rounded bg-red px-4 py-2 text-white"
        >
          Reject
        </button>
      </div>

      {/* Modal for confirming booking */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold">Confirm Booking</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="bookingDate"
                  className="block text-sm font-medium"
                >
                  Booking Date:
                </label>
                <input
                  type="date"
                  id="bookingDate"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full rounded border p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="totalAmount"
                  className="block text-sm font-medium"
                >
                  Total Amount:
                </label>
                <input
                  type="number"
                  id="totalAmount"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full rounded border p-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="amountPaid"
                  className="block text-sm font-medium"
                >
                  Amount Paid:
                </label>
                <input
                  type="number"
                  id="amountPaid"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  className="w-full rounded border p-2"
                  required
                />
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 rounded px-4 py-2 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-green-500 px-4 py-2 text-white"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryCard;
