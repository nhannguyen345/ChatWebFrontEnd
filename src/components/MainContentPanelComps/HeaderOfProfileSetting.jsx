import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setProfileMainPanelVisibility } from "../../features/panelVisibility/panelVisibilitySlice";
// import { setPanelVisibility } from "../../features/panelVisibility/panelVisibilitySlice";

const HeaderOfProfileSetting = () => {
  const dispatch = useDispatch();
  return (
    <div className="sticky top-0 w-full flex items-center px-4 py-4 shadow-sm border-b border-b-[#e0e0e0] bg-white">
      {/* Back */}
      <IoMdArrowBack
        onClick={() => dispatch(setProfileMainPanelVisibility(false))}
        className="h-[28px] w-[34px] text-[#adb5bd] hover:text-[#495057] mr-2 sm:block md:hidden"
      />
      <div>
        <h4 className="text-lg font-semibold text-[#495057] mb-3">Settings</h4>
        <p className="text-sm text-[#adb5bd]">
          Update Personal Information & Settings
        </p>
      </div>
    </div>
  );
};

export default HeaderOfProfileSetting;
