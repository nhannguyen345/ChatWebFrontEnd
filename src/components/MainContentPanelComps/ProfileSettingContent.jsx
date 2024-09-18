import React, { useState } from "react";
import HeaderOfProfileSetting from "./HeaderOfProfileSetting";

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div className="mb-2">
    <label className="block text-[15px] leading-[1.5] text-[#495057] mb-[6px]">
      {label}
    </label>
    <input
      type={type}
      className="w-full h-11 px-3 py-[6px] text-[14px] leading-[1.5] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const FormSection = ({ title, description, children, onSubmit, onReset }) => (
  <div className="border border-gray-200 rounded-[4px] mt-5">
    <div className="px-5 py-3 border-b bg-[#f8f9fa]">
      <h3 className="text-[16px] leading-[1.2] font-medium text-[#495057] mb-[6px]">
        {title}
      </h3>
      <p className="text-[12px] leading-[1.2] text-[#adb5bd]">{description}</p>
    </div>
    <form onSubmit={onSubmit} className="p-5">
      {children}
      <div className="px-5 mt-6 flex items-center justify-end gap-2 space-x-3">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-[#adb5bd] hover:text-gray-700 hover:underline"
        >
          Reset
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#665dfe] hover:bg-[#4237fe] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
);

const ProfileSettingContent = () => {
  const [accountData, setAccountData] = useState({
    userName: "Catherine",
    mobileNumber: "+01-222-364522",
    emailAddress: "catherine.richardson@gmail.com",
    address: "1134 Ridder Park Road, San Fransisco, CA 94851",
  });

  const [socialData, setSocialData] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const handleChange = (setter) => (field, value) => {
    setter((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (data) => (e) => {
    e.preventDefault();
    console.log("Form submitted:", data);
  };

  const handleReset = (setter, initialData) => () => {
    setter(initialData);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <HeaderOfProfileSetting />
      <div className="px-4 overflow-y-scroll no-scrollbar">
        <FormSection
          title="Account"
          description="Update personal & contact information"
          onSubmit={handleSubmit(accountData)}
          onReset={handleReset(setAccountData, accountData)}
        >
          <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 mb-3">
            {Object.entries(accountData).map(([key, value]) => (
              <InputField
                key={key}
                label={
                  key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                }
                value={value}
                onChange={(value) => handleChange(setAccountData)(key, value)}
                type={key === "emailAddress" ? "email" : "text"}
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          title="Social network profiles"
          description="Update social media information"
          onSubmit={handleSubmit(socialData)}
          onReset={handleReset(setSocialData, {
            facebook: "",
            twitter: "",
            instagram: "",
          })}
        >
          <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 mb-3">
            {Object.entries(socialData).map(([key, value]) => (
              <InputField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={(value) => handleChange(setSocialData)(key, value)}
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          title="Password"
          description="Update your password"
          onSubmit={handleSubmit(passwordData)}
          onReset={handleReset(setPasswordData, {
            currentPassword: "",
            newPassword: "",
            repeatPassword: "",
          })}
        >
          <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 mb-3">
            {Object.entries(passwordData).map(([key, value]) => (
              <InputField
                key={key}
                type="password"
                label={
                  key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                }
                value={value}
                onChange={(value) => handleChange(setPasswordData)(key, value)}
              />
            ))}
          </div>
        </FormSection>
      </div>
    </div>
  );
};

export default ProfileSettingContent;
