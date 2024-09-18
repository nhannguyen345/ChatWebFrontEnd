import React from "react";
import { BiLogOut } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const Avatar = () => {
  const LogoutButton = () => (
    <button className="flex items-center gap-1 text-sm text-[#495057] px-4 py-2 mx-1.5 border border-[#e5e9f2] hover:border-red-500 group rounded bg-transparent">
      <BiLogOut className="h-4.5 w-4.5 group-hover:text-red-500" />
      <span className="group-hover:text-red-500">Logout</span>
    </button>
  );

  return (
    <div className="relative flex flex-col items-center bg-white p-5 mt-5 border rounded">
      <img
        className="h-20 w-20 rounded-full mb-3"
        src="https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg"
        alt="Profile"
      />
      <p className="text-xl text-[#495057] mb-3 font-medium">Martin Beter</p>
      <LogoutButton />
      <BsThreeDotsVertical className="absolute top-3 right-3 text-[#adb5bd] text-xl" />
    </div>
  );
};

export default Avatar;
