"use client";
import React, { useEffect, useState } from "react";
import { Search, ChevronDown, ShoppingCartIcon } from "lucide-react";
import requests from "@/lib/requests";
import { AxiosError } from "axios";
import { lookInSession, storeInSession } from "@/lib/session";
import Link from "next/link";
import ErrorAlert from "@/components/ErrorAlert";

// const menuItems: MenuItem[] = [
//   {
//     image:
//       "https://i0.wp.com/zheelicious.com/wp-content/uploads/2020/05/9dad4c_ffb13e6c7dab49e1b0c985bd4239a8b7mv2.jpg?resize=720%2C480&ssl=1",
//     name: "SCHEWAN PANEER TIKKA MASALA WITH MOMOS",
//     description: "IDEAL MEAL FOR 3 PEOPLE, 250G PANEER",
//     category: "STARTERS",
//     price: 225,
//   },
//   {
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_TeoktgjjmWtcK72qgSNx45lF8u-o5i8ftQ&s",
//     name: "PANEER CHILLY MANCHURIAN WITH SCHEWAN",
//     description: "IDEAL MEAL FOR 3 PEOPLE, 250G PANEER",
//     category: "STARTERS",
//     price: 185,
//   },
//   {
//     image:
//       "https://i0.wp.com/zheelicious.com/wp-content/uploads/2020/05/9dad4c_565ca89f35574c7aa877357de060dfe6mv2.jpg?resize=720%2C819&ssl=1",
//     name: "SCHEWAN PANEER TIKKA MASALA WITH MOMOS",
//     description: "IDEAL MEAL FOR 3 PEOPLE, 250G PANEER",
//     category: "STARTERS",
//     price: 225,
//   },

//   {
//     image:
//       "https://i0.wp.com/zheelicious.com/wp-content/uploads/2020/05/9dad4c_ffb13e6c7dab49e1b0c985bd4239a8b7mv2.jpg?resize=720%2C480&ssl=1",
//     name: "SCHEWAN PANEER TIKKA MASALA WITH MOMOS",
//     description: "IDEAL MEAL FOR 3 PEOPLE, 250G PANEER",
//     category: "STARTERS",
//     price: 225,
//   },
//   {
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_TeoktgjjmWtcK72qgSNx45lF8u-o5i8ftQ&s",
//     name: "PANEER CHILLY MANCHURIAN WITH SCHEWAN",
//     description: "IDEAL MEAL FOR 3 PEOPLE, 250G PANEER",
//     category: "STARTERS",
//     price: 185,
//   },
//   {
//     image:
//       "https://i0.wp.com/zheelicious.com/wp-content/uploads/2020/05/9dad4c_565ca89f35574c7aa877357de060dfe6mv2.jpg?resize=720%2C819&ssl=1",
//     name: "SCHEWAN PANEER TIKKA MASALA WITH MOMOS",
//     description: "IDEAL MEAL FOR 3 PEOPLE, 250G PANEER",
//     category: "STARTERS",
//     price: 225,
//   },

//   {
//     image:
//       "https://i0.wp.com/zheelicious.com/wp-content/uploads/2020/05/9dad4c_ffb13e6c7dab49e1b0c985bd4239a8b7mv2.jpg?resize=720%2C480&ssl=1",
//     name: "SCHEWAN PANEER TIKKA MASALA WITH MOMOS",
//     description: "IDEAL MEAL FOR 3 PEOPLE, 250G PANEER",
//     category: "STARTERS",
//     price: 225,
//   },
//   {
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_TeoktgjjmWtcK72qgSNx45lF8u-o5i8ftQ&s",
//     name: "PANEER CHILLY MANCHURIAN WITH SCHEWAN",
//     description: "IDEAL MEAL FOR 3 PEOPLE, 250G PANEER",
//     category: "STARTERS",
//     price: 185,
//   },
//   {
//     image:
//       "https://i0.wp.com/zheelicious.com/wp-content/uploads/2020/05/9dad4c_565ca89f35574c7aa877357de060dfe6mv2.jpg?resize=720%2C819&ssl=1",
//     name: "SCHEWAN PANEER TIKKA MASALA WITH MOMOS",
//     description: "IDEAL MEAL FOR 3 PEOPLE, 250G PANEER",
//     category: "STARTERS",
//     price: 225,
//   },
// ];

export interface MenuItem {
  imgUrl: string;
  name: string;
  displayCategory: string;
  price: number;
  _id?: string;
  quantity?: number;
  handleAddCartItem?: (itm: MenuItem) => {}
}

