import React from "react";
import { ImSpinner } from "react-icons/im";

const FormSection = ({
  loading,
  title,
  description,
  children,
  onSubmit,
  onReset,
}) => (
  <div className="border border-gray-200 rounded-[4px] mt-5">
    <div className="px-5 py-3 border-b bg-[#f8f9fa]">
      <h3 className="text-[16px] leading-[1.2] font-medium text-[#495057] mb-[6px]">
        {title}
      </h3>
      <p className="text-[12px] leading-[1.2] text-[#adb5bd]">{description}</p>
    </div>
    <form className="p-5">
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
          onClick={onSubmit}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#665dfe] hover:bg-[#4237fe] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? (
            <ImSpinner className="animate-spin h-[18px] w-[18px]" />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  </div>
);

export default FormSection;
