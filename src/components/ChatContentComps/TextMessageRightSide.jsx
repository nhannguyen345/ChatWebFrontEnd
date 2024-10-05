import React from "react";
import { BsThreeDots } from "react-icons/bs";
import PopoverMenuOptionsMessage from "./PopoverMenuOptionsMessage";
import { IoMdCheckmark } from "react-icons/io";
import { formattedTime } from "../../utils/timeUtils";

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
          {formattedTime(item.createdAt)}
        </span>
      </div>

      <div className="text-[10px] mt-2 mr-[28px]">
        {item?.statusMess === "pending" && (
          <span className="text-blue-500">Đang gửi...</span>
        )}
        {item?.statusMess === "error" && (
          <span className="text-red-500">Gửi thất bại</span>
        )}
        {item?.statusMess === "success" && (
          <span className="text-green-500">
            <IoMdCheckmark />
          </span>
        )}
      </div>
    </div>
  );
};

export default TextMessageRightSide;
