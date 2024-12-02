// "use client";
// import { useState, useContext, FormEvent, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import { lookInSession, storeInSession } from "../../../lib/session";
// import Image from "next/image";
// import Button from "@/components/Button";
// import TextInput from "@/components/TextInput";
// import { signIn, SignInResponse } from "next-auth/react";
// import { Route } from "next";
// import ErrorAlert from "@/components/ErrorAlert";

// const Login = () => {
//   const BASE_URL = "https://server-staging.vercel.app/";
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null | Error>(null);
//   const router = useRouter();
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//   const searchParams = useSearchParams();
//   const validateForm = () => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!phoneNumber || !phoneRegex.test(phoneNumber))
//       return "Please enter a valid Indian phone number.";
//     if (!password || !passwordRegex.test(password))
//       return "Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
//   };
//   async function login(e: FormEvent) {
//     // whatever your type
//     e.preventDefault();
//     const errorMessage = validateForm();
//     if (errorMessage) {
//       setError(errorMessage);
//       return;
//     }
//     // const callbackUrl = searchParams.get("callbackUrl")
//     signIn("credentials", {
//       phoneNumber,
//       password: password,
//       redirect: false,
//       redirectTo: "/auth/login",
//     }).then((res: SignInResponse | undefined) => {
//       if (!res) {
//         alert("No response!");
//         return;
//       }

//       if (!res.ok) {
//         setError(res.error as string | Error | null);
//         console.log("Something went wrong!");
//       } else if (res.error) {
//         setError(res.error);
//         console.log(res.error);

//         if (res.error == "CallbackRouteError")
//           // alert("Could not login! Please check your credentials.");
//           setError("Could not login! Please check your credentials.");
//         else setError(`Internal Server Error: ${res.error}`);
//       } else {
//         // if (callbackUrl)
//         //     router.push(callbackUrl as Route)
//         // else
//         //     router.push("/")
//         router.push("/");
//       }
//     });
//   }

//   // useEffect(() => {
//   //   const checkSession = async () => {
//   //     const signedIn = Boolean(lookInSession("userId"));
//   //     console.log("Signed in:", signedIn);

//   //     if (signedIn) {
//   //       console.log("Redirecting...");
//   //       router.push("/auth/login");
//   //     }
//   //   };

//   //   checkSession();
//   // }, [router]);

//   return (
//     <>
//       {/* <div
//         className="grid place-items-start p-40 pl-20 h-screen w-full bg-gradient-to-r from-[#f5edede8] to-transparent"
//         style={{ backgroundSize: "700% 100%", backgroundPosition: "left" }}
//       >
//         <ErrorAlert error={error} onClose={() => setError(null)} />
//         <div className="h-fit w-fit rounded-lg ">
//           <h2 className="text-sm uppercase mb-2">START FOR FREE</h2>
//           <h3 className="text-4xl font-bold mb-6">Log in to your account</h3>

//           <form onSubmit={login} className="space-y-4">
//             <label>
//               Phone Number
//               <input
//                 name="phone"
//                 type="number"
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//             </label>
//             <label>
//               Password
//               <input
//                 name="password"
//                 type="password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </label>

//             <div className="flex text-white justify-between">
//               <Link
//                 href="/auth/register"
//                 className="text-center hover:underline"
//               >
//                 <Button variant="secondary" label="Register" />
//               </Link>
//               <Button variant="primary" label="Login" />
//             </div>
//           </form>
//         </div>
//         <div className="hidden lg:block lg:w-1/2 -z-50">
//           <Image
//             src="/9.png"
//             alt="Mountain landscape"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-l-lg opacity-30"
//           />
//         </div>
//       </div> */}

