import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // import icons for toggle

interface PaymentHistory {
  amountPaid: number;
  paymentDate: Date;
  transactionId?: string;
}

interface PaymentHistoryTableProps {
  paymentHistory: PaymentHistory[];
}

const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
  paymentHistory,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTable = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4 border border-black rounded-md border-dashed ">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleTable}
      ></div>

      <div className="overflow-hidden transition-all duration-300 mt-2">
        <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="">
            <tr>
              <th className="p-3 text-sm font-bold">Amount Paid</th>
              <th className="p-3 text-sm font-bold">Date</th>
              <th className="p-3 text-sm font-bold">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "" : "bg-white"}`}
              >
                <td className="p-3 text-gray-800 font-medium">
                  ₹{payment.amountPaid.toFixed(2)}
                </td>
                <td className="p-3 text-gray-800">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>
                <td className="p-3 text-gray-800">
                  {payment.transactionId || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
