import React from "react";
import { BsThreeDots } from "react-icons/bs";
import PopoverMenuOptionsMessage from "./PopoverMenuOptionsMessage";

const TextMessageRightSide = ({ item, index, toggleMenu, openMenuId }) => {
  return (
    <div className="w-full h-fit text-right my-[36px]">
      <div className="inline-block text-left max-w-[400px] bg-[#665dfe] text-[#ffffff] text-[14px] mr-[20px] px-[36px] py-[16px] rounded-[20px]">
        <span className="text-[15px]">{item.content}</span>
      </div>
      <div className="relative h-fit flex justify-end items-center gap-2 mt-[6px] mr-[28px] text-[#adb5bd]">
        <BsThreeDots
          className="h-[18px] w-[18px] align-middle text-[12px] cursor-pointer"
          onClick={() => toggleMenu(index)}
        />

        {openMenuId === index && <PopoverMenuOptionsMessage message={item} />}

        <span className="leading-[18px] inline-block align-middle text-[12px]">
          {item.sendAt}
        </span>
      </div>
    </div>
  );
};

export default TextMessageRightSide;
