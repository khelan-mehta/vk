import { Trash, X } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface BanquetCardProps {
  banquet: Banquet;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const BanquetCard: React.FC<BanquetCardProps> = ({
  banquet,
  onDelete,
  onEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => setIsImageOpen(true);
  const closeImageView = () => setIsImageOpen(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative h-[460px] overflow-hidden rounded-lg  bg-white shadow-lg sm:w-full">
      {/* Cover photo */}
      <div className="h-64 w-full overflow-hidden">
        <img
          src={banquet?.photos || "images/cover/cover-01.png"}
          alt={`${banquet?.name} cover`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-1 w-full p-6">
        <h2 className="mb-2 text-3xl font-bold text-black-2">
          {banquet?.name}
        </h2>
        <p className="text-gray-200 my-1 text-sm font-bold">
          Capacity: {banquet?.capacity}
        </p>
        <p className="text-gray-200 my-1 mb-3 text-sm font-bold">
          Price: {banquet?.price}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={openModal}
              className="h-[2.5rem] rounded-md  border border-orangeCustom bg-white px-4 py-2 font-semibold text-black transition duration-300"
            >
              View Details
            </button>

            <button
              onClick={() => onEdit(banquet?._id)}
              className="h-[2.5rem] rounded-md  border border-orangeCustom bg-white px-4 py-2 font-semibold text-black transition duration-300"
            >
              Edit
            </button>
          </div>
          <button
            onClick={() => onDelete(banquet?._id)}
            className="h-[2.5rem] rounded-md  bg-[#ffe5e5] px-4 py-2 font-semibold text-red transition duration-300"
          >
            <Trash />
          </button>
        </div>
      </div>

      {/* Modal (keeping the existing modal code) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 mt-19 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative w-11/12 max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
            <button
              onClick={closeModal}
              className="text-gray-500 hover:bg-gray-200 absolute right-4 top-4 rounded-full p-2 transition"
            >
              <X size={24} />
            </button>

            <div className="mx-auto max-w-md bg-white">
              {/* Centered Image with larger rounded border */}
              <div className="mb-6 flex justify-center">
                <img
                  src={banquet?.photos || "images/cover/cover-01.png"}
                  alt={`${banquet?.name} cover`}
                  className="border-gray-200 h-60 w-60 cursor-pointer rounded-xl border object-cover shadow-md"
                  onClick={handleImageClick}
                />
              </div>

              <h2 className="mb-4 rounded-2xl bg-orange-100 p-3 text-center text-2xl font-extrabold  text-orangeCustom-3">
                {banquet?.name}
              </h2>
              <p className="text-gray-600 mb-4 flex w-full justify-between text-left text-sm font-medium">
                Capacity:{" "}
                <span className="font-semibold text-black-2">
                  {banquet?.capacity}
                </span>
              </p>
              <p className="text-gray-600 mb-4 flex w-full justify-between text-left text-sm font-medium">
                Price:{" "}
                <span className="font-semibold text-black-2">
                  ${banquet?.price}
                </span>
              </p>
              <p className="text-gray-600 mb-4 flex w-full justify-between text-left text-sm font-medium">
                Type:{" "}
                <span className="font-semibold text-black-2">
                  {banquet?.type}
                </span>
              </p>

              <p className="text-gray-600 mb-6 flex flex-wrap  justify-between text-left text-sm font-medium">
                Amenities:
                <div className="mt-2 sm:mt-0">
                  {banquet?.amenities?.map((amenity, index) => (
                    <span
                      key={index}
                      className="ml-2 rounded-full bg-orange-100 px-3 py-1 text-orange-600 shadow-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </p>

              {/* Package Details */}
              {banquet?.packages.filter((pkg) => pkg.name).length > 0 && (
                <div className="mt-4">
                  <h3 className="text-gray-700 mb-3 text-center text-sm font-semibold">
                    Packages:
                  </h3>
                  <ul className="space-y-3 text-center">
                    {banquet?.packages.map((pkg, index) => (
                      <li
                        key={index}
                        className="bg-gray-50 text-gray-700 flex items-center justify-between rounded-lg p-3 font-medium"
                      >
                        <span>{pkg.name}</span>
                        <span>${pkg.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  className="rounded-lg border border-orangeCustom-3 bg-transparent px-3 py-2 font-semibold text-black-2 shadow-lg transition "
                  onClick={() => onEdit(banquet?._id)}
                >
                  Edit
                </button>
                <button
                  className="hover:bg-red-700 rounded-lg bg-orangeCustom-3 px-3 py-2 font-semibold text-white shadow-lg transition"
                  onClick={() => onDelete(banquet?._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isImageOpen && (
          <motion.div
            className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-75"
            initial={{ opacity: 0 }}
            onClick={() => {
              setIsImageOpen(false);
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={banquet?.photos || "images/cover/cover-01.png"}
              alt="Expanded banquet image"
              className="mt-12 max-h-full max-w-[90%] rounded-lg object-contain"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BanquetCard;
