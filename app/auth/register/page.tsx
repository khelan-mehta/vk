// "use client";
// import React, { useState, useEffect, FormEvent, useRef } from "react";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import ProgressBar from "@/components/ProgressBar";
// import IconButton from "@/components/IconButton";
// import TextInput from "@/components/TextInput";
// import Button from "@/components/Button";
// import Image from "next/image";
// import ErrorAlert from "@/components/ErrorAlert";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { gsap } from "gsap";

// const languageMap: { [key: string]: string } = {
//   Hindi: "hi",
//   English: "en",
//   Gujarati: "gj",
// };
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const RegisterPage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedLanguage, setSelectedLanguage] = useState("hi");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [addressLine1, setAddressLine1] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | Error | null>(null);
//   const [location, setLocation] = useState<GeolocationPosition | null>(null);
//   const router = useRouter();
//   const totalSteps = 3;

//   const phoneInputRef = useRef<HTMLDivElement>(null);
//   const passwordInputRef = useRef<HTMLDivElement>(null);
//   const emailRef = useRef<HTMLDivElement>(null);
//   const nameRef = useRef<HTMLDivElement>(null);
//   const confirmPasswordRef = useRef<HTMLDivElement>(null);
//   const addressRef = useRef<HTMLDivElement>(null);
//   const cityRef = useRef<HTMLDivElement>(null);
//   const countryRef = useRef<HTMLDivElement>(null);

//   const welcomeTextRef = useRef<SVGTextElement>(null);
//   const subtitleTextRef = useRef<SVGTextElement>(null);
//   const descriptionTextRef = useRef<SVGTextElement>(null);
//   const svfRef = useRef(null);

//   const changeLanguage = (lang: string) => {
//     Cookies.set("locale", lang, { expires: 365 });
//     setSelectedLanguage(lang);
//   };
//   useEffect(() => {
//     // Initial entrance animation
//     const timeline = gsap.timeline({
//       defaults: { ease: "power3.out" },
//     });

//     // Welcome text animation
//     timeline.fromTo(
//       welcomeTextRef.current,
//       {
//         opacity: 0,
//         y: 50,
//       },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//       }
//     );

//     // Subtitle animation
//     timeline.fromTo(
//       subtitleTextRef.current,
//       {
//         opacity: 0,
//         y: 30,
//       },
//       {
//         opacity: 0.8,
//         y: 0,
//         duration: 0.8,
//       },
//       "-=0.5"
//     );

//     // Description animation
//     timeline.fromTo(
//       descriptionTextRef.current,
//       {
//         opacity: 0,
//         y: 20,
//       },
//       {
//         opacity: 0.6,
//         y: 0,
//         duration: 0.8,
//       },
//       "-=0.5"
//     );

//     // Mouse move animation setup
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!textContainerRef.current) return;

//       const rect = textContainerRef.current.getBoundingClientRect();
//       const mouseX = e.clientX - rect.left - rect.width / 2;
//       const mouseY = e.clientY - rect.top - rect.height / 2;

//       // Calculate movement factor (smaller number = more subtle movement)
//       const moveFactorX = mouseX * 0.02;
//       const moveFactorY = mouseY * 0.02;

//       // Animate welcome text
//       gsap.to(welcomeTextRef.current, {
//         x: moveFactorX,
//         y: moveFactorY,
//         duration: 0.5,
//       });

//       // Animate subtitle with reduced movement
//       gsap.to(subtitleTextRef.current, {
//         x: moveFactorX * 0.5,
//         y: moveFactorY * 0.5,
//         duration: 0.5,
//       });

//       // Animate description with further reduced movement
//       gsap.to(descriptionTextRef.current, {
//         x: moveFactorX * 0.3,
//         y: moveFactorY * 0.3,
//         duration: 0.5,
//       });

//       // Subtle color change based on mouse position
//       const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
//       const maxDistance =
//         Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
//       const colorIntensity = Math.min(distanceFromCenter / maxDistance, 1);

//       gsap.to(
//         [
//           welcomeTextRef.current,
//           subtitleTextRef.current,
//           descriptionTextRef.current,
//         ],
//         {
//           fill: gsap.utils.interpolate("white", "#ffcccc", colorIntensity),
//           duration: 0.5,
//         }
//       );
//     };

