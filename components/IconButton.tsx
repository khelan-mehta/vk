import React from "react";

interface IconButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#650002] text-white py-2 px-6 rounded-lg ${className}`}
      // disabled={disabled}
    >
      {text}
    </button>
  );
};

export default IconButton;
