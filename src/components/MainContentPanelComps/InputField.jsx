import React from "react";

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div
    className={
      "mb-2 max-sm:col-span-2 " + (label === "Address" ? "col-span-2" : "")
    }
  >
    <label className="block text-[15px] leading-[1.5] text-[#495057] mb-[6px]">
      {label}
    </label>
    <input
      type={type}
      className={`w-full h-11 px-3 py-[6px] text-[14px] leading-[1.5] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
      readOnly={
        label === "User Name" || label === "Email Address" ? true : false
      }
      value={value}
      onChange={(e) => onChange(e.target.value)}
      pattern={label === "Mobile Number" ? "[0-9]*" : undefined}
      inputMode={label === "Mobile Number" ? "numeric" : undefined}
    />
  </div>
);

export default InputField;
