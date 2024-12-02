"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import CheckoutComponent from "@/components/Checkout";
import DesktopView from "@/components/views/desktopView";
import MobileView from "@/components/views/mobileView";
import { MenuItem } from "../menu/page";
import { lookInSession, storeInSession } from "@/lib/session";
import requests from "@/lib/requests";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ErrorAlert from "@/components/ErrorAlert";

interface CartItem {
  id: string;
  name: string;
  price?: number;
  image: string;
}

export interface OrderCreateRes {
  razorpayOrderId: string,
  amount: number,
  currency: 'INR',
  orderId: string,
  paymentId: string 
}

const ShoppingCartComponent: React.FC = () => {
  const [cartItems, setCartItems] = useState<MenuItem[]>((JSON.parse(lookInSession("cartitems") || "{}")).items || []);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null | Error>(null);
  const {data: session, status} = useSession();
  const router = useRouter();

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));

    let items = cartItems;
    items[parseInt(id)] = {
      ...items[parseInt(id)],
      quantity: quantities[id] + delta
    }

    setCartItems(items);
    console.log(cartItems);
  };

  // console.log(cartItems);
  
  const delivery = 0; // Set delivery cost here
  const gst = 18; // Set GST here in percentages
  const [discount, setDiscount] = useState(0); // Set discount percentage here
  
  useEffect(() => {
    let quants: { [key: string]: number } = {};
    cartItems.map((itm,idx) => {
      quants[`${idx}`] = itm.quantity || 0;
    });
    setQuantities(quants);
    return () => {
      storeInSession("cartitems", JSON.stringify({ items: cartItems})); // store the updated items in localstorage or local storage solution
    };
  }, [cartItems]);

  const subtotal = cartItems.reduce(
    (sum, item, idx) => sum + item.price * (quantities[idx.toString()] || 0),
    0
  );

  useEffect(() => {
    // console.log(session?.user._uid);
    requests.post<number>("/orders/getDiscount", {
      userId: session?.user._uid,
      totalAmount: subtotal
    }).then((r) => {
      setDiscount(r);
    });
  }, [status]);

  const createOrder = async () => {
      const payload = {
        userId: session?.user._uid,
        restaurantId: process.env.NEXT_PUBLIC_RESTAURANT_ID,
        cartItems,
        paymentMethod: 'Razorpay'
      }

      try {
        const res = await requests.post<OrderCreateRes>("/orders/checkout-session", payload);
        router.push(`/payments?_roid=${Buffer.from(res.razorpayOrderId).toString("base64")}&oid=${res.orderId}&amount=${res.amount}`);
      } catch(error: any) {
        setError(error.message);
      }
  }


  // if(!(cartItems.length > 0)) return (<>No Items in the cart</>)

  return (
    <>
    <ErrorAlert autoHideDuration={500} error={error} />
      <MobileView>
        <div className="flex flex-col mt-40 bg-[#fff] justify-center items-center space-y-6 min-h-screen px-4">
          <div className="rounded-lg p-4 w-full">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            {cartItems.map((item, idx) => (
              <div
                key={item._id}
                className="flex flex-col items-start justify-between border-b p-4"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={item.imgUrl || "/food.png"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-base">{item.name}</h3>
                    <p className="text-gray-500 text-sm">#{idx+1}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-full">
                    <button
                      onClick={() => updateQuantity(idx.toString(), -1)}
                      className="px-3 py-1"
                    >
                      -
                    </button>
                    <span className="px-3">{quantities[idx.toString()]}</span>
                    <button
                      onClick={() => updateQuantity(idx.toString(), 1)}
                      className="px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-medium text-base">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600" onClick={() => {
                    console.log(idx);
                    console.log(cartItems.splice(idx, 1));
                    setCartItems(cartItems.splice(idx, 1)); // removes the element at index: idx
                  }}>
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 text-right">
              <p className="text-lg font-semibold">
                Subtotal: ₹{subtotal.toFixed(2)}
              </p>
            </div>
          </div>
          <CheckoutComponent
            createOrder={createOrder}
            subtotal={subtotal}
            delivery={delivery}
            gst={gst}
            discount={discount > 0 ? discount.toString() : "N/A"}
          />
        </div>
      </MobileView>
      <DesktopView>
        <div className="flex mt-20 bg-[#fff] justify-start items-start space-x-8 p-8 min-h-screen ">
          <div className="rounded-lg p-6 w-2/3 ">
            <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
            {cartItems.map((item, idx) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b p-10"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.imgUrl || "/food.png"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-sm">#{idx+1}</p>
                  </div>
                </div>
                <div className="flex  items-center space-x-4">
                  <div className="flex items-center border rounded-full">
                    <button
                      onClick={() => updateQuantity(idx.toString(), -1)}
                      className="px-3 py-1"
                    >
                      -
                    </button>
                    <span className="px-3">{quantities[idx.toString()]}</span>
                    <button
                      onClick={() => updateQuantity(idx.toString(), 1)}
                      className="px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-medium">₹{item.price.toFixed(2)}</span>
                  <button className="text-gray-400 hover:text-gray-600" onClick={() => {
                    setCartItems(cartItems.splice(idx, 1)); // removes the element at index: idx
                  }}>
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">
                Subtotal: ₹{subtotal.toFixed(2)}
              </p>
            </div>
          </div>
          <CheckoutComponent
          createOrder={createOrder}
            subtotal={subtotal}
            delivery={delivery}
            gst={gst}
            discount={discount > 0 ? discount.toString() : "N/A"}
          />
        </div>
      </DesktopView>
    </>
  );
};

export default ShoppingCartComponent;
