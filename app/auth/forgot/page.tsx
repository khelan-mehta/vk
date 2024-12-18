"use client";
import React, { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import ErrorAlert from "@/components/ErrorAlert";
import { gsap } from "gsap";
import LeftHero from "@/components/LeftHero";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [step, setStep] = useState<number>(1); // Track the current step
  const [error, setError] = useState<string | null | Error>(null);
  const router = useRouter();
  const emailInputRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLDivElement>(null);
  const codeInputRef = useRef<HTMLDivElement>(null);

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (step === 1 && (!email || !emailRegex.test(email))) {
      shakeInput(emailInputRef.current);
      return "Please enter a valid Email Id.";
    }
    if (step === 2 && (!verificationCode || verificationCode.length !== 6)) {
      shakeInput(codeInputRef.current);
      return "Please enter a valid verification code.";
    }
    if (step === 3 && (!password || !passwordRegex.test(password))) {
      shakeInput(passwordInputRef.current);
      return "Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }
    return "";
  };

  const handleNextStep = async (e: FormEvent) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      if (step === 1) {
        // Send request to send verification code (to the email)
        const response = await fetch(
          "https://server-staging.vercel.app/auth/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          setError(data.message || "Error sending verification code.");
          return;
        }

        // Simulate a successful request and move to the next step
        setStep(2);
      } else if (step === 2) {
        // Send verification code and proceed
        // Simulate successful verification with an example check
        const verificationCode = ""; // Get this value from the user input
        const response = await fetch(
          "https://server-staging.vercel.app/auth/verify-code",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, verificationCode }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          setError(data.message || "Error verifying code.");
          return;
        }

        // Simulate successful verification and move to the next step
        setStep(3);
      } else if (step === 3) {
        // Handle the reset password logic
        const response = await fetch(
          "https://server-staging.vercel.app/auth/reset-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          setError(data.message || "Error resetting password.");
          return;
        }

        // Simulate successful reset password and log the user in
        signIn("credentials", {
          email,
          password,
          redirect: false,
          redirectTo: "/auth/login",
        }).then((res: SignInResponse | undefined) => {
          if (!res) {
            setError("No response from server");
            return;
          }

          if (!res.ok) {
            setError(res.error as string | Error | null);
          } else if (res.error) {
            setError(res.error);
            if (res.error === "CallbackRouteError")
              setError(
                "Could not reset password! Please check your credentials."
              );
            else setError(`Internal Server Error: ${res.error}`);
          } else {
            router.push("/");
          }
        });
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error(error);
    }
  };

  const shakeInput = (element: HTMLElement | null) => {
    if (!element) return;
    gsap.timeline().to(element, {
      x: -10,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center h-screen w-full bg-gradient-to-r from-[#f5edede8] to-transparent">
        <LeftHero />
        <div className="px-8 lg:px-28 w-full lg:w-full mt-12">
          <h3 className="text-4xl font-bold mb-6 flex justify-start items-start text-[#650002]">
            Forgot Password?
          </h3>
          <form onSubmit={handleNextStep} className="space-y-6">
            {step === 1 && (
              <div ref={emailInputRef}>
                <TextInput
                  id="Email"
                  name="Email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            {step === 2 && (
              <div ref={codeInputRef}>
                <TextInput
                  id="VerificationCode"
                  name="VerificationCode"
                  label="Verification Code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
            )}
            {step === 3 && (
              <div ref={passwordInputRef}>
                <TextInput
                  id="password"
                  name="password"
                  label="New Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            <div className="flex flex-col lg:flex-col justify-between space-y-4 lg:space-y-0">
              <Button
                variant="primary"
                label={step === 3 ? "Reset Password" : "Next"}
                type="submit"
                className="p-6 py-2 uppercase no-underline rounded-xl flex items-center justify-center duration-300 transition-all bg-[#650002] text-white hover:bg-[#450001] w-full"
              />
            </div>
          </form>

          {error && <ErrorAlert error={error} onClose={() => setError(null)} />}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
