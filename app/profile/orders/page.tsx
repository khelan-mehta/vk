"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type CartItem = {
  name: string;
  quantity: number;
};

type Order = {
  _id: string;
  createdAt: string;
  totalAmount: number;
  cartItems: CartItem[];
  transactionId: string | null;
  status: string;
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeOrderId, setActiveOrderId] = useState<number | null>(null);

  // Mock data for orders
  const mockOrders = [
    {
      _id: "1",
      createdAt: "2023-11-01T12:00:00Z",
      totalAmount: 1500,
      cartItems: [
        { name: "Pizza Margherita", quantity: 2 },
        { name: "Pasta Carbonara", quantity: 1 },
      ],
      transactionId: "txn_123456",
      status: "Delivered",
    },
    {
      _id: "2",
      createdAt: "2023-10-28T08:30:00Z",
      totalAmount: 850,
      cartItems: [
        { name: "Burger", quantity: 3 },
        { name: "French Fries", quantity: 2 },
      ],
      transactionId: null,
      status: "Pending",
    },
    {
      _id: "3",
      createdAt: "2023-09-15T14:45:00Z",
      totalAmount: 1200,
      cartItems: [
        { name: "Sushi Roll", quantity: 4 },
        { name: "Miso Soup", quantity: 1 },
      ],
      transactionId: "txn_789012",
      status: "Cancelled",
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try { 
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}orders/${process.env.NEXT_PUBLIC_USER_ID}`
        );
        const data = response.data;

        if (data.length > 0) {
          setOrders(data);
          setFilteredOrders(data);
        } else {
          console.warn("Empty response received, using mock data");
          setOrders(mockOrders);
          setFilteredOrders(mockOrders);
        }
      } catch (error) {
        console.error("Error fetching orders, using mock data:", error);
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterOrders(term, statusFilter);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterOrders(searchTerm, status);
  };

  const filterOrders = (term: string, status: string) => {
    const filtered = orders.filter((order: any) => {
      const matchesSearch =
        order._id.toString().includes(term) ||
        order.cartItems.some((item: any) =>
          item.name.toLowerCase().includes(term)
        );
      const matchesStatus = status ? order.status === status : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredOrders(filtered);
  };

  const toggleOrderDetails = (orderId: number) => {
    setActiveOrderId(activeOrderId === orderId ? null : orderId);
  };

  return (
    <div className="flex h-fit pt-32 bg-white">
      <Sidebar activeItem="orders" />
      <div className="flex-1 px-4">
        <div className="bg-white rounded-3xl p-8 max-w-7xl mx-auto border shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#650000]">
            Orders History
          </h2>

          <div className="container mx-auto p-4">
            <table className="min-w-full bg-white rounded-3xl overflow-hidden">
              <thead>
                <tr className="text-left">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Order Date</th>
                  <th className="py-3 px-4">Total Price</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order: any, index: number) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className={`border-t cursor-pointer ${
                        activeOrderId === order._id ? "bg-[#f9f5e950]" : ""
                      }`}
                      onClick={() => toggleOrderDetails(order._id)}
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        {format(parseISO(order.createdAt), "dd MMM, yyyy")}
                      </td>
                      <td className="py-3 px-4">Rs. {order.totalAmount}</td>
                      <td className="py-3 px-4">
                        <ChevronDown
                          className={`text-[#650000] cursor-pointer transition-transform duration-300 ${
                            activeOrderId === order._id ? "rotate-180" : ""
                          }`}
                          onClick={() => toggleOrderDetails(order._id)}
                        />
                      </td>
                    </tr>
                    <AnimatePresence>
                      {activeOrderId === order._id && (
                        <motion.tr
                          className="border-t"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td colSpan={4}>
                            <div className="bg-[#f9f5e950] rounded-3xl p-4">
                              <h3 className="text-lg font-semibold mb-2">
                                Order Details
                              </h3>
                              <table className="w-full">
                                <thead>
                                  <tr className="text-left">
                                    <th className="py-4 px-6 text-lg font-semibold">
                                      <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium">
                                        Item
                                      </span>
                                    </th>
                                    <th className="py-4 px-5 text-right">
                                      <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium">
                                        Quantity
                                      </span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white">
                                  {order.cartItems.map(
                                    (item: any, idx: number) => (
                                      <tr
                                        key={idx}
                                        className="border-b last:border-b-0"
                                      >
                                        <td className="py-4 text-[#650000] font-semibold bg-white px-6">
                                          {item.name}
                                        </td>
                                        <td className="py-4 text-[#650000] font-semibold px-5 text-right">
                                          <div className="inline-flex items-center justify-center text-white bg-[#650000] rounded-full h-8 w-8">
                                            {item.quantity}
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <div className="flex w-full items-center justify-between mt-4">
                                <div className="bg-white rounded-3xl px-4 py-2">
                                  <span className="font-semibold">
                                    Payment Method:
                                  </span>{" "}
                                  {order.transactionId
                                    ? "Online Payment"
                                    : "Cash on Delivery"}
                                </div>
                                <div
                                  className={`px-4 py-2 rounded-full text-white font-semibold text-center ${
                                    order.status === "Delivered"
                                      ? "bg-green-500"
                                      : order.status === "Pending"
                                      ? "bg-yellow-500"
                                      : order.status === "Cancelled"
                                      ? "bg-red-500"
                                      : "bg-gray-500"
                                  }`}
                                >
                                  {order.status}
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
