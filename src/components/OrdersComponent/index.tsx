// "use client";

// import React, { useState } from "react";
// import {
//   FaUtensils,
//   FaMotorcycle,
//   FaCheck,
//   FaTimes,
//   FaEye,
// } from "react-icons/fa";

// type OrderStatus =
//   | "Pending"
//   | "Preparing"
//   | "Ready"
//   | "Delivered"
//   | "Cancelled";

// interface IOrder {
//   _id: string;
//   restaurant: string;
//   user: string;
//   deliveryDetails: {
//     email: string;
//     name: string;
//     addressLine1: string;
//     city: string;
//   };
//   cartItems: {
//     menuItemId: string;
//     quantity: number;
//     name: string;
//   }[];
//   totalAmount: number;
//   status: OrderStatus;
//   createdAt: Date;
//   transactionId?: string;
// }

// // Custom Button component
// const Button: React.FC<
//   React.ButtonHTMLAttributes<HTMLButtonElement> & {
//     variant?: "primary" | "outline";
//     size?: "sm" | "md" | "lg";
//   }
// > = ({
//   children,
//   variant = "primary",
//   size = "md",
//   className = "",
//   ...props
// }) => {
//   const baseStyle =
//     "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";
//   const variants = {
//     primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
//     outline:
//       "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
//   };
//   const sizes = {
//     sm: "px-2 py-1 text-sm",
//     md: "px-4 py-2",
//     lg: "px-6 py-3 text-lg",
//   };

//   return (
//     <button
//       className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// // Custom Badge component
// const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
//   children,
//   className = ``,
// }) => {
//   return (
//     <span
//       className={`rounded-full px-2 py-1 text-xs font-semibold ${className}`}
//     >
//       {children}
//     </span>
//   );
// };

// const OrdersComponent: React.FC = () => {
//   const [orders, setOrders] = useState<IOrder[]>([
//     {
//       _id: "ORD001",
//       restaurant: "REST001",
//       user: "USER001",
//       deliveryDetails: {
//         email: "john@example.com",
//         name: "John Doe",
//         addressLine1: "123 Main St",
//         city: "Mumbai",
//       },
//       cartItems: [
//         { menuItemId: "ITEM001", quantity: 2, name: "Butter Chicken" },
//         { menuItemId: "ITEM002", quantity: 1, name: "Naan" },
//       ],
//       totalAmount: 550,
//       status: "Pending",
//       createdAt: new Date("2023-05-15T19:30:00"),
//       transactionId: "TXN001",
//     },
//     {
//       _id: "ORD002",
//       restaurant: "REST001",
//       user: "USER002",
//       deliveryDetails: {
//         email: "jane@example.com",
//         name: "Jane Smith",
//         addressLine1: "456 Oak Ave",
//         city: "Delhi",
//       },
//       cartItems: [
//         { menuItemId: "ITEM003", quantity: 1, name: "Vegetable Biryani" },
//         { menuItemId: "ITEM004", quantity: 2, name: "Raita" },
//       ],
//       totalAmount: 450,
//       status: "Preparing",
//       createdAt: new Date("2023-05-15T20:00:00"),
//       transactionId: "TXN002",
//     },
//   ]);

//   const getStatusColor = (status: OrderStatus) => {
//     switch (status) {
//       case "Pending":
//         return "bg-orangeCustom-3 text-white";
//       case "Preparing":
//         return "bg-primary text-white";
//       case "Ready":
//         return "bg-greenBlueCustom-3 text-white";
//       case "Delivered":
//         return "bg-[#222222] text-white";
//       case "Cancelled":
//         return "bg-red text-white";
//       default:
//         return "bg-[#222222] text-white";
//     }
//   };

//   const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order._id === orderId ? { ...order, status: newStatus } : order,
//       ),
//     );
//   };

