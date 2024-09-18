import React from "react";
import { RiProhibited2Line } from "react-icons/ri";
const ProfileSummary = () => {
  return (
    <div className="w-full flex flex-col items-center gap-3 p-8 border-b">
      <img
        className="h-[120px] w-[120px] rounded-full object-cover"
        src="https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg"
        alt=""
      />
      <h5 className="text-[20px] text-[#495057] font-medium leading-[1.2]">
        Cathana
      </h5>
      <button className="flex items-center gap-2 text-[14px] text-white font-medium px-5 py-1 outline-none rounded-sm border border-[#ff337c] bg-[#ff337c] hover:bg-[#c9265f]">
        Unfriend
      </button>
    </div>
  );
};

export default ProfileSummary;
