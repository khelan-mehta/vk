"use client";

import React, { useState, useEffect } from "react";
import {
  getAuthHeaders,
  isAuthenticated,
  getAuthData,
  storeResData,
} from "@/utils/authUtils";
import { useRouter } from "next/navigation";
import { Location } from "@/utils/types";
import axios from "axios";
import { RestaurantResponse } from "@/utils/types";

interface RestaurantFormData {
  restaurantName: string;
  city: string;
  country: string;
  location: Location;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: Array<{
    _id?: string;
    name: string;
    price: number;
  }>;
  imageUrl?: string;
}

const RegisterRestaurant: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [cuisineInput, setCuisineInput] = useState("");
  const [error, setError] = useState("");
  // const [ownerId, setOwnerId] = useState<string | null>(null);

  const [formData, setFormData] = useState<RestaurantFormData>({
    restaurantName: "",
    city: "",
    country: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    deliveryPrice: 0,
    estimatedDeliveryTime: 0,
    cuisines: [],
    menuItems: [],
  });

  const [errors, setErrors] = useState({
    restaurantName: "",
    city: "",
    country: "",
    location: "",
    deliveryPrice: "",
    estimatedDeliveryTime: "",
    cuisines: "",
  });
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/signin");
      return;
    } else {
      getAuthHeaders();
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              type: "Point",
              coordinates: [
                position.coords.latitude,
                position.coords.longitude,
              ],
            },
          }));
          setLoading(false);
          setLocationError("");
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(
            "Failed to get your location. Please enable location services.",
          );
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleAddCuisine = () => {
    if (cuisineInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        cuisines: [...prev.cuisines, cuisineInput.trim()],
      }));
      setCuisineInput("");
      setErrors((prev) => ({ ...prev, cuisines: "" }));
    }
  };

  const handleRemoveCuisine = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      cuisines: prev.cuisines.filter((_, i) => i !== index),
    }));
  };

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "restaurantName":
      case "city":
      case "country":
        return !value.trim()
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
          : "";
      case "deliveryPrice":
        return value <= 0 ? "Delivery price must be greater than 0" : "";
      case "estimatedDeliveryTime":
        return value <= 0
          ? "Estimated delivery time must be greater than 0"
          : "";
      case "cuisines":
        return value.length === 0
          ? "At least one cuisine type is required"
          : "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      restaurantName: validateField("restaurant name", formData.restaurantName),
      city: validateField("city", formData.city),
      country: validateField("country", formData.country),
      location:
        formData.location.coordinates[0] === 0 &&
        formData.location.coordinates[1] === 0
          ? "Location is required"
          : "",
      deliveryPrice: validateField("deliveryPrice", formData.deliveryPrice),
      estimatedDeliveryTime: validateField(
        "estimatedDeliveryTime",
        formData.estimatedDeliveryTime,
      ),
      cuisines: validateField("cuisines", formData.cuisines),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => error === "")) {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch(
          "https://server-staging.vercel.app/restaurant",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              _oid: `${localStorage.getItem("_oid")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // ownerId,
              ...formData,
            }),
          },
        );

        const stored = storeResData(response);
        if (!stored) {
          setError("Failed to store authentication data");
          return;
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem("_rid", data._id);

        if (!response.ok) {
          throw new Error(data.message || "Failed to register restaurant");
        }

        // Store restaurantId in localStorage

        // Redirect to dashboard
        router.push("/");
      } catch (error) {
        console.error("Restaurant registration error:", error);
        // You might want to show an error message to the user here
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="dark:bg-gray-800 w-full max-w-md space-y-8 rounded-xl bg-white p-6 shadow-lg">
        <div>
          <h2 className="text-gray-900 mt-6 text-center text-3xl font-extrabold dark:text-white">
            Register Your Restaurant
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-center text-sm">
            Please provide your restaurant details
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Restaurant Name Input */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
              Restaurant Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="restaurantName"
                placeholder="Enter restaurant name"
                value={formData.restaurantName}
                onChange={handleChange}
                className={`w-full rounded-lg border ${
                  errors.restaurantName ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-greenBlueCustom-3 focus:outline-none focus:ring-1 focus:ring-greenBlueCustom-3`}
              />
              {errors.restaurantName && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.restaurantName}
                </p>
              )}
            </div>
          </div>

          {/* City Input */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
              City
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full rounded-lg border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-greenBlueCustom-3 focus:outline-none focus:ring-1 focus:ring-greenBlueCustom-3`}
              />
              {errors.city && (
                <p className="text-red-500 mt-1 text-sm">{errors.city}</p>
              )}
            </div>
          </div>

          {/* Country Input */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
              Country
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full rounded-lg border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-greenBlueCustom-3 focus:outline-none focus:ring-1 focus:ring-greenBlueCustom-3`}
              />
              {errors.country && (
                <p className="text-red-500 mt-1 text-sm">{errors.country}</p>
              )}
            </div>
          </div>

          {/*delivery price */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
              Delivery Price
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="deliveryPrice"
                placeholder="Enter delivery price"
                value={formData.deliveryPrice || ""}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full rounded-lg border ${
                  errors.deliveryPrice ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-greenBlueCustom-3 focus:outline-none focus:ring-1 focus:ring-greenBlueCustom-3`}
              />
              {errors.deliveryPrice && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.deliveryPrice}
                </p>
              )}
            </div>
          </div>

          {/* Estimated Delivery Time Input */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
              Estimated Delivery Time (minutes)
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="estimatedDeliveryTime"
                placeholder="Enter estimated delivery time"
                value={formData.estimatedDeliveryTime || ""}
                onChange={handleChange}
                min="0"
                className={`w-full rounded-lg border ${
                  errors.estimatedDeliveryTime
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-greenBlueCustom-3 focus:outline-none focus:ring-1 focus:ring-greenBlueCustom-3`}
              />
              {errors.estimatedDeliveryTime && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.estimatedDeliveryTime}
                </p>
              )}
            </div>
          </div>

          {/* Location Input */}
          {/* <div>
            <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
              Location Coordinates
            </label>
            <div className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
              Latitude: {formData.location.coordinates[0].toFixed(4)},
              Longitude: {formData.location.coordinates[1].toFixed(4)}
            </div>
          </div> */}

          {/*cuisines */}
          <div>
            <label className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
              Cuisines
            </label>
            <div className="mt-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={cuisineInput}
                  onChange={(e) => setCuisineInput(e.target.value)}
                  placeholder="Enter a cuisine type"
                  className="border-gray-300 w-full rounded-lg border px-3 py-2 shadow-sm focus:border-greenBlueCustom-3 focus:outline-none focus:ring-1 focus:ring-greenBlueCustom-3"
                />
                <button
                  type="button"
                  onClick={handleAddCuisine}
                  className="hover:bg-primary-dark rounded-lg bg-orangeCustom-3 px-4 py-2 text-white hover:outline-none hover:ring-1 hover:ring-greenBlueCustom-3"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.cuisines.map((cuisine, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-greenBlueCustom-1 px-3 py-1 text-sm"
                  >
                    {cuisine}
                    <button
                      type="button"
                      onClick={() => handleRemoveCuisine(index)}
                      className="text-gray-500 hover:text-gray-700 ml-2"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {errors.cuisines && (
                <p className="text-red-500 mt-1 text-sm">{errors.cuisines}</p>
              )}
            </div>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              onSubmit={handleSubmit}
              className={`hover:bg-primary-dark flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-orangeCustom-3 px-4 py-2 text-sm font-medium text-white shadow-sm hover:outline-none hover:ring-2  hover:ring-greenBlueCustom-3`}
            >
              Register Restaurant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterRestaurant;
