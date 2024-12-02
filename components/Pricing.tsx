import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const PricingPlans: React.FC = () => {
  const navigate = useRouter();

  const handlePlanClick = (plan: {
    name: string;
    price: string;
    tenure: string;
  }) => {
    // Set the selected plan in localStorage
    localStorage.setItem("selectedPlan", plan.name);

    // Redirect to the /membership page
    navigate.push("/membership");
  };

  return (
    <section className="flex text-white justify-center items-center">
      <div className="py-6 px-6 mx-auto lg:py-12 lg:px-6">
        <div className="mx-auto text-center mb-6 lg:mb-10">
          <h2 className="mb-3 text-3xl tracking-tight font-extrabold text-[#650000] sm:text-2xl">
            Choose what fits you best
          </h2>
          <p className="mb-4 font-light text-gray-900 sm:text-base">
            Discover our exclusive packages designed for your dining experience,
            including online booking, banquets, and complete event solutions.
          </p>
        </div>
        <div className="space-y-6 w-[90vw] flex flex-col items-center justify-center sm:grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-4 xl:gap-8 lg:space-y-0">
          {/* Reusable Plan Component */}
          {[
            {
              name: "Gold",
              price: "$49",
              description:
                "Ideal for intimate gatherings and special occasions.",
              details: ["Online booking", "Premium support: 3 months"],
              bg: "from-yellow-400 to-yellow-700",
              tenure: "event",
            },
            {
              name: "Plus",
              price: "$99",
              description: "Perfect for larger gatherings and events.",
              details: ["Hall rental", "Premium support: 6 months"],
              bg: "from-[#a83030] to-[#2b0505]",
              tenure: "event",
            },
            {
              name: "Complete",
              price: "$499",
              description: "All-inclusive for weddings and large events.",
              details: ["Full service catering", "Event planning assistance"],
              bg: "from-green-300 to-green-700",
              tenure: "event",
            },
          ].map(({ name, price, description, details, bg, tenure }) => (
            <motion.div
              key={name}
              className={`flex flex-col p-4 text-center rounded-lg shadow xl:p-6 bg-gradient-to-r ${bg} text-sm font-semibold transform w-[90%] transition-transform duration-300 hover:scale-105`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="mb-2 text-lg font-semibold">{name} Package</h3>
              <p className="mb-3 font-light text-white sm:text-sm">
                {description}
              </p>
              <div className="flex justify-center items-baseline my-4">
                <span className="mr-1 text-3xl font-extrabold">{price}</span>
                <span className="text-white text-sm">/event</span>
              </div>
              <ul role="list" className="mb-4 space-y-2 text-left text-sm">
                {details.map((detail) => (
                  <li key={detail} className="flex items-center space-x-2">
                    <Check  className="text-white" size={22}/>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanClick({ name, price, tenure })}
                className="bg-white text-black font-medium rounded-lg text-xs px-4 py-2"
              >
                Get started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