//     // Add mouse move listener
//     if (textContainerRef.current) {
//       textContainerRef.current.addEventListener("mousemove", handleMouseMove);
//     }

//     // Cleanup
//     return () => {
//       if (textContainerRef.current) {
//         textContainerRef.current.removeEventListener(
//           "mousemove",
//           handleMouseMove
//         );
//       }
//     };
//   }, []);
//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[6-9]\d{9}$/;
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!name) return "Name is required.";
//     if (!email || !emailRegex.test(email)) return "Please enter a valid email.";
//     if (!phoneNumber || !phoneRegex.test(phoneNumber))
//       return "Please enter a valid Indian phone number.";
//     if (!password || !passwordRegex.test(password))
//       return "Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
//     if (password !== confirmPassword) return "Passwords do not match.";
//     if (currentStep === 3 && (!addressLine1 || !city || !country))
//       return "Please fill all address fields.";
//     return null;
//   };

//   const nextStep = () => {
//     setError(null);
//     setCurrentStep((prev) => prev + 1);
//   };

//   const prevStep = () => setCurrentStep((prev) => prev - 1);

//   const handleRegister = async () => {
//     const errorMessage = validateForm();
//     if (errorMessage) {
//       setError(errorMessage);
//       return;
//     }

//     if (!location) {
//       setError("Unable to get the user location!");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const payload = {
//       email,
//       name,
//       password,
//       phoneNumber,
//       addressLine1,
//       city,
//       country,
//       isAdmin: false,
//       enrolledMembership: null,
//       location: {
//         type: "Point",
//         coordinates: [location.coords.latitude, location.coords.longitude],
//       },
//     };

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}users/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//         toast.success("Registration successful");
//         router.push("/auth/login");
//       } else {
//         const data = await response.json();
//         setError(data.message || "Registration failed");
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const shakeInput = (element: HTMLElement | null) => {
//     if (!element) return;
//     gsap.timeline().to(element, {
//       x: -10,
//       duration: 0.1,
//       yoyo: true,
//       repeat: 5,
//     });
//   };
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       setLocation(pos);
//     });
//   }, [location]);

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f5eded] to-transparent p-4 z-10"
//       style={{ backgroundSize: "700% 100%", backgroundPosition: "left" }}
//     >
//       <div className="w-full max-w-md bg-[#f4f4f0] rounded-lg shadow-md overflow-hidden mt-24">
//         <div className="p-6">
//           <h2 className="text-2xl font-bold text-center text-[#650002] mb-6">
//             Register
//           </h2>
//           <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
//           {error && (
//             <ErrorAlert
//               error={error}
//               onClose={() => setError(null)}
//               className="mr-10"
//             />
//           )}
//           <div className="mt-8">
//             {currentStep === 1 && (
//               <>
//                 <h3 className="text-lg font-semibold text-center mb-4">
//                   Select Your Language
//                 </h3>
//                 <div className="grid grid-cols-3 gap-4 relative z-10">
//                   {Object.keys(languageMap).map((lang) => (
//                     <Button
//                       key={lang}
//                       label={lang}
//                       variant={
//                         selectedLanguage === languageMap[lang]
//                           ? "primary"
//                           : "secondary"
//                       }
//                       onClick={() => changeLanguage(languageMap[lang])}
//                       className={`w-full ${
//                         selectedLanguage === languageMap[lang]
//                           ? "bg-[#650002] text-white"
//                           : "bg-transparent border-[#650002] text-[#650002]"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <div className="mt-8 flex flex-col items-center">
//                   <IconButton onClick={nextStep} text="NEXT" className="z-10" />
//                 </div>
//               </>
//             )}

