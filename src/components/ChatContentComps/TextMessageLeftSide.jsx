import React from "react";
import { BsThreeDots } from "react-icons/bs";
import PopoverMenuOptionsMessage from "./PopoverMenuOptionsMessage";

const TextMessageLeftSide = ({ item, index, toggleMenu, openMenuId }) => {
  return (
    <div className="w-full h-fit text-left my-[36px]">
      <div className="inline-block relative text-left max-w-[400px] bg-[#f5f6fa] text-[#8094ae] text-[14px] ml-[30px] px-[36px] py-[16px] rounded-[20px]">
        <h6 className="text-[#343a40] text-[16px] mb-[6px] font-[500] leading-[1.2]">
          {"Cathana"}
        </h6>
        <span className="text-[15px]">{item.content}</span>
        <img
          className="absolute -left-4 -bottom-6 h-[36px] w-[36px] object-cover box-content shadow-custom rounded-full my-auto"
          src="https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg"
          alt=""
        />
      </div>
      <div className="relative flex justify-start items-center gap-2 mt-[6px] ml-[58px] text-[#adb5bd]">
        <span className="leading-[18px] inline-block align-middle text-[12px]">
          {item.sendAt}
        </span>
        <BsThreeDots
          className="h-[18px] w-[18px] align-middle text-[12px] cursor-pointer"
          onClick={() => toggleMenu(index)}
        />

        {openMenuId === index && <PopoverMenuOptionsMessage message={item} />}
      </div>
    </div>
  );
};

export default TextMessageLeftSide;
