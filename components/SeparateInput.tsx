// components/SeparateInput.tsx
import React from "react";

interface SeparateInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  label: string;
  type?: string;
}
const SeparateInput: React.FC<SeparateInputProps> = ({
  value,
  setValue,
  placeholder,
  label,
  type = "text",
}) => {
  return (
    <div className="flex flex-col self-center w-1/2 items-center justify-center">
      <label className="mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="border bg-transparent w-96 rounded p-2 text-black"
      />
    </div>
  );
};

export default SeparateInput;
