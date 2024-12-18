import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Icons } from "./Icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
const LeftHero = () => {
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
  return (
    <div className="items-center justify-center h-[70vh] sm:h-screen w-full bg-gradient-to-r from-[#f5edede8] to-transparent">
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
    </div>
  );
};

export default LeftHero;
