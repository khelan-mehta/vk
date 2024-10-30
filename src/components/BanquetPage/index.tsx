"use client";
import React, { useState, useEffect } from "react";
import BanquetForm from "../BanquetForm";
import BanquetCard from "../BanquetCard";
import axios from "axios";
import { toast } from "react-toastify";

interface Banquet {
  restaurantId: object;
  _id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  isAvailable: boolean;
  isDeleted: boolean;
  packages: { name: string; price: number }[];
  photos: string;
  type: string;
}
const BASE_URL = "https://server-staging.vercel.app";

const BanquetPage = () => {
  const [banquets, setBanquets] = useState<Banquet[]>([]);
  const [editingBanquet, setEditingBanquet] = useState<Banquet | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch all banquets from API on component mount
  useEffect(() => {
    const fetchBanquets = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/banquets`);
        setBanquets(response.data);
      } catch (error: any) {
        console.error(
          "Error fetching banquets:",
          error.response?.data || error.message,
        );
      }
    };

    fetchBanquets();
  }, []);

  const createBanquetAPI = async (banquet: Banquet) => {
    try {
      const { photos, type, packages, _id, restaurantId, ...restBanquet } =
        banquet;

      const payload = {
        ...restBanquet,
        restaurantId: localStorage.getItem("_rid"),
        amenities: banquet.amenities,
        isAvailable: banquet.isAvailable || true,
        isDeleted: banquet.isDeleted || false,
        type: banquet.type || "Banquet",
        packages: banquet.packages,
        imgUrl: banquet.photos,
      };

      const response = await axios.post(`${BASE_URL}/banquets`, payload);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating banquet:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  const updateBanquetAPI = async (banquet: Banquet) => {
    try {
      const { photos, type, packages, ...restBanquet } = banquet;
      const payload = {
        ...restBanquet,
        updatedAt: new Date().toISOString(),
        description: "Banquet Description",
        amenities: banquet.amenities,
      };

      const response = await axios.put(
        `${BASE_URL}/banquets/${banquet._id}`,
        payload,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error updating banquet:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  const handleSaveBanquet = async (banquet: Banquet) => {
    try {
      let savedBanquet: Banquet;
      if (editingBanquet) {
        savedBanquet = await updateBanquetAPI(banquet);
        setBanquets((prevBanquets) =>
          prevBanquets.map((b) =>
            b._id === savedBanquet._id ? savedBanquet : b,
          ),
        );
      } else {
        savedBanquet = await createBanquetAPI(banquet);
        setBanquets((prevBanquets) => [...prevBanquets, savedBanquet]);
      }

      setIsFormOpen(false);
      setEditingBanquet(null);
    } catch (error) {
      console.error("Failed to save banquet:", error);
    }
  };

  const handleEditBanquet = (_id: string) => {
    const banquet = banquets.find((b) => b._id === _id) || null;
    setEditingBanquet(banquet);
    setIsFormOpen(true);
  };

  const handleDeleteBanquet = async (_id: string) => {
    try {
      await axios.delete(`${BASE_URL}/banquets/${_id}`);
      setBanquets((prevBanquets) => prevBanquets.filter((b) => b._id !== _id));
    } catch (error: any) {
      console.error(
        "Error deleting banquet:",
        error.response?.data || error.message,
      );
    }
  };

  const handleAddBanquet = () => {
    setEditingBanquet(null);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Banquets</h1>
        <button
          onClick={handleAddBanquet}
          className="rounded border bg-greenBlueCustom-3 px-4 py-2 text-white transition duration-300 hover:border-greenBlueCustom-2 hover:bg-orangeCustom"
        >
          Add Banquet
        </button>
      </div>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4">
        {banquets
          .filter((banquet) => !banquet.isDeleted) // Only include banquets that are not deleted
          .slice()
          .reverse()
          .map((banquet) => (
            <BanquetCard
              key={banquet._id} // or banquet._id if that's the unique key in your data
              banquet={banquet}
              onDelete={handleDeleteBanquet}
              onEdit={handleEditBanquet}
            />
          ))}
      </div>

      {isFormOpen && (
        <BanquetForm
          banquet={editingBanquet}
          onSave={handleSaveBanquet}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default BanquetPage;