//             {currentStep === 2 && (
//               <>
//                 <div className="space-y-4">
//                   <TextInput
//                     label="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="John Doe"
//                   />
//                   <TextInput
//                     label="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="john.doe@example.com"
//                     type="email"
//                   />
//                   <TextInput
//                     label="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     type="password"
//                   />
//                   <TextInput
//                     label="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm your password"
//                     type="password"
//                   />
//                   <TextInput
//                     label="Phone Number"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     placeholder="986******9"
//                     type="tel"
//                   />
//                 </div>
//                 <div className="flex justify-between mt-8">
//                   <IconButton onClick={prevStep} text="BACK" className="w-24" />
//                   <IconButton
//                     onClick={nextStep}
//                     text="NEXT"
//                     className="w-24 z-10"
//                   />
//                 </div>
//               </>
//             )}

//             {currentStep === 3 && (
//               <>
//                 <div className="space-y-4">
//                   <TextInput
//                     label="Address Line 1"
//                     value={addressLine1}
//                     onChange={(e) => setAddressLine1(e.target.value)}
//                     placeholder="123 Main St"
//                   />
//                   <TextInput
//                     label="City"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     placeholder="City"
//                   />
//                   <TextInput
//                     label="Country"
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                     placeholder="Country"
//                   />
//                 </div>
//                 <div className="flex justify-between mt-8">
//                   <IconButton onClick={prevStep} text="BACK" className="w-24" />
//                   <IconButton
//                     onClick={handleRegister}
//                     text={loading ? "REGISTERING..." : "REGISTER"}
//                     className="z-10"
//                     disabled={loading}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* <div className="hidden lg:block lg:w-1/2 fixed right-0 top-0 bottom-0 z-0">
//         <Image
//           src="/9.png"
//           alt="Mountain landscape"
//           layout="fill"
//           objectFit="cover"
//           className="rounded-l-lg opacity-30"
//         />
//       </div> */}
//     </div>
//   );
// };

// export default RegisterPage;

"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import IconButton from "@/components/IconButton";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import ErrorAlert from "@/components/ErrorAlert";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

