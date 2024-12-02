import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  backgroundColor?: string;
  onClick?: () => void; // Added onClick prop
  size?: "small" | "medium" | "large"; // New size prop
}

const Button: React.FC<ButtonProps> = ({
  label,
  backgroundColor = "rgba(101, 101, 101, 0.7)", // Set a semi-transparent background color
  onClick, // Destructure onClick prop
  size = "medium", // Default size
}) => {
  const circle = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline>(null);

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        {
          top: "-25%",
          width: "150%",
          duration: 0.4,
          ease: "power3.in",
        },
        "enter"
      )
      .to(
        circle.current,
        {
          top: "-150%",
          width: "125%",
          duration: 0.25,
        },
        "exit"
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current?.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  // Determine the size classes based on the size prop
  const sizeClasses = {
    small: "px-4 py-1 text-sm",
    medium: "px-5 py-2 text-base",
    large: "px-8 py-4 text-lg", // Larger size for loader
  };

  return (
    <div
      className={`relative flex items-center justify-center cursor-pointer rounded-full border border-gray-400 bg-black bg-opacity-20 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300 ${sizeClasses[size]}`}
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
      onClick={onClick} // Add onClick handler
    >
      <span className="relative z-10 text-white transition-colors duration-400">
        {label}
      </span>
      <div
        ref={circle}
        style={{ backgroundColor }}
        className="absolute rounded-full top-full w-full h-[150%]"
      ></div>
    </div>
  );
};

export default Button;