//   const OrderDetailsDialog: React.FC<{
//     order: IOrder;
//     onClose: () => void;
//   }> = ({ order, onClose }) => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pt-15">
//       <div className="w-full max-w-md rounded-lg bg-white p-6">
//         <h2 className="mb-4 text-xl font-bold">Order Details</h2>
//         <div className="grid gap-4">
//           <div>
//             <h3 className="font-semibold">Delivery Details</h3>
//             <p>{order.deliveryDetails.name}</p>
//             <p>{order.deliveryDetails.email}</p>
//             <p>{order.deliveryDetails.addressLine1}</p>
//             <p>{order.deliveryDetails.city}</p>
//           </div>
//           <div>
//             <h3 className="font-semibold">Order Items</h3>
//             <ul>
//               {order.cartItems.map((item, index) => (
//                 <li key={index}>
//                   {item.quantity}x {item.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-semibold">Transaction ID</h3>
//             <p>{order.transactionId || "N/A"}</p>
//           </div>
//         </div>
//         <Button onClick={onClose} className="mt-4 bg-[#222222]">
//           Close
//         </Button>
//       </div>
//     </div>
//   );

//   const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-4xl rounded-lg bg-white shadow">
//         <div className="px-4 py-5 sm:px-6">
//           <h1 className="text-gray-900 text-2xl font-bold">Orders</h1>
//         </div>
//         <div className="border-gray-200 border-t">
//           <ul className="divide-gray-200 divide-y">
//             {orders.map((order) => (
//               <li key={order._id} className="px-4 py-4 sm:px-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex flex-col sm:flex-row sm:items-center">
//                     <Badge className={getStatusColor(order.status)}>
//                       {order.status}
//                     </Badge>
//                     <div className="mt-2 sm:ml-4 sm:mt-0">
//                       <p className="font-medium">Order #{order._id}</p>
//                       <p className="text-gray-500 text-sm">
//                         Customer: {order.deliveryDetails.name}
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         Time: {order.createdAt.toLocaleTimeString()}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="mt-2 flex flex-col items-end sm:mt-0 sm:flex-row sm:items-center">
//                     <p className="mb-2 font-medium sm:mb-0 sm:mr-4">
//                       ₹{order.totalAmount.toFixed(2)}
//                     </p>
//                     <div className="flex flex-wrap justify-end gap-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setSelectedOrder(order)}
//                       >
//                         <FaEye className="mr-1" />
//                         Details
//                       </Button>
//                       {order.status === "Pending" && (
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() =>
//                             handleStatusChange(order._id, "Preparing")
//                           }
//                         >
//                           <FaUtensils className="mr-1" />
//                           Prepare
//                         </Button>
//                       )}
//                       {order.status === "Preparing" && (
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleStatusChange(order._id, "Ready")}
//                         >
//                           <FaCheck className="mr-1" />
//                           Ready
//                         </Button>
//                       )}
//                       {order.status === "Ready" && (
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() =>
//                             handleStatusChange(order._id, "Delivered")
//                           }
//                         >
//                           <FaMotorcycle className="mr-1" />
//                           Deliver
//                         </Button>
//                       )}
//                       {order.status !== "Cancelled" &&
//                         order.status !== "Delivered" && (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() =>
//                               handleStatusChange(order._id, "Cancelled")
//                             }
//                           >
//                             <FaTimes className="mr-1" />
//                             Cancel
//                           </Button>
//                         )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-2">
//                   <ul className="text-gray-500 text-sm">
//                     {order.cartItems.map((item, index) => (
//                       <li key={index}>
//                         {item.quantity}x {item.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       {selectedOrder && (
//         <OrderDetailsDialog
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default OrdersComponent;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUtensils,
  FaMotorcycle,
  FaCheck,
  FaTimes,
  FaEye,
} from "react-icons/fa";
import {
  getAuthData,
  isAuthenticated,
  isResAuthenticated,
} from "@/utils/authUtils";

import { OrderStatus } from "@/utils/types";

interface IOrder {
  _id: string;
  restaurant: string;
  user: string;
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  cartItems: {
    menuItemId: string;
    quantity: number;
    name: string;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  transactionId?: string;
}

// Custom Button component
const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline";
    size?: "sm" | "md" | "lg";
  }
> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyle =
    "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
  };
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Badge component
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ``,
}) => {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
};

const OrdersComponent: React.FC = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (!isAuthenticated() || !isResAuthenticated()) {
      return router.push("/auth/signin");
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const authData = getAuthData();
      if (!authData) return;

      const response = await fetch("https://server-staging.vercel.app/orders", {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
          _oid: authData._oid,
          _rid: `${localStorage.getItem("_rid")}`,
        },
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const authData = getAuthData();
      if (!authData) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/update/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.access_token}`,
            _oid: authData._oid,
            _rid: `${localStorage.getItem("_rid")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      console.log(response.json());

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-orangeCustom-3 text-white";
      case OrderStatus.IN_PROGRESS:
        return "bg-primary text-white";
      case OrderStatus.OUT_FOR_DELIVERY:
        return "bg-greenBlueCustom-3 text-white";
      case OrderStatus.DELIVERED:
        return "bg-[#222222] text-white";
      case OrderStatus.CANCELLED:
        return "bg-red text-white";
      default:
        return "bg-[#222222] text-white";
    }
  };

  const OrderDetailsDialog: React.FC<{
    order: IOrder;
    onClose: () => void;
  }> = ({ order, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pt-15">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Order Details</h2>
        <div className="grid gap-4">
          <div>
            <h3 className="font-semibold">Delivery Details</h3>
            <p>{order.deliveryDetails.name}</p>
            <p>{order.deliveryDetails.email}</p>
            <p>{order.deliveryDetails.addressLine1}</p>
            <p>{order.deliveryDetails.city}</p>
          </div>
          <div>
            <h3 className="font-semibold">Order Items</h3>
            <ul>
              {order.cartItems.map((item, index) => (
                <li key={index}>
                  {item.quantity}x {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Transaction ID</h3>
            <p>{order.transactionId || "N/A"}</p>
          </div>
        </div>
        <Button onClick={onClose} className="mt-4 bg-[#222222]">
          Close
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-gray-900 text-2xl font-bold">Orders</h1>
        </div>
        <div className="border-gray-200 border-t">
          <ul className="divide-gray-200 divide-y">
            {orders.map((order) => (
              <li key={order._id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <div className="mt-2 sm:ml-4 sm:mt-0">
                      <p className="font-medium">Order #{order._id}</p>
                      <p className="text-gray-500 text-sm">
                        Customer: {order.deliveryDetails.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Time: {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col items-end sm:mt-0 sm:flex-row sm:items-center">
                    <p className="mb-2 font-medium sm:mb-0 sm:mr-4">
                      ₹{order.totalAmount.toFixed(2)}
                    </p>
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <FaEye className="mr-1" />
                        Details
                      </Button>
                      {order.status === OrderStatus.PENDING && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateOrderStatus(
                              order._id,
                              OrderStatus.IN_PROGRESS,
                            )
                          }
                        >
                          <FaUtensils className="mr-1" />
                          Prepare
                        </Button>
                      )}
                      {order.status === OrderStatus.IN_PROGRESS && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateOrderStatus(
                              order._id,
                              OrderStatus.OUT_FOR_DELIVERY,
                            )
                          }
                        >
                          <FaCheck className="mr-1" />
                          Ready
                        </Button>
                      )}
                      {order.status === OrderStatus.OUT_FOR_DELIVERY && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateOrderStatus(order._id, OrderStatus.DELIVERED)
                          }
                        >
                          <FaMotorcycle className="mr-1" />
                          Deliver
                        </Button>
                      )}
                      {order.status !== OrderStatus.CANCELLED &&
                        order.status !== OrderStatus.DELIVERED && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateOrderStatus(
                                order._id,
                                OrderStatus.CANCELLED,
                              )
                            }
                          >
                            <FaTimes className="mr-1" />
                            Cancel
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersComponent;