const languageMap: { [key: string]: string } = {
  Hindi: "hi",
  English: "en",
  Gujarati: "gj",
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const RegisterPage = () => {
  // Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const phoneInputRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const confirmPasswordRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  // Animation Refs
  const svgRef = useRef<SVGSVGElement>(null);
  const welcomeTextRef = useRef<SVGTextElement>(null);
  const subtitleTextRef = useRef<SVGTextElement>(null);
  const descriptionTextRef = useRef<SVGTextElement>(null);
  const circlesRef = useRef<SVGGElement>(null);

  const router = useRouter();
  const totalSteps = 3;

  // Animation Setup
  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Initial animations
    timeline
      .fromTo(
        welcomeTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(
        subtitleTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 0.8, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        descriptionTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.6, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        circlesRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        "-=1"
      );

    // Mouse movement animation
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - rect.width / 2) * 0.02;
      const mouseY = (e.clientY - rect.top - rect.height / 2) * 0.02;

      gsap.to(
        [
          welcomeTextRef.current,
          subtitleTextRef.current,
          descriptionTextRef.current,
        ],
        {
          x: (i) => mouseX * (1 - i * 0.2),
          y: (i) => mouseY * (1 - i * 0.2),
          duration: 0.5,
        }
      );

      gsap.to(circlesRef.current, {
        x: mouseX * 0.1,
        y: mouseY * 0.1,
        duration: 0.5,
      });
    };

    if (svgRef.current) {
      svgRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (svgRef.current) {
        svgRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation(pos);
    });
  }, []);

  // Form validation
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name) {
      shakeInput(nameRef.current);
      return "Name is required.";
    }
    if (!email || !emailRegex.test(email)) {
      shakeInput(emailRef.current);
      return "Please enter a valid email.";
    }
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      shakeInput(phoneInputRef.current);
      return "Please enter a valid Indian phone number.";
    }
    if (!password || !passwordRegex.test(password)) {
      shakeInput(passwordInputRef.current);
      return "Password must be at least 8 characters, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    }
    if (!confirmPassword) {
      shakeInput(confirmPasswordRef.current);
      return "enter confirm password";
    }
    if (password !== confirmPassword) {
      shakeInput(passwordInputRef.current);
      shakeInput(confirmPasswordRef.current);
      return "Passwords do not match.";
    }
    if (currentStep === 3 && (!addressLine1 || !city || !country))
      return "Please fill all address fields.";
    return null;
  };

  // Navigation handlers
  const nextStep = () => {
    setError(null);
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Language handler
  const changeLanguage = (lang: string) => {
    Cookies.set("locale", lang, { expires: 365 });
    setSelectedLanguage(lang);
  };

  // Registration handler
  const handleRegister = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    if (!location) {
      setError("Unable to get the user location!");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      email,
      name,
      password,
      phoneNumber,
      addressLine1,
      city,
      country,
      isAdmin: false,
      enrolledMembership: null,
      location: {
        type: "Point",
        coordinates: [location.coords.latitude, location.coords.longitude],
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}users/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Registration successful");
        router.push("/auth/login");
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
    <div className="grid grid-cols-2 min-h-screen">
      {/* Left side - SVG Animation */}
      <div className="bg-gradient-to-br from-[#650002] to-[#450001] p-8 grid place-items-center">
        <div className="absolute top-8 left-8">
          <Link href="/">
            {/* logo */}
            <Icons.LogoAuth />
          </Link>
        </div>
        <svg
          ref={svgRef}
          viewBox="0 0 500 500"
          className="w-4/5 h-4/5"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="textGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f5f5f5" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g ref={circlesRef}>
            <circle
              cx="250"
              cy="250"
              r="150"
              fill="none"
              stroke="#ffffff20"
              strokeWidth="2"
            />
            <circle
              cx="250"
              cy="250"
              r="100"
              fill="none"
              stroke="#ffffff15"
              strokeWidth="1"
            />
            <circle
              cx="250"
              cy="250"
              r="200"
              fill="none"
              stroke="#ffffff10"
              strokeWidth="1"
            />
          </g>

          <text
            ref={welcomeTextRef}
            x="250"
            y="200"
            textAnchor="middle"
            className="text-5xl font-bold"
            fill="url(#textGradient)"
            filter="url(#glow)"
          >
            Welcome
          </text>

          <text
            ref={subtitleTextRef}
            x="250"
            y="240"
            textAnchor="middle"
            className="text-2xl"
            fill="rgba(255,255,255,0.8)"
          >
            Create Your Account
          </text>

          <text
            ref={descriptionTextRef}
            x="250"
            y="280"
            textAnchor="middle"
            className="text-xl"
            fill="rgba(255,255,255,0.6)"
          >
            Join our community today
          </text>
        </svg>
      </div>

      {/* Right side - Registration Form */}
      <div className="bg-[#f4f4f0] overflow-auto">
        <div className="grid place-items-center min-h-full p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-[#650002] mb-6">
              Register
            </h2>

            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            {error && (
              <ErrorAlert
                error={error}
                onClose={() => setError(null)}
                className="mb-4"
              />
            )}

            <div className="mt-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-center mb-4">
                    Select Your Language
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(languageMap).map(([lang, code]) => (
                      <Button
                        key={lang}
                        label={lang}
                        variant={
                          selectedLanguage === code ? "primary" : "secondary"
                        }
                        onClick={() => changeLanguage(code)}
                        className={`w-full rounded-lg p-2 ${
                          selectedLanguage === code
                            ? "bg-[#650002] text-white"
                            : "bg-transparent border-[#650002] text-[#650002]"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="grid place-items-center pt-4">
                    <IconButton onClick={nextStep} text="NEXT" />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div ref={nameRef}>
                      <TextInput
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div ref={emailRef}>
                      <TextInput
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </div>
                    <div ref={passwordInputRef}>
                      <TextInput
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        type="password"
                      />
                    </div>
                    <div ref={confirmPasswordRef}>
                      <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        type="password"
                      />
                    </div>
                    <div ref={phoneInputRef}>
                      <TextInput
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="986******9"
                        type="tel"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <IconButton onClick={prevStep} text="BACK" />
                    <IconButton onClick={nextStep} text="NEXT" />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div ref={addressRef}>
                      <TextInput
                        label="Address Line 1"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div ref={cityRef}>
                      <TextInput
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div ref={countryRef}>
                      <TextInput
                        label="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <IconButton onClick={prevStep} text="BACK" />
                    <IconButton
                      onClick={handleRegister}
                      text={loading ? "REGISTERING..." : "REGISTER"}
                      disabled={loading}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
