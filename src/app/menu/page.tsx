"use client";
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiLoader,
  FiImage,
  FiX,
} from "react-icons/fi";
import {
  getAuthHeaders,
  isAuthenticated,
  isResAuthenticated,
} from "@/utils/authUtils";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Client from "@/lib/apiClient"; // Update with correct path
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import axios from "axios";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  type: "VEG" | "NONVEG";
  restaurantId: string;
  displayCategory:
    | ""
    | "STARTERS"
    | "MAIN COURSE"
    | "DRINKS"
    | "DESSERTS"
    | "EXTRAS";
  imageUrl?: string;
}

const categories = [
  "STARTERS",
  "MAIN COURSE",
  "DRINKS",
  "DESSERTS",
  "EXTRAS",
] as const;

// Custom Button Component
const Button = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  className = "",
  itmId
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "destructive";
  size?: "medium" | "icon";
  onClick?: (e: MouseEvent) => void;
  className?: string;
  itmId: string
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-200";
  const variantStyles = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    destructive: "bg-red hover:bg-red text-white",
  };
  const sizeStyles = {
    medium: "px-4 py-2 rounded-md",
    icon: "p-2 rounded-md",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Custom Input Component
const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}: {
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`border-gray-300 w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

// Custom Select Component
const Select = ({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border-gray-300 w-full rounded-md border bg-white px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

// Custom Dialog Component
const Dialog = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6">
        {children}
      </div>
    </div>
  );
};
// API service using the custom Client
const api = {
  async getItems(restaurantId: string): Promise<MenuItem[]> {
    return (await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/menu-item/${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          _oid: `${localStorage.getItem("_oid")}`,
          _rid: `${localStorage.getItem("_rid")}`,
          "Content-Type": "application/json",
        },
      },
    )).data;
  },
  // const localStorageService = {
  //   getItems(restaurantId: string): MenuItem[] {
  //     const items = localStorage.getItem(`menuItems_${restaurantId}`);
  //     return items ? JSON.parse(items) : [];
  //   },

  // saveItems(restaurantId: string, items: MenuItem[]) {
  //   localStorage.setItem(`menuItems_${restaurantId}`, JSON.stringify(items));
  // },

  async createItem(
    restaurantId: string,
    item: Omit<MenuItem, "id">,
    image?: File,
  ): Promise<MenuItem> {
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(item));
    // formData.append("restaurantId", restaurantId);
    // if (image) {
    //   formData.append("image", image);
    // }
    item.restaurantId = restaurantId;
    return (await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/menu-item`,
      item,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          _oid: `${localStorage.getItem("_oid")}`,
          _rid: `${localStorage.getItem("_rid")}`,
          "Content-Type": "application/json",
        },
      },
    )).data;
  },

  // createItem(restaurantId: string, item: Omit<MenuItem, "id">): MenuItem {
  //   const items = this.getItems(restaurantId);
  //   const newItem = {
  //     ...item,
  //     id: Math.random().toString(36).substr(2, 9),
  //   };
  //   items.push(newItem);
  //   this.saveItems(restaurantId, items);
  //   return newItem;
  // },

  async updateItem(
    restaurantId: string,
    menuItemId: string,
    item: Partial<MenuItem>,
    image?: File,
  ): Promise<MenuItem> {
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(item));
    // if (image) {
    //   formData.append("image", image);
    // }

    item.restaurantId = restaurantId;

    // Since your Client library doesn't have a specific method for PUT with FormData,
    // we'll use the formData method with the complete endpoint
    return (await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/menu-item/${menuItemId}`,
      item,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          _oid: `${localStorage.getItem("_oid")}`,
          _rid: `${localStorage.getItem("_rid")}`,
          "Content-Type": "application/json",
        },
      }
    )).data;
  },

  // updateItem(
  //   restaurantId: string,
  //   menuItemId: string,
  //   updatedItem: Partial<MenuItem>,
  // ): MenuItem {
  //   const items = this.getItems(restaurantId);
  //   const index = items.findIndex((item) => item.id === menuItemId);
  //   if (index === -1) throw new Error("Item not found");

  //   const updated = { ...items[index], ...updatedItem };
  //   items[index] = updated;
  //   this.saveItems(restaurantId, items);
  //   return updated;
  // },

  async deleteItem(restaurantId: string, menuItemId: string): Promise<void> {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/menu-item/${menuItemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        _oid: `${localStorage.getItem("_oid")}`,
        _rid: `${localStorage.getItem("_rid")}`,
        "Content-Type": "application/json",
      },
    });
  },

  // deleteItem(restaurantId: string, menuItemId: string): void {
  //   const items = this.getItems(restaurantId);
  //   const filteredItems = items.filter((item) => item.id !== menuItemId);
  //   this.saveItems(restaurantId, filteredItems);
  // },
};
// ImageUpload Component
const ImageUpload = ({
  currentImage,
  onImageSelect,
  disabled,
}: {
  currentImage?: string | null;
  onImageSelect: (file: File | null) => void;
  disabled?: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }
      onImageSelect(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      onClick={handleImageClick}
      className="border-gray-300 bg-gray-50 hover:bg-gray-100 relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed"
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
        disabled={disabled}
      />

      {currentImage ? (
        <>
          <img
            src={
              typeof currentImage === "string"
                ? currentImage
                : URL.createObjectURL(currentImage)
            }
            alt="Menu item"
            className="h-full w-full rounded-lg object-cover"
          />
          {!disabled && (
            <button
              onClick={handleRemoveImage}
              className="absolute -right-2 -top-2 rounded-full bg-red p-1 text-white"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </>
      ) : (
        <div className="text-center">
          <FiImage className="text-gray-400 mx-auto h-8 w-8" />
          <span className="text-gray-400 mt-2 block text-sm">Upload Image</span>
        </div>
      )}
    </div>
  );
};

export default function MenuItemsAdmin() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [filteredItems, setFilteredItems] = useState<Array<MenuItem>>([]);

  const restaurantId = localStorage.getItem("_rid") as string; // In real app, this would come from auth context or props

  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    price: 0,
    type: "VEG",
    displayCategory: "",
    restaurantId,
  });

  useEffect(() => {
    getAuthHeaders();
    if (!isAuthenticated() || !isResAuthenticated()) {
      router.push("/auth/signin");
    }
    const fetchMenuItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const items = await api.getItems(restaurantId);
        console.log(items);
        setFilteredItems(items);
        setMenuItems(items);
      } catch (err: any) {
        setError(err.message || "Failed to load menu items");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems().then(() => console.log(menuItems));
  }, []);

  const handleAddItem = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      console.log(newItem.type);
      const item = await api.createItem(
        restaurantId,
        newItem as Omit<MenuItem, "id">,
        // selectedImage || undefined,
      );
      setMenuItems([...menuItems, item]);
      setFilteredItems([...filteredItems, item]); // wrong logic
      setIsDialogOpen(false);
      setNewItem({});
      setSelectedImage(null);
    } catch (err: any) {
      setError(err.message || "Failed to add menu item");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditItem = async () => {
    if (!editingItem) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const updatedItem = await api.updateItem(
        restaurantId,
        editingItem._id,
        newItem,
        // selectedImage || undefined,
      );
      setMenuItems(
        menuItems.map((item) =>
          item._id === editingItem._id ? updatedItem : item,
        ),
      );
      setIsDialogOpen(false);
      setEditingItem(null);
      setNewItem({});
      setSelectedImage(null);
    } catch (err: any) {
      setError(err.message || "Failed to update menu item");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setError(null);
    try {
      await api.deleteItem("671cbecb70fa32e59eeca2ea", id);
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete menu item");
      console.error(err);
    }
  };
  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem(item);
    setIsDialogOpen(true);
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-50 min-h-screen p-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Menu Items</h1>
            <Button
              className="bg-greenBlueCustom-3 hover:bg-greenBlueCustom-4"
              onClick={() => {
                setEditingItem(null);
                setNewItem({});
                setIsDialogOpen(true);
              }}
              itmId=""
            >
              <FiPlus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>

          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <FiSearch className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 transform" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative min-w-[200px]">
              <div
                className="border-gray-300 flex cursor-pointer items-center justify-between rounded-md border bg-white px-4 py-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedCategory}</span>
                <FiChevronDown
                  className={`transform transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </div>
              {isDropdownOpen && (
                <div className="border-gray-300 absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                  <div
                    className="hover:bg-gray-100 cursor-pointer px-4 py-2"
                    onClick={() => {
                      setSelectedCategory("ALL");
                      setIsDropdownOpen(false);
                    }}
                  >
                    ALL
                  </div>
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="hover:bg-gray-100 cursor-pointer px-4 py-2"
                      onClick={() => {
                        setSelectedCategory(category);
                        if (menuItems.length > 0)
                          setFilteredItems(
                            menuItems.filter(
                              (item) =>
                                (selectedCategory === "ALL" ||
                                  item.displayCategory === selectedCategory),
                            ),
                          ); //menuItems.filter dalega
                        setIsDropdownOpen(false);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white shadow">
            <div className="grid grid-cols-1 gap-4 p-4">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col justify-between rounded-lg border p-4 md:flex-row md:items-center"
                >
                  <div className="mb-4 flex-grow md:mb-0">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          item.type === "VEG" ? "bg-green-500" : "bg-red"
                        }`}
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-sm">₹{item.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-sm">
                      {item.displayCategory}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        item.type === "VEG"
                          ? "bg-green-100 text-[#222222]"
                          : "bg-red bg-opacity-60 text-[#222222]"
                      }`}
                    >
                      {item.type}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => openEditDialog(item)}
                        itmId=""
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        itmId={item._id}
                        variant="destructive"
                        size="icon"
                        onClick={(e) => {
                          console.log(e.target)
                          handleDeleteItem(item._id)}
                        }
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <Input
                value={newItem.name || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Price</label>
              <Input
                type="number"
                value={newItem.price || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Type</label>
              <Select
                value={newItem.type || ""}
                onChange={(value) => {
                  console.log(value);
                  setNewItem({ ...newItem, type: value as "VEG" | "NONVEG" })
                }
                }
                options={["VEG", "NONVEG"]}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Display Category
              </label>
              <Select
                value={newItem.displayCategory || ""}
                onChange={(value) =>
                  setNewItem({
                    ...newItem,
                    displayCategory: value as (typeof categories)[number],
                  })
                }
                options={[...categories]}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" itmId="" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={editingItem ? handleEditItem : handleAddItem} itmId=""
              className="bg-greenBlueCustom-3 hover:bg-greenBlueCustom-4"
            >
              {editingItem ? "Save Changes" : "Add Item"}
            </Button>
          </div>
        </Dialog>
      </div>
    </DefaultLayout>
  );
}
