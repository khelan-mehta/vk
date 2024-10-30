import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import axios from "axios";
import { X } from "lucide-react";

export interface Banquet {
  restaurantId: object;
  _id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  isAvailable: boolean;
  isDeleted: boolean;
  packages: any[]; // Change to include IDs
  photos: string;
  type: string;
}

interface Package {
  id: string;
  name: string;
  price: number;
}

interface BanquetFormProps {
  banquet: Banquet | null;
  onSave: (banquet: Banquet) => void;
  onClose: () => void;
}

const BanquetForm: React.FC<BanquetFormProps> = ({
  banquet,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(banquet?.name || "");
  const [capacity, setCapacity] = useState(banquet?.capacity || 0);
  const [amenities, setAmenities] = useState<string[]>(
    banquet?.amenities || [],
  );
  const [photo, setPhoto] = useState<File | null>(null);

  const [type, setType] = useState(banquet?.type || "");
  const [price, setPrice] = useState(banquet?.price || 0);
  const [restaurantId] = useState(banquet?.restaurantId || {});
  const [currentAmenity, setCurrentAmenity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]); // Packages fetched from API
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>(
    banquet?.packages.map((pkg) => pkg.id) || [],
  ); // Selected package IDs

  // Fetch packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/packages`,
        );
        console.log(response.data.data);
        // Fetch packages from the API
        setPackages(response.data.data); // Set packages to state
      } catch (error) {
        toast.error("Failed to fetch packages");
      }
    };

    fetchPackages();
  }, []);

  // Handle photo upload
  const [photos, setPhotos] = useState<any>([]);

  // Modify handlePhotoUpload to accept only one file
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setPhoto(files[0]); // Set the first file as the photo
    }
  };

  // Handle form save
  const handleSave = () => {
    if (!name || name.trim() === "") {
      toast.error("Name cannot be empty");
      return;
    }

    // Create URL for the single photo if it exists
    const photoUrl = photo ? URL.createObjectURL(photo) : "";

    // Construct the payload
    const payload = {
      _id: banquet?._id || Date.now().toString(),
      name,
      capacity,
      packages: selectedPackageIds.map((id) => ({ id })),
      photos: photoUrl, // Use the photo URL here
      type,
      price,
      restaurantId,
      amenities,
      isAvailable: true, // Ensure isAvailable is set to true or false as needed
      isDeleted: false,
      description: "banquet description", // Add your description
    };

    // Call onSave with the payload
    onSave(payload);

    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent adding a space character
      if (currentAmenity.trim()) {
        setAmenities((prev) => [...prev, currentAmenity.trim()]);
        setCurrentAmenity(""); // Clear the current input
      }
    }
  };

  // Remove an amenity
  const handleRemoveAmenity = (index: any) => {
    setAmenities((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 ml-[-25px] flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-0">
      <div className="no-scrollbar relative left-4 right-4 top-8 max-h-[80vh] w-[90%] max-w-lg overflow-y-auto rounded-lg bg-white p-4 shadow-lg sm:left-auto sm:right-auto sm:top-10 sm:p-6">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 absolute right-4 top-4"
        >
          <ImCross />
        </button>
        <h2 className="mb-4 text-lg font-bold">
          {banquet ? "Edit Banquet" : "Add Banquet"}
        </h2>

        <div className="space-y-4">
          {/* Banquet Name */}
          <div>
            <label>Banquet Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border p-2"
            />
          </div>

          {/* Capacity */}
          <div>
            <label>Capacity:</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full rounded border p-2"
            />
          </div>

          {/* Price */}
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full rounded border p-2"
            />
          </div>

          {/* Amenities */}
          <div>
            <label>Amenities:</label>
            <textarea
              value={currentAmenity}
              onChange={(e) => setCurrentAmenity(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full rounded border p-2"
              placeholder="Type an amenity and press space..."
            />
            {/* Display added amenities */}
            <div className="mt-2 flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-full bg-orange-100 px-3 py-1 text-orange-500"
                >
                  <span>{amenity}</span>
                  <button
                    onClick={() => handleRemoveAmenity(index)}
                    className="text-red-500 ml-2"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Package Selection */}
          {packages.length > 0 && (
            <div>
              <label className="pr-3">Select Packages:</label>
              <div className="relative inline-block w-full">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex w-full items-center justify-between rounded border p-2 text-left"
                >
                  {selectedPackageIds.length > 0
                    ? `Selected ${selectedPackageIds.length} Packages`
                    : "Select Packages"}
                  <span className="ml-2">&#x25BC;</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded border bg-white shadow-lg">
                    {packages.map((pkg: any) => (
                      <label
                        key={pkg._id}
                        className="hover:bg-gray-100 flex cursor-pointer items-center p-2"
                      >
                        <input
                          type="checkbox"
                          value={pkg._id}
                          checked={selectedPackageIds.includes(pkg._id)}
                          onChange={(e) => {
                            setSelectedPackageIds((prevSelectedIds) =>
                              e.target.checked
                                ? [...prevSelectedIds, pkg._id]
                                : prevSelectedIds.filter(
                                    (id) => id !== pkg._id,
                                  ),
                            );
                          }}
                          className="mr-2"
                        />
                        {pkg.name} - ${pkg.price}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Photos */}
          <div>
            <label>Photo:</label>
            <input
              type="file"
              accept="image/*"
              name="banquet-img"
              onChange={handlePhotoUpload} // Allow only one file
              className="block w-full rounded-lg border border-orangeCustom-3 p-2 text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2 file:text-white file:transition-all file:duration-300 hover:file:bg-orangeCustom-3 hover:file:text-black"
            />
            <div className="mt-2">
              {photo && (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Banquet Photo"
                  className="h-auto w-full rounded"
                />
              )}
            </div>
          </div>

          {/* Banquet Type */}
          <div>
            <label>Type:</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded border p-2"
            />
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              className="rounded-xl border border-black bg-orangeCustom-3 px-4 py-2 text-black-2"
              onClick={handleSave}
            >
              {banquet ? "Save Changes" : "Add Banquet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanquetForm;
