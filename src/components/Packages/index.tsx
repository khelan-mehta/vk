"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import Client from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import {
  getAuthData,
  getAuthHeaders,
  isAuthenticated,
  isResAuthenticated,
} from "@/utils/authUtils";
import axios from "axios";

interface Package {
  _id: string;
  restaurantId: string;
  veg: boolean;
  price: Number;
  starter: string[];
  maincourse: string[];
  dessert: string[];
  drinks: string[];
  extras: string[];
  isDeleted: boolean;
}

const getRestaurantId = () => {
  if (typeof window !== "undefined") {
    try {
      const authData = getAuthData() as any;
      if (authData) {
        return authData._rid;
      }
    } catch (error) {
      console.error("Error getting restaurant ID:", error);
    }
  }
  return null;
};
const baseUrl = "https://server-staging.vercel.app";
const apiClient = new Client(
  { timeout: 5000 },
  null,
  false,
  false,
  process.env.API_BASE_URL,
);
const accessToken = localStorage.getItem("access_token");
const Packages: React.FC = () => {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);

  // const handleItemChange = (key: keyof Package, items: string[]) => {
  //   setNewPackage({
  //     ...newPackage,
  //     [key]: items,
  //   });
  // };
  
  const handleItemChange = (
    key: keyof Package,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newItems = event.target.value.split(",").map((item) => item.trim());
    setNewPackage({
      ...newPackage,
      [key]: newItems,
    });
  };

  // const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newPackage, setNewPackage] = useState<Partial<Package>>({
    veg: false,
    price: 0,
    starter: [],
    maincourse: [],
    dessert: [],
    drinks: [],
    extras: [],
    isDeleted: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantId, setRestaurantId] = useState<string | null>(
    localStorage.getItem("_rid"),
  );

  useEffect(() => {
    if (!isAuthenticated() || !isResAuthenticated()) {
      return router.push("/auth/signin");
    } else {
      getAuthHeaders();
    }
    const initializeComponent = async () => {
      // const id = getRestaurantId();
      const id = restaurantId;
      setRestaurantId(id);
      if (id) {
        await fetchPackages();
      }
    };
    initializeComponent();
  }, []);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const headers = getAuthHeaders();
      const response = await axios.get(`${baseUrl}/packages`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          _oid: `${localStorage.getItem("_oid")}`,
          _rid: `${localStorage.getItem("_rid")}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setPackages(response.data.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setError("Failed to fetch packages");
    } finally {
      setIsLoading(false);
    }
  };

  const createPackage = async (packageData: Partial<Package>) => {
    try {
      const response = await axios.post(
        `${baseUrl}/packages`,
        { ...packageData, restaurantId: localStorage.getItem("_rid") },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            _oid: `${localStorage.getItem("_oid")}`,
            _rid: `${localStorage.getItem("_rid")}`,
            "Content-Type": "application/json",
          },
        },
      );
      setPackages((prevPackages) => [...prevPackages, response.data]);
      await fetchPackages();
    } catch (error) {
      console.error("Error creating package:", error);
      throw error;
    }
  };

  const updatePackage = async (id: string, packageData: Partial<Package>) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/packages/${id}`,
        packageData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            _oid: `${localStorage.getItem("_oid")}`,
            _rid: `${localStorage.getItem("_rid")}`,
            "Content-Type": "application/json",
          },
        },
      );
      setPackages((prevPackages) =>
        prevPackages.map((pkg) => (pkg._id === id ? response.data : pkg)),
      );
      await fetchPackages();
    } catch (error) {
      console.error("Error updating package:", error);
      throw error;
    }
  };

  const deletePackage = async (id: string) => {
    try {
      const response = await axios.delete(`${baseUrl}/packages/${id}`);
      console.log(response);
      // console.log(response);
      setPackages((prevPackages) =>
        prevPackages.filter((pkg) => pkg._id !== id),
      );
      // await fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
      throw error;
    }
  };

  const handleCreate = async () => {
    try {
      if (!restaurantId) {
        throw new Error("Restaurant ID not found. Please log in again.");
      }
      const packageToCreate = {
        ...newPackage,
      };
      await createPackage(packageToCreate);
      closeModal();
    } catch (error) {
      console.error("Error creating package:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      if (!restaurantId) {
        throw new Error("Restaurant ID not found. Please log in again.");
      }
      const packageToUpdate = {
        ...newPackage,
        isDeleted: false,
      };
      await updatePackage(id, packageToUpdate);
      closeModal();
    } catch (error) {
      console.error("Error updating package:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleEdit = (pkg: Package) => {
    setNewPackage({
      veg: pkg.veg,
      price: pkg.price,
      starter: [...(pkg.starter || [])],
      maincourse: [...(pkg.maincourse || [])],
      dessert: [...(pkg.dessert || [])],
      drinks: [...(pkg.drinks || [])],
      extras: [...(pkg.extras || [])],
      isDeleted: false,
    });
    setIsEditing(pkg._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(null);
    setNewPackage({
      veg: false,
      price: 0,
      starter: [],
      maincourse: [],
      dessert: [],
      drinks: [],
      extras: [],
      isDeleted: false,
    });
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 text-[#222222]">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Packages</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded bg-greenBlueCustom-3 px-4 py-2 text-white transition-colors hover:bg-greenBlueCustom-4"
          >
            <FaPlus className="mr-2 inline" /> Add Package
          </button>
        </div>

        {packages.filter((pkg) => !pkg.isDeleted).length === 0 ||
        packages.length === 0 ? (
          <div className="text-gray-500 text-center">
            No packages found. Create one by clicking the Add Package button.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages
              .filter((pkg) => !pkg.isDeleted)
              .map((pkg) => (
                <div
                  key={pkg?._id}
                  className={`rounded-lg p-6 shadow-md ${
                    pkg.veg ? "bg-green-50" : "bg-orange-50"
                  }`}
                >
                  <h2 className="mb-4 text-xl font-semibold">
                    {pkg.veg ? "Vegetarian Package" : "Non-Vegetarian Package"}
                  </h2>
                  <p>
                    <strong>Starters:</strong> {pkg.starter?.join(", ")}
                  </p>
                  <p>
                    <strong>Main Course:</strong> {pkg.maincourse?.join(", ")}
                  </p>
                  <p>
                    <strong>Dessert:</strong> {pkg.dessert?.join(", ")}
                  </p>
                  <p>
                    <strong>Drinks:</strong> {pkg.drinks?.join(", ")}
                  </p>
                  <p>
                    <strong>Extras:</strong> {pkg.extras?.join(", ")}
                  </p>
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="rounded bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
                    >
                      <FaEdit className="mr-2 inline" /> Edit
                    </button>
                    <button
                      onClick={() => deletePackage(pkg._id)}
                      className="rounded bg-red px-4 py-2 text-white transition-colors hover:bg-red hover:bg-opacity-85"
                    >
                      <FaTrash className="mr-2 inline" /> Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pt-20"
            onClick={closeModal}
          >
            <div
              className="relative max-h-[80vh] w-[80%] max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="text-gray-500 hover:text-gray-700 absolute right-2 top-2"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
              <h2 className="mb-4 text-xl font-semibold">
                {isEditing ? "Edit Package" : "Create New Package"}
              </h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="veg"
                    checked={newPackage.veg}
                    onChange={(e) =>
                      setNewPackage({ ...newPackage, veg: e.target.checked })
                    }
                    className="h-5 w-5 rounded accent-greenBlueCustom-4"
                  />
                  <label htmlFor="veg" className="font-medium">
                    Vegetarian
                  </label>
                </div>

                <div key="price" className="space-y-1">
                  <label
                    htmlFor="price"
                    className="text-gray-700 block text-sm font-medium"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={newPackage.price?.toString()}
                    onChange={(e) =>
                      setNewPackage({
                        ...newPackage,
                        price: parseFloat(e.target.value),
                      })
                    }
                    placeholder={`Enter the price`}
                    className="w-full rounded-md border border-orangeCustom px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-greenBlueCustom-2"
                  />
                </div>

                {[
                  { key: "starter", label: "Starters" },
                  { key: "maincourse", label: "Main Course" },
                  { key: "dessert", label: "Dessert" },
                  { key: "drinks", label: "Drinks" },
                  { key: "extras", label: "Extras" },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-1">
                    <label
                      htmlFor={key}
                      className="text-gray-700 block text-sm font-medium"
                    >
                      {label}
                    </label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      // value={
                      //   Array.isArray(newPackage[key as keyof Package])
                      //     ? (newPackage[key as keyof Package] as string[]).join(
                      //         ", ",
                      //       )
                      //     : ""
                      // }
                      value={
                        Array.isArray(newPackage[key as keyof Package])
                          ? (newPackage[key as keyof Package] as string[]).join(
                              ", ",
                            )
                          : ""
                      }
                      // onChange={(e) =>
                      //   setNewPackage({
                      //     ...newPackage,
                      //     [key]: e.target.value
                      //       .split(",")
                      //       .map((item) => item.trim())
                      //       .filter(Boolean),
                      //   })
                      // }
                      onChange={(event) =>
                        handleItemChange(key as keyof Package, event)
                      }
                      placeholder={`Enter ${label.toLowerCase()} items separated by commas`}
                      className="w-full rounded-md border border-orangeCustom px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-greenBlueCustom-2"
                    />

                    <p className="text-gray-500 text-xs">
                      Separate multiple items with commas
                    </p>
                  </div>
                ))}

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded px-4 py-2 transition-colors"
                  >
                    Cancel
                  </button>
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={() => handleUpdate(isEditing)}
                      className="rounded bg-greenBlueCustom-3 px-6 py-2 text-white transition-colors hover:bg-greenBlueCustom-4"
                    >
                      <FaEdit className="mr-2 inline" /> Update Package
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCreate}
                      className="rounded bg-greenBlueCustom-3 px-6 py-2 text-white transition-colors hover:bg-greenBlueCustom-4"
                    >
                      <FaPlus className="mr-2 inline" /> Create Package
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
