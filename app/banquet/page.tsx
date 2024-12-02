"use client";
import requests from "@/lib/requests";
import { useEffect, useState } from "react";
import ErrorAlert from "@/components/ErrorAlert";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Hall {
  _id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  description: string;
  isAvailable: boolean;
}

const BanquetsPage = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | Error>(null);
  const [selectedHallId, setSelectedHallId] = useState<Hall | null>(null);
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await requests.get<Hall[]>("/banquets");
        setHalls(response.filter((hall: Hall) => hall.isAvailable));
      } catch (error) {
        setError(`Error fetching halls ${error}`);
        console.error("Error fetching halls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  // const handleBookNow = (banquetId: string) => {
  //   router.push("/inquiry", { banquetId });
  // };
  return (
    <div className="container mt-32 mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Halls for Booking</h1>
      {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {halls.map((hall) => (
          <div key={hall._id} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold">{hall.name}</h2>
            <p className="text-gray-600">Capacity: {hall.capacity}</p>
            <p className="text-gray-600">Price: ₹{hall.price}</p>
            <p className="mt-2">{hall.description}</p>
            <h3 className="font-semibold mt-4">Amenities:</h3>
            <ul className="list-disc list-inside">
              {hall.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
            <Link href={`inquiry?banquetId=${hall._id}`}>
              <button
                className="mt-4 bg-[#650002] text-white py-2 px-4 rounded"
                // onClick={() => handleBookNow(hall._id)}
              >
                Book Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BanquetsPage;
