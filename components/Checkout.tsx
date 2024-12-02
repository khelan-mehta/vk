import React from "react";
import MobileView from "./views/mobileView";
import DesktopView from "./views/desktopView";
import Button from "./Button";
import { removeFromSession } from "@/lib/session";
import { useRouter } from "next/navigation";

interface CheckoutProps {
  subtotal: number;
  delivery: number;
  gst: number;
  discount: string;
  createOrder: () => {}
}

const CheckoutComponent: React.FC<CheckoutProps> = ({
  subtotal,
  delivery,
  gst,
  discount,
  createOrder
}) => {
  const total = subtotal + delivery + ((gst/100)*subtotal) - (isNaN(Number(discount)) ? 0 : Number(discount));

  const router = useRouter()

  return (
    <>
      <MobileView>
        <div className="bg-white shadow-sm border rounded-lg p-4 h-auto w-full max-w-xs mx-auto">
          <h2 className="text-xl font-semibold mb-4">Checkout Details</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between border-t p-4 py-3">
              <span className="text-gray-900">SUBTOTAL</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t p-4 py-3">
              <span className="text-gray-900">DELIVERY</span>
              <span>₹{delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t p-4 py-3">
              <span className="text-gray-900">GST</span>
              <span>{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t p-4 py-3">
              <span className="text-gray-900">DISCOUNT</span>
              <span>₹{discount}</span>
            </div>
          </div>

          <div className="border-t border-red-500 pt-4 mb-4">
            <div className="flex justify-between font-semibold">
              <span>TOTAL</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button className="py-2 px-4 opacity-50 rounded-md text-gray-600 hover:bg-gray-100 transition-colors" onClick={() => {
                removeFromSession("cartitems");
                console.log("here")
                router.push("/menu");
              }}>
              CANCEL
            </button>
            <button onClick={createOrder} className="py-2 px-4 bg-red-600 text-white rounded-md hover:opacity-75 transition-colors">
              PAY
            </button>
          </div>
        </div>
      </MobileView>
      <DesktopView>
        <div className="fixed right-0 bg-white shadow-sm border rounded-lg p-6 h-screen w-1/3">
          <h2 className="text-2xl font-semibold mb-6">Checkout Details</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between border-t p-4 py-5">
              <span className="text-gray-900">SUBTOTAL</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t p-4 py-5">
              <span className="text-gray-900">DELIVERY</span>
              <span>₹{delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t p-4 py-5">
              <span className="text-gray-900">GST</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t  p-4 py-5">
              <span className="text-gray-900">DISCOUNT</span>
              <span>{discount}</span>
            </div>
          </div>

          <div className="border-t border-red-500 pt-4 mb-4">
            <div className="flex justify-between font-semibold">
              <span>TOTAL</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              label="Cancel"
              variant="secondary"
              onClick={() => {
                removeFromSession("cartitems");
                router.push("/menu");
              }}
              className="flex-1 py-2 px-4 opacity-50 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </Button>
            <Button
             onClick={createOrder}
              label="Pay"
              variant="primary"
              className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:opacity-75 transition-colors"
            >
              PAY
            </Button>
          </div>
        </div>
      </DesktopView>
    </>
  );
};

export default CheckoutComponent;
