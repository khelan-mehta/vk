import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct mailto link
    const mailtoLink = `mailto:vaikunthvillagerestaurant@gmail.com?subject=Contact%20Form%20Submission&body=${encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    )}`;

    // Open mail client
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="rounded-xl overflow-hidden max-w-7xl w-full flex flex-col md:flex-row">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-4 md:p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-[#650002] mb-6">
              Wanna say something?
              <br />
              Get in touch!
            </h2>
            <form
              className="space-y-4 flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full p-4 border-b border-[#000] focus:border-[#000] outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                className="w-full p-4 border-b border-[#000] focus:border-[#000] outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                className="w-full p-4 border-b border-[#000] focus:border-[#000] outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                className="w-full p-4 border-b border-[#000] focus:border-[#000] outline-none transition-all duration-300 bg-transparent text-[#000] placeholder:text-[#00055] focus:placeholder:text-[#000]"
                rows={4}
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-[#650002] text-white px-8 py-3 rounded-lg hover:bg-[#660000] transition duration-300"
              >
                Send
              </button>
            </form>

            <div className="mt-8 flex space-x-4">
              <a
                href="https://www.instagram.com/explore/locations/1769609960005655/vaikunth-village-restaurant/"
                className="text-[#000] border rounded-full p-2 border-[#000] hover:bg-[#000] hover:text-white transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/VAIKUNTHVILLAGE/"
                className="text-[#000] border rounded-full p-2 border-[#000] hover:bg-[#000] hover:text-white transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 relative h-[30vh] md:h-auto">
            <Image
              src="/food.png"
              alt="Delicious food"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg">
              <button className="text-[#000] font-semibold">
                Request more information
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