//       <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center h-screen w-full bg-gradient-to-r from-[#f5edede8] to-transparent">
//         <div className="px-8 lg:px-20 w-full lg:w-3/4 mt-12">
//           <h2 className="text-sm uppercase mb-2 text-gray-500">
//             START FOR FREE
//           </h2>
//           <h3 className="text-4xl font-bold mb-6">Log in to your account</h3>
//           <form onSubmit={login} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block mb-2 text-[#650002] font-medium"
//               >
//                 Phone Number
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#650002]"
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-[#650002] font-medium"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#650002]"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
//               <Link
//                 href="/auth/register"
//                 className="text-center hover:underline text-[#650002]"
//               >
//                 Register
//               </Link>
//               <Button variant="primary" label="Login" type="submit" />
//             </div>
//           </form>
//         </div>
//         {error && (
//           <ErrorAlert
//             error={error}
//             onClose={() => setError(null)}
//             className="mr-36"
//           />
//         )}
//         {/* <div className="hidden lg:block relative h-full w-full z-0">
//           <Image
//             src="/9.png"
//             alt="Mountain landscape"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-r-lg opacity-30"
//           />
//         </div> */}
//       </div>
//     </>
//   );
// };

// export default Login;

// "use client";
// import React, { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { signIn, SignInResponse } from "next-auth/react";
// import Image from "next/image";
// import Button from "@/components/Button";
// import TextInput from "@/components/TextInput";
// import ErrorAlert from "@/components/ErrorAlert";

// const SigninPage = () => {
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null | Error>(null);
//   const router = useRouter();

//   const validateForm = () => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!phoneNumber || !phoneRegex.test(phoneNumber))
//       return "Please enter a valid Indian phone number.";
//     if (!password || !passwordRegex.test(password))
//       return "Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
//   };

//   const handleSignin = async (e: FormEvent) => {
//     e.preventDefault();
//     const errorMessage = validateForm();
//     if (errorMessage) {
//       setError(errorMessage);
//       return;
//     }

//     signIn("credentials", {
//       phoneNumber,
//       password,
//       redirect: false,
//       redirectTo: "/auth/login",
//     }).then((res: SignInResponse | undefined) => {
//       if (!res) {
//         setError("No response from server");
//         return;
//       }

//       if (!res.ok) {
//         setError(res.error as string | Error | null);
//       } else if (res.error) {
//         setError(res.error);
//         if (res.error === "CallbackRouteError")
//           setError("Could not login! Please check your credentials.");
//         else setError(`Internal Server Error: ${res.error}`);
//       } else {
//         router.push("/");
//       }
//     });
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center h-screen w-full bg-gradient-to-r from-[#f5edede8] to-transparent">
//       <div className="relative h-full w-full z-0">
//         <Image
//           src="/9.png"
//           alt="Mountain landscape"
//           layout="fill"
//           objectFit="cover"
//           className="rounded-l-lg opacity-30"
//         />
//       </div>
//       <div className="px-8 lg:px-20 w-full lg:w-3/4 mt-12">
//         <h2 className="text-sm uppercase mb-2 text-gray-500">START FOR FREE</h2>
//         <h3 className="text-4xl font-bold mb-6">Log in to your account</h3>
//         <form onSubmit={handleSignin} className="space-y-6">
//           <TextInput
//             id="phone"
//             name="phone"
//             label="Phone Number"
//             type="tel"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//           />
//           <TextInput
//             id="password"
//             name="password"
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
//             <Link
//               href="/auth/register"
//               className="text-center hover:underline text-[#650002]"
//             >
//               Register
//             </Link>
//             <Button variant="primary" label="Login" type="submit" />
//           </div>
//         </form>
//       </div>
//       {error && (
//         <ErrorAlert
//           error={error}
//           onClose={() => setError(null)}
//           className="mr-36"
//         />
//       )}
//     </div>
//   );
// };

// export default SigninPage;

"use client";
import React, { useState, FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, SignInResponse } from "next-auth/react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import ErrorAlert from "@/components/ErrorAlert";
import { Icons } from "@/components/Icons";
import { gsap } from "gsap";
import DesktopView from "@/components/views/desktopView";
import TabView from "@/components/views/tabView";
import MobileView from "@/components/views/mobileView";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SigninPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null | Error>(null);
  const router = useRouter();
  const phoneInputRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<SVGTextElement>(null);
  const subtitleTextRef = useRef<SVGTextElement>(null);
  const descriptionTextRef = useRef<SVGTextElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance animation
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Welcome text animation
    timeline.fromTo(
      welcomeTextRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      }
    );

    // Subtitle animation
    timeline.fromTo(
      subtitleTextRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 0.8,
        y: 0,
        duration: 0.8,
      },
      "-=0.5"
    );

    // Description animation
    timeline.fromTo(
      descriptionTextRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 0.6,
        y: 0,
        duration: 0.8,
      },
      "-=0.5"
    );

    // Mouse move animation setup
    const handleMouseMove = (e: MouseEvent) => {
      if (!textContainerRef.current) return;

      const rect = textContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      // Calculate movement factor (smaller number = more subtle movement)
      const moveFactorX = mouseX * 0.02;
      const moveFactorY = mouseY * 0.02;

      // Animate welcome text
      gsap.to(welcomeTextRef.current, {
        x: moveFactorX,
        y: moveFactorY,
        duration: 0.5,
      });

      // Animate subtitle with reduced movement
      gsap.to(subtitleTextRef.current, {
        x: moveFactorX * 0.5,
        y: moveFactorY * 0.5,
        duration: 0.5,
      });

      // Animate description with further reduced movement
      gsap.to(descriptionTextRef.current, {
        x: moveFactorX * 0.3,
        y: moveFactorY * 0.3,
        duration: 0.5,
      });

      // Subtle color change based on mouse position
      const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const maxDistance =
        Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
      const colorIntensity = Math.min(distanceFromCenter / maxDistance, 1);

      gsap.to(
        [
          welcomeTextRef.current,
          subtitleTextRef.current,
          descriptionTextRef.current,
        ],
        {
          fill: gsap.utils.interpolate("white", "#ffcccc", colorIntensity),
          duration: 0.5,
        }
      );
    };

    // Add mouse move listener
    if (textContainerRef.current) {
      textContainerRef.current.addEventListener("mousemove", handleMouseMove);
    }

    // Cleanup
    return () => {
      if (textContainerRef.current) {
        textContainerRef.current.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      }
    };
  }, []);

  const validateForm = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      shakeInput(phoneInputRef.current);
      return "Please enter a valid Indian phone number.";
    }
    if (!password || !passwordRegex.test(password)) {
      shakeInput(passwordInputRef.current);
      return "Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }
    return "";
  };

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    signIn("credentials", {
      phoneNumber,
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
          setError("Could not login! Please check your credentials.");
        else setError(`Internal Server Error: ${res.error}`);
      } else {
        router.push("/");
      }
    });
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
        <div className="relative h-full w-full bg-[#650002] flex flex-col">
          <div className="absolute top-8 left-8">
            <Link href="/">
              {/* logo */}
              <Icons.LogoAuth />
            </Link>
          </div>

          <div
            className="flex-1 flex items-center justify-center"
            ref={textContainerRef}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-4/5 h-4/5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="circleClip">
                  <circle cx="200" cy="200" r="100" />
                </clipPath>
              </defs>

              {/* Background Pattern */}
              <g clipPath="url(#circleClip)">
                <rect width="400" height="400" fill="#650002" />
                <path
                  d="M0 0 L400 400 M0 40 L400 440 M0 80 L400 480 M0 120 L400 520"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
              </g>

              {/* Welcome Text */}
              <text
                ref={welcomeTextRef}
                x="200"
                y="180"
                textAnchor="middle"
                fill="white"
                fontSize="32"
                fontWeight="bold"
              >
                Welcome Back!
              </text>
              <text
                ref={subtitleTextRef}
                x="200"
                y="220"
                textAnchor="middle"
                fill="white"
                fontSize="16"
                opacity="0.8"
              >
                We're glad to see you again
              </text>
              <text
                ref={descriptionTextRef}
                x="200"
                y="250"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                opacity="0.6"
              >
                Log in to continue your journey
              </text>
            </svg>
          </div>
        </div>
        <div className="px-8 lg:px-28 w-full lg:w-full mt-12">
          {/* <h2 className="text-sm uppercase mb-2 text-gray-500">START FOR FREE</h2> */}
          <h3 className="text-4xl font-bold mb-6 flex justify-start items-start text-[#650002]">
            Login
          </h3>
          <form onSubmit={handleSignin} className="space-y-6">
            <div ref={phoneInputRef}>
              <TextInput
                id="phone"
                name="phone"
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div ref={passwordInputRef}>
              <TextInput
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col lg:flex-col justify-between space-y-4 lg:space-y-0">
              <Button
                variant="primary"
                label="Login"
                type="submit"
                className="p-6 py-2 uppercase no-underline rounded-xl flex items-center justify-center duration-300 transition-all bg-[#650002] text-white hover:bg-[#450001] w-full"
              />
              {/* <Link
                href="/auth/register"
                className="text-center hover:underline text-[#650002]"
              >
                Register
              </Link> */}
              <div className="text-center pt-3">
                Not registered yet?{" "}
                <Link 
                  href="/auth/register"
                  className="hover:underline text-[#650002]"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
        {error && (
          <ErrorAlert
            error={error}
            onClose={() => setError(null)}
            // className="mr-36"
          />
        )}
      </div>
    </>
  );
};

export default SigninPage;
