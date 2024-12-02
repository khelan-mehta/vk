import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-semibold">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full px-4 py-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-[#650002]"
        {...rest}
      />
    </div>
  );
};

export default TextInput;
