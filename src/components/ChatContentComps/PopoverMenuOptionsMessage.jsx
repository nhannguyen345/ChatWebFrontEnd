import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
const PopoverMenuOptionsMessage = ({ message }) => {
  return (
    <div
      className={
        "absolute top-1 z-20 transform translate-y-4 w-[110px] h-fit flex flex-col py-3 bg-white rounded-md border " +
        (message.senderId === "1" ? "right-0 " : "left-0 ")
      }
    >
      {message.senderId === "1" && (
        <button
          className="px-5 py-1 flex flex-row gap-3 items-center text-[#495057] text-[15px] max-sm:text-[14px]"
          href="#"
        >
          <CiEdit style={{ fontSize: "16px" }} />
          <span className="w-[54px] text-[14px] text-start">Edit</span>
        </button>
      )}
      <button
        className="px-5 py-1 flex flex-row gap-3 items-center text-[#495057] text-[15px] max-sm:text-[14px]"
        href="#"
      >
        <CiTrash style={{ fontSize: "16px", color: "#ff337c" }} />
        <span className="w-[54px] text-[14px] text-[#ff337c] text-start">
          Delete
        </span>
      </button>
    </div>
  );
};

export default PopoverMenuOptionsMessage;
