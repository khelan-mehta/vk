"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define interfaces for the restaurant and owner data
interface Location {
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

interface Restaurant {
  location: Location;
  _id: string;
  restaurantOwner: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: any[];
  lastUpdated: string;
  __v: number;
}

interface Owner {
  _id: string;
  ownerName: string;
  email: string;
  password: string;
  phoneNumber: string;
  restaurantIds: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isDeleted: boolean;
}

const RestaurantDetails: React.FC = () => {
  const ownerId = localStorage.getItem("_oid");
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // States for editing owner and restaurant details
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editRestaurantMode, setEditRestaurantMode] = useState<boolean>(false);
  const [editableOwner, setEditableOwner] = useState<Partial<Owner>>({});
  const [editableRestaurant, setEditableRestaurant] = useState<
    Partial<Restaurant>
  >({});
  const accessToken = localStorage.getItem("access_token");

  // Fetch functions
  const fetchRestaurant = async () => {
    const response = await axios.get<Restaurant>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurant/my-restaurant/${ownerId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    setRestaurant(response.data);
    setEditableRestaurant(response.data);
  };

  const fetchOwner = async () => {
    const response = await axios.get<Owner>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurant-owners/${ownerId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    setOwner(response.data);
    setEditableOwner(response.data);
  };

  // Toggle functions
  const handleEditToggle = () => setEditMode(!editMode);
  const handleRestaurantEditToggle = () =>
    setEditRestaurantMode(!editRestaurantMode);

  // Input change handlers
  const handleInputChange = (field: keyof Owner, value: string) => {
    setEditableOwner((prev) => ({ ...prev, [field]: value }));
  };

  const handleRestaurantInputChange = (
    field: keyof Restaurant,
    value: string | number | any,
  ) => {
    setEditableRestaurant((prev) => ({ ...prev, [field]: value }));
  };

  // Save functions
  const handleSave = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurant-owners/${ownerId}`,
        editableOwner,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      setOwner(editableOwner as Owner);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving owner data:", error);
    }
  };

  const handleRestaurantSave = async () => {
    try {
      // Set the current date and time as the lastUpdated value
      const updatedRestaurant = {
        ...editableRestaurant,
        lastUpdated: new Date().toISOString(),
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/restaurant/${restaurant?._id}`,
        updatedRestaurant,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      setRestaurant(updatedRestaurant as Restaurant);
      setEditRestaurantMode(false);
    } catch (error) {
      console.error("Error saving restaurant data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchRestaurant(), fetchOwner()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ownerId, accessToken]);

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-gray-500 text-lg">Loading...</div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-gray-800 mb-4 text-left text-3xl font-bold">
          Settings
        </h1>

        <div className="mb-6 flex flex-col rounded-lg sm:flex sm:flex-row sm:justify-between ">
          <div className="flex flex-col sm:w-[530px]">
            {/* Profile Header */}
            <div className="my-4 rounded-lg bg-white p-4">
              <div className=" flex  items-center">
                <div className="mx-5 flex h-20 w-20 items-center justify-center rounded-full  shadow-lg">
                  <img src="/owner.png" alt="Profile" className=" w-[45px]  " />
                </div>
                <div>
                  <h2 className="text-gray-800 text-2xl  font-bold capitalize">
                    {owner?.ownerName}
                  </h2>
                  <p className="text-blue-600">Restaurant owner</p>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="border-gray-300 my-4 mb-4 h-[300px] rounded-lg  bg-white p-4 pb-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="my-4 rounded-lg bg-greenBlueCustom-3 p-2 text-white sm:my-0 sm:rounded-md sm:text-xl sm:font-bold">
                  Personal Information
                </h3>
                {editMode ? (
                  <button
                    className="flex items-center text-blue-600"
                    onClick={handleSave}
                  >
                    <span className="ml-1">
                      {" "}
                      <img
                        src="/save.png"
                        alt="Profile"
                        className=" w-[25px]  "
                      />
                    </span>
                  </button>
                ) : (
                  <button
                    className="flex items-center text-blue-600"
                    onClick={handleEditToggle}
                  >
                    <span className="ml-1">
                      {" "}
                      <img
                        src="/edit.png"
                        alt="Profile"
                        className=" w-[25px]  "
                      />
                    </span>
                  </button>
                )}
              </div>
              <div className="mt-8 grid grid-cols-2  gap-4 px-2">
                {["ownerName", "email", "phoneNumber"].map((field) => (
                  <div key={field}>
                    <p className="text-gray-500 text-sm font-bold">
                      {field.replace("ownerName", "Name")}
                    </p>
                    {editMode ? (
                      <input
                        type="text"
                        value={editableOwner[field as keyof Owner] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            field as keyof Owner,
                            e.target.value,
                          )
                        }
                        className="w-full rounded-md border p-2 text-black-2"
                      />
                    ) : (
                      <p className="truncate text-black-2">
                        {owner?.[field as keyof Owner] || "Not Provided"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:w-[530px]">
            {/* Restaurant Header Section */}
            <div className="my-4 rounded-lg bg-white p-4">
              <div className="flex items-center">
                <div className="mx-5 flex h-20 w-20 items-center justify-center rounded-full shadow-lg">
                  <img
                    src="/restaurant.png"
                    alt="Restaurant Logo"
                    className="w-[45px]"
                  />
                </div>
                <div>
                  {editRestaurantMode ? (
                    <input
                      value={editableRestaurant.restaurantName || ""}
                      onChange={(e) =>
                        handleRestaurantInputChange(
                          "restaurantName",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-md border p-2 text-black-2"
                    />
                  ) : (
                    <p>{restaurant?.restaurantName}</p>
                  )}
                  <p className="text-blue-600">{restaurant?.city}</p>
                  <p className="text-gray-500">{restaurant?.country}</p>
                </div>
              </div>
            </div>

            {/* Restaurant Details Section */}
            <div className="border-gray-300 mt-4  rounded-lg bg-white p-4 sm:h-[300px]">
              <div className="flex justify-between">
                <h3 className="my-4 rounded-lg bg-greenBlueCustom-3 p-2 text-white sm:my-0 sm:rounded-md sm:text-xl sm:font-bold">
                  Restaurant Details
                </h3>
                {editRestaurantMode ? (
                  <button
                    onClick={handleRestaurantSave}
                    className="text-blue-600"
                  >
                    <img
                      src="/save.png"
                      alt="Profile"
                      className=" w-[25px]  "
                    />
                  </button>
                ) : (
                  <button
                    onClick={handleRestaurantEditToggle}
                    className="text-blue-600"
                  >
                    <img
                      src="/edit.png"
                      alt="Profile"
                      className=" w-[25px]  "
                    />
                  </button>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm font-bold">
                    Delivery Price
                  </p>
                  {editRestaurantMode ? (
                    <input
                      type="number"
                      value={editableRestaurant.deliveryPrice || ""}
                      onChange={(e) =>
                        handleRestaurantInputChange(
                          "deliveryPrice",
                          Number(e.target.value),
                        )
                      }
                      className="w-full rounded-md border p-2 text-black-2"
                    />
                  ) : (
                    <p>{restaurant?.deliveryPrice}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold">
                    Estimated Delivery Time
                  </p>
                  {editRestaurantMode ? (
                    <input
                      type="number"
                      value={editableRestaurant.estimatedDeliveryTime || ""}
                      onChange={(e) =>
                        handleRestaurantInputChange(
                          "estimatedDeliveryTime",
                          Number(e.target.value),
                        )
                      }
                      className="w-full rounded-md border p-2 text-black-2"
                    />
                  ) : (
                    <p>{restaurant?.estimatedDeliveryTime}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold">Cuisines</p>
                  {editRestaurantMode ? (
                    <input
                      type="text"
                      value={editableRestaurant.cuisines?.join(", ") || ""}
                      onChange={(e) =>
                        handleRestaurantInputChange(
                          "cuisines",
                          e.target.value
                            .split(",")
                            .map((cuisine) => cuisine.trim()),
                        )
                      }
                      className="w-full rounded-md border p-2 text-black-2"
                    />
                  ) : (
                    <p className="text-black-2">
                      {restaurant?.cuisines?.join(", ") || "Not Provided"}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold">
                    Menu Items Count
                  </p>
                  <p className=" text-black-2">
                    {restaurant?.menuItems?.length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold">
                    Last Updated
                  </p>
                  <p className="text-black-2">
                    {restaurant?.lastUpdated
                      ? new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",

                          hour12: true, // Set to false for 24-hour format
                        }).format(new Date(restaurant.lastUpdated))
                      : "Not Provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RestaurantDetails;
