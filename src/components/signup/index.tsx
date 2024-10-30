"use client";

import React, { useState } from "react";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { SignUpFormData, SignUpResponse } from "@/utils/types";
import { storeAuthData } from "@/utils/authUtils";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Validation functions
  const validateName = (value: string) => {
    return value.trim().length > 0 ? "" : "Name is required";
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Please enter a valid email address";
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    return phoneRegex.test(value)
      ? ""
      : "Please enter a valid Indian phone number";
  };

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(value)) {
      return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Passwords do not match"
          : "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).every((error) => error === "")) {
      try {
        // Perform the sign-up using NextAuth credentials provider
        // const response = await signIn("credentials", {
        //   email: formData.email,
        //   PhoneNumber: formData.phone,
        //   password: formData.password,
        //   name: formData.name,
        //   action: "signup",
        //   redirect: false,
        // });
        const apiData = {
          phoneNumber: formData.phone,
          password: formData.password,
          email: formData.email,
          ownerName: formData.name,
          isVerified: true,
          restaurantIds: [],
          isDeleted: false,
        };
        const response = await axios.post<SignUpResponse>(
          `https://server-staging.vercel.app/auth/restaurant-owner/register`,
          apiData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(response.data);
        console.log("ye hai apna result", response.data);
        const Data = {
          message: response.data.message,
          owner: {
            ownerName: response.data.owner.ownerName,
            email: response.data.owner.email,
            password: response.data.owner.password,
            phoneNumber: response.data.owner.phoneNumber,
            restaurantIds: response.data.owner.restaurantIds,
            isVerified: response.data.owner.isVerified,
            _id: response.data.owner._id,
            createdAt: response.data.owner.createdAt,
            updatedAt: response.data.owner.updatedAt,
            __v: response.data.owner.__v,
          },
          token: {
            access_token: response.data.token.access_token,
            _oid: response.data.token._oid,
          },
        };

        const authData = {
          access_token: response.data.token.access_token,
          _oid: response.data.token._oid,
          _rid: response.data.owner._id, // Assuming _rid should be the same as _oid, adjust if necessary
        };
        const success = storeAuthData(authData, "signup");

        if (!success) {
          router.push("/auth/signup");
          throw new Error("Failed to store authentication data");
        }

        // if (response?.error) {
        //   console.error("Signup failed:", response.error);
        //   return;
        // }
        // else {
        // Assuming the result contains ownerId
        // const ownerId = response?.ownerId; // Adjust this depending on your API response
        // if (ownerId) {
        //   // Store ownerId in local storage
        //   localStorage.setItem("ownerId", ownerId);
        // }

        // Redirect to home page or another page
        router.push("/auth/signin");
        console.log("Signup successful");
        // }
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign Up to TailAdmin
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.name ? "border-red-500" : "border-stroke"
              } border-orangeCustom-3 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-greenBlueCustom-3 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                    fill=""
                  />
                  <path
                    d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
          </div>
          {errors.name && (
            <span className="text-red-500 mt-1 text-sm">{errors.name}</span>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.email ? "border-red-500" : "border-stroke"
              } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-greenBlueCustom-3 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
          </div>
          {errors.email && (
            <span className="text-red-500 mt-1 text-sm">{errors.email}</span>
          )}
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.phone ? "border-red-500" : "border-stroke"
              } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-greenBlueCustom-3 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="current-color"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M15.8333 1H6.16667C5.24167 1 4.5 1.74167 4.5 2.66667V19.3333C4.5 20.2583 5.24167 21 6.16667 21H15.8333C16.7583 21 17.5 20.2583 17.5 19.3333V2.66667C17.5 1.74167 16.7583 1 15.8333 1ZM15.8333 17.6667H6.16667V4.33333H15.8333V17.6667ZM11 19.3333C10.5417 19.3333 10.1667 18.9583 10.1667 18.5C10.1667 18.0417 10.5417 17.6667 11 17.6667C11.4583 17.6667 11.8333 18.0417 11.8333 18.5C11.8333 18.9583 11.4583 19.3333 11 19.3333Z"
                    fill=""
                  />
                </g>
              </svg>
            </span>
          </div>
          {errors.phone && (
            <span className="text-red-500 mt-1 text-sm">{errors.phone}</span>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.password ? "border-red-500" : "border-stroke"
              } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-greenBlueCustom-3 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />

            <span className="absolute right-4 top-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-5v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2zm-6-9a4 4 0 014 4v2h-3V7a1 1 0 10-2 0v2H8V7a4 4 0 014-4z"
                />
              </svg>
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 mt-1 text-sm">{errors.password}</span>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.confirmPassword ? "border-red-500" : "border-stroke"
              } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-greenBlueCustom-3 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            <span className="absolute right-4 top-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-5v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2zm-6-9a4 4 0 014 4v2h-3V7a1 1 0 10-2 0v2H8V7a4 4 0 014-4z"
                />
              </svg>
            </span>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 mt-1 text-sm">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-5">
          <input
            type="submit"
            value="Sign Up"
            className="w-full cursor-pointer rounded-lg border border-orangeCustom-3 bg-orangeCustom-3 p-4 text-white transition hover:border-greenBlueCustom-3 "
          />
        </div>

        {/* Sign in Link */}
        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-orangeCustom-3 hover:text-greenBlueCustom-3"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
