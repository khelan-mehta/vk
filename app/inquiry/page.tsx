// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSession } from "next-auth/react";
// import { ChevronRight, Calendar, Clock, Users } from "lucide-react";
// import ErrorAlert from "@/components/ErrorAlert";
// import { useSearchParams } from "next/navigation";

// const BanquetInquiryPage = () => {
//   const searchParams = useSearchParams();
//   const { data: session } = useSession();
//   const [step, setStep] = useState(1);
//   const [error, setError] = useState<Error | string | null>(null);

//   const banquetId = searchParams.get("banquetId");

//   const [formData, setFormData] = useState({
//     userId: "",
//     banquetId: banquetId,
//     restaurantId: process.env.NEXT_PUBLIC_RESTAURANT_ID,
//     status: "Pending",
//     inquiryDate: new Date(),
//     desiredBookingDate: "",
//     duration: 1,
//     startTime: "",
//     name: "Wedding function",
//     totalPeople: 0,
//     nOfJain: 0,
//   });

//   useEffect(() => {
//     // Update userId when session is available
//     if (session?.user?.id) {
//       console.log(session.user.id);
//       setFormData((prev) => ({
//         ...prev,
//         userId: session.user.id || "",
//       }));
//     }
//   }, [session]);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Prepare the payload
//     const payload = {
//       ...formData,
//       inquiryDate: new Date(),
//       status: "Pending", // Ensure status is always Pending
//       userId: session?.user?.id, // Ensure we use the latest session user ID
//       restaurantId: process.env.NEXT_PUBLIC_RESTAURANT_ID, // Ensure we use the env restaurant ID
//       banquetId: banquetId, // Ensure we use the fetched banquet ID
//     };
//     console.log(payload);
//     try {
//       const response = await fetch(
//         "https://server-staging.vercel.app/inquiries",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );
//       console.log(response);
//       if (response.ok) {
//         console.log("Form submitted:", payload);
//         setStep(2);
//       } else {
//         const data = await response.json();
//         setError(data.message);
//       }
//     } catch (error) {
//       console.error("Error submitting inquiry:", error);
//       setError(
//         "An error occurred while submitting your inquiry. Please try again later."
//       );
//     }
//   };

//   const renderStep1 = () => (
//     <motion.form
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -50 }}
//       onSubmit={handleSubmit}
//       className="space-y-8"
//     >
//       <h2 className="text-3xl font-bold text-center">
//         Tell us about your event
//       </h2>
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <label
//             htmlFor="desiredBookingDate"
//             className="block text-lg font-medium text-gray-700"
//           >
//             <Calendar className="inline mr-2" />
//             Desired Booking Date
//           </label>
//           <input
//             type="date"
//             id="desiredBookingDate"
//             name="desiredBookingDate"
//             value={formData.desiredBookingDate}
//             onChange={handleInputChange}
//             required
//             className="mt-1 block w-full rounded-full border-gray-300 border focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 px-5"
//           />
//         </div>
//         <div className="space-y-4">
//           <label
//             htmlFor="duration"
//             className="block text-lg font-medium text-gray-700"
//           >
//             <Clock className="inline mr-2" />
//             Duration (hours)
//           </label>
//           <input
//             type="number"
//             id="duration"
//             name="duration"
//             value={formData.duration}
//             onChange={handleInputChange}
//             required
//             min={0}
//             max={24}
//             className="mt-1 block w-full rounded-full border-gray-300 border focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 px-5"
//           />
//         </div>
//         <div className="space-y-4">
//           <label
//             htmlFor="startTime"
//             className="block text-lg font-medium text-gray-700"
//           >
//             <Clock className="inline mr-2" />
//             Start Time
//           </label>
//           <input
//             type="time"
//             id="startTime"
//             name="startTime"
//             value={formData.startTime}
//             onChange={handleInputChange}
//             required
//             className="mt-1 block w-full rounded-full border-gray-300 border focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 px-5"
//           />
//         </div>
//         <div className="space-y-4">
//           <label
//             htmlFor="name"
//             className="block text-lg font-medium text-gray-700"
//           >
//             Event Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//             className="mt-1 block w-full rounded-full border-gray-300 border focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 px-5"
//           />
//         </div>
//         <div className="space-y-4">
//           <label
//             htmlFor="totalPeople"
//             className="block text-lg font-medium text-gray-700"
//           >
//             <Users className="inline mr-2" />
//             Total number of people
//           </label>
//           <input
//             type="number"
//             id="totalPeople"
//             name="totalPeople"
//             value={formData.totalPeople}
//             onChange={handleInputChange}
//             required
//             min={0}
//             className="mt-1 block w-full rounded-full border-gray-300 border focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 px-5"
//           />
//         </div>
//         <div className="space-y-4">
//           <label
//             htmlFor="nOfJain"
//             className="block text-lg font-medium text-gray-700"
//           >
//             <Users className="inline mr-2" />
//             Number of Jain people
//           </label>
//           <input
//             type="number"
//             id="nOfJain"
//             name="nOfJain"
//             value={formData.nOfJain}
//             onChange={handleInputChange}
//             required
//             min={0}
//             className="mt-1 block w-full rounded-full border-gray-300 border focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg p-3 px-5"
//           />
//         </div>
//       </div>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         type="submit"
//         className="w-full bg-[#600002] text-white py-3 px-6 rounded-md hover:bg-[#600002] transition duration-300 text-lg font-semibold"
//       >
//         Submit Inquiry <ChevronRight className="inline ml-2" />
//       </motion.button>
//     </motion.form>
//   );

//   const renderThankYou = () => (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="text-center space-y-6"
//     >
//       <h2 className="text-3xl font-bold">Thank you for your inquiry!</h2>
//       <p className="text-xl">
//         We have received your information and will contact you shortly to
//         discuss your event.
//       </p>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen mt-32 flex flex-col">
//       <main className="flex-grow container mx-auto px-4 py-12">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 p-8 md:p-12">
//           {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
//           <AnimatePresence mode="wait">
//             {step === 1 && renderStep1()}
//             {step === 2 && renderThankYou()}
//           </AnimatePresence>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default BanquetInquiryPage;

import { Suspense } from "react";
import BanquetInquiryForm from "@/components/BanquetInquiryForm";

export default function BanquetInquiryPage() {
  return (
    <div className="min-h-screen mt-32 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 p-8 md:p-12">
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#600002]"></div>
              </div>
            }
          >
            <BanquetInquiryForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
