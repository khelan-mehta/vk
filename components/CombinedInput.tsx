// components/CombinedInput.tsx
import React from "react";

interface CombinedInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  label: string;
  inputType?: string;
}

const CombinedInput: React.FC<CombinedInputProps> = ({
  value,
  setValue,
  placeholder,
  label,
  inputType = "text",
}) => {
  return (
    <div className="flex flex-col self-center w-1/2 items-center justify-center ">
      <label className="mb-1">{label}</label>
      <input
        type={inputType}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="border bg-transparent w-96 rounded p-2 text-black"
      />
    </div>
  );
};

export default CombinedInput;
