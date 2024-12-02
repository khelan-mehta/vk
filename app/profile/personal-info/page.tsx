// UserProfile.tsx
"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Button from "@/components/Button";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    dob: "",
    location: "",
    postalCode: "",
  });

  const userId = "672a453ea5a2c3fc17b6e677"; // Replace with dynamic ID as needed
  const apiUrl = `https://server-staging.vercel.app/users/${userId}`;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data) {
          const [firstName, lastName] = data.name.split(" ");
          setFormData({
            firstName,
            lastName,
            email: data.email,
            address: data.addressLine1 || "",
            phoneNumber: data.phoneNumber,
            dob: data.dob || "", // Assuming `dob` might be available in data
            location: data.city || "",
            postalCode: data.postalCode || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [apiUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

    try {
      const updatedData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        addressLine1: formData.address,
        phoneNumber: formData.phoneNumber,
        city: formData.location,
      };

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      console.log("Saved Data:", updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="flex h-fit pt-32 bg-white">
      <Sidebar activeItem="personal-info" />
      {/* Main Content */}
      <div className="flex-1 px-4">
        <div className="bg-white rounded-3xl p-8 max-w-7xl mx-auto shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#650000]">
            Personal Information
          </h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className={`w-full px-4 py-2 border rounded-full ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className={`w-full px-4 py-2 border rounded-full ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className={`w-full px-4 py-2 border rounded-full ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className={`w-full px-4 py-2 border rounded-full ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className={`w-full px-4 py-2 border rounded-full ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className={`w-full px-4 py-2 border rounded-full ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  className={`w-full px-4 py-2 border rounded-full ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
              {!isEditing ? (
                <Button label="Edit" variant="secondary" onClick={handleEditClick} />
              ) : (
                <Button label="Save" variant="primary" onClick={handleSaveClick} />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
