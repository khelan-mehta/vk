"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingForm from "../../../components/BookingForm";
import ErrorAlert from "@/components/ErrorAlert";

interface Banquet {
  _id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  description: string;
  isAvailable: boolean;
}

const BanquetDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [banquet, setBanquet] = useState<Banquet | null>(null);
  const [error, setError] = useState<string | null | Error>(null);

  useEffect(() => {
    const fetchBanquetDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:3001/banquets/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBanquet(data);
      } catch (error) {
        setError(`Error fetching banquet details for ID ${id}: ${error}`);
        console.error("Error fetching banquet details:", error);
      }
    };

    fetchBanquetDetails();
  }, [id]);

  if (!banquet) {
    return <div className="mt-32 text-center">Loading...</div>;
  }

  return (
    <div className="mt-32 max-w-2xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
      {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
      <h1 className="text-2xl font-bold mb-4">{banquet?.name}</h1>
      <p className="text-lg">Capacity: {banquet?.capacity}</p>
      <p className="text-lg">Price: ₹{banquet?.price}</p>
      <h2 className="text-xl font-semibold mt-4">Amenities:</h2>
      <ul className="list-disc list-inside mb-4">
        {banquet?.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      <p className="mb-4">{banquet?.description}</p>
      <p className="font-semibold">
        Availability:{" "}
        {banquet?.isAvailable ? (
          <span className="text-green-500">Available</span>
        ) : (
          <span className="text-red-500">Not Available</span>
        )}
      </p>

      {/* Include the Booking Form */}
      {banquet?.isAvailable && <BookingForm banquetId={banquet?._id} />}
    </div>
  );
};

export default BanquetDetailsPage;