const MenuItemComponent: React.FC<MenuItem> = ({
  imgUrl,
  name,
  displayCategory,
  price,
  _id,
  handleAddCartItem,
}) => (
  <div className="flex items-center gap-5 space-x-4 py-4 border px-4 flex-col sm:flex-row">
    <img
      src={imgUrl || "/food.png"}
      alt={name}
      className="w-24 h-20 object-cover rounded-lg"
    />
    <div className="flex-grow">
      <h3 className="text-sm font-medium">{name}</h3>
      {/* <p className="text-xs text-gray-500">{description}</p> */}
    </div>
    <div className="text-right flex items-center gap-2 sm:gap-10 px-0 sm:px-8 justify-between">
      <span className="text-base font-semibold">{displayCategory}</span>
      <p className="text-base font-semibold">Rs. {price}</p>
      <button className="border bg-transparent rounded-sm p-2 hover:bg-[#650000] hover:border-[#650000] hover:first:text-white" onClick={(e) => 
        {handleAddCartItem && handleAddCartItem({imgUrl,
          name,
          displayCategory,
          price,
          _id, quantity: 1, })}}><ShoppingCartIcon className="hover:text-white" /></button>
    </div>
  </div>
);

const Page: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<{items?: MenuItem[]}>(JSON.parse(lookInSession("cartitems") || "{}"));
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

  const [error, setError] = useState<string | Error | null>(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    console.log(cartItems);
    requests
      .get(`/menu-item/${process.env.NEXT_PUBLIC_RESTAURANT_ID}`)
      .then((r) => {
        console.log(r);
        setMenuItems(r);
      })
      .catch((e) => {
        setError(e);
        console.log(e.message);
      });
    // return () => {
    //   requests.abort(); // cancels any ongoing calls if user demounts.
    // }
  }, []);

  useEffect(() => {
    setFilteredItems(
      menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === "ALL" ||
            item.displayCategory === selectedCategory)
      )
    );
  }, [menuItems, selectedCategory]);

  const handleSearch = async () => {
    try {
      const search: MenuItem[] = await requests.get<MenuItem[]>(
        `/menu-item/search/${process.env.NEXT_PUBLIC_RESTAURANT_ID}/${searchTerm}`
      );
      setMenuItems(search);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleAddCartItem = async (itm: MenuItem) => {
    if(!itm) { 
      setError("Unable to add item to cart! Contact developers.");
      return;
    }
    let newItems = cartItems.items ? cartItems.items : null;
    if(!cartItems.items) { 
      newItems = [itm];
    } else {
      if(!cartItems.items.find((item) => item._id === itm._id)) newItems?.push(itm);
      // newItems.push(...cartItems.items);
    }
    if (newItems) setCartItems({ items: newItems });
    storeInSession("cartitems", JSON.stringify({ items: newItems }));
    setSuccess("Item added to cart. Checkout Now!");
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const categories = ["STARTER", "MAIN COURSE", "DESSERTS", "ALL"];

  return (
    <div className="min-h-screen p-4 mt-20">
      <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-6xl text-center text-[#8b0000] samran mb-10">
            MENU
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Explore our ranges of mouth-watering with a touch of divine foods.
          </p>
          {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-6">
            <div className="relative flex-grow mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full bg-transparent border border-gray-300 py-2 px-4 pr-10 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <Search
                  className="absolute right-0 top-1/2 transform border border-gray-300 cursor-pointer hover:opacity-50
                duration-300 w-10 px-2 h-full -translate-y-1/2 text-gray-400"
                  size={20}
                  onClick={handleSearch}
                />
              </button>
            </div>

            <div className="relative mx-4 mb-4 sm:mb-0">
              <div
                className="flex justify-between items-center border border-gray-300 text-gray-700 py-2 px-4 rounded cursor-pointer"
                onClick={toggleDropdown}
              >
                <span>{selectedCategory}</span>
                <ChevronDown
                  className={`transform transition duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </div>
              {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-[#f9f5e9aa] border border-gray-300 shadow-lg">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="py-2 px-4 text-gray-700 hover:bg-[#ff6347] hover:text-white cursor-pointer transition duration-200"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsOpen(false);
                      }}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="bg-[#ff6347] text-white py-2 px-4 mx-4 rounded">
              HALL 1
            </button>
            <button className="bg-transparent opacity-50 text-gray-700 py-2 px-4 rounded border border-gray-300">
              AC HALL
            </button>
          </div>
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <MenuItemComponent
                key={index}
                {...item}
                handleAddCartItem={handleAddCartItem}
              />
            ))}
          </div>

          <Link href={"/checkout"} className="my-4 justify-end">
          <button className="bg-gradient-to-br from-accent-500 to-accent-800 font-sans text-white font-bold tracking-wide text-xs py-2 px-4 mx-4 rounded">
              Checkout
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
