import React from "react";
import { GoFile } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";

const FileMessageRightSide = ({ item, index }) => {
  return (
    <div className="w-full h-fit text-right my-[36px]">
      <div className="inline-block text-left max-w-[400px] bg-[#665dfe] text-[#ffffff] text-[14px] mr-[20px] px-[36px] py-[16px] rounded-[20px]">
        {item.contentType === "image" ? (
          <img
            className="max-w-full h-auto rounded-md object-cover"
            src={item.urlFile}
          />
        ) : (
          <div className="flex justify-center items-center">
            <div className="h-[48px] w-[48px] flex justify-center items-center bg-[#4e44fe] rounded-full mr-[12px] cursor-pointer">
              <GoFile className="h-[24px] w-[24px] text-[#f8f9fa] stroke-1" />
            </div>
            <div className="flex flex-col">
              <a
                className="text-[#ffffff] text-[14px] font-[500] no-underline bg-transparent cursor-pointer"
                title={item.content.split("-")[0]}
              >
                {item.content.split("-")[0]}
              </a>
              <span className="text-[#ffffff] text-[12px]">
                {item.content.split("-")[1]} KB
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="relative h-fit flex justify-end items-center gap-2 mr-[28px] text-[#adb5bd]">
        <span className="leading-[18px] inline-block align-middle text-[12px]">
          {item.sendAt}
        </span>
      </div>

      <div className="text-[10px] mt-2 mr-[28px]">
        {item?.statusMess === "pending" && (
          <span className="text-blue-500">Sending...</span>
        )}
        {item?.statusMess === "error" && (
          <span className="text-red-500">Failed</span>
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

export default FileMessageRightSide;
