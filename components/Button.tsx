import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  ...rest
}) => {
  const baseStyle =
    "p-6 py-2 uppercase border no-underline rounded-xl flex items-center justify-center duration-300 transition-all";
  const primaryStyle = "bg-[#650002] text-white hover:bg-[#450001]";
  const secondaryStyle =
    "bg-transparent border-[#650002] border text-[#650002] hover:bg-[#650002] hover:text-white";

  const buttonStyle = variant === "primary" ? primaryStyle : secondaryStyle;

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${buttonStyle}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
