import React from "react";
import { GoFile } from "react-icons/go";
const FileMessageLeftSide = ({ item, index }) => {
  return (
    <div className="w-full h-fit text-left my-[36px]">
      <div className="inline-block relative text-left max-w-[400px] bg-[#f5f6fa] text-[#8094ae] text-[14px] ml-[30px] px-[36px] py-[16px] rounded-[20px]">
        <h6 className="text-[#343a40] text-[14px] mb-[12px] font-[500] leading-[1.2]">
          {"Cathana"}
        </h6>
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
                className="text-[#8094ae] text-[14px] font-[500] no-underline bg-transparent cursor-pointer"
                title={item.content.split("-")[0]}
              >
                {item.content.split("-")[0]}
              </a>
              <span className="text-[#adb5bd] text-[12px]">
                {item.content.split("-")[1]} KB
              </span>
            </div>
          </div>
        )}
        <img
          className="absolute -left-4 -bottom-6 h-[36px] w-[36px] object-cover box-content shadow-custom rounded-full my-auto"
          src="https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg"
          alt=""
        />
      </div>
      <div className="flex justify-start items-center gap-2 ml-[58px] text-[#adb5bd]">
        <span className="leading-[18px] inline-block align-middle text-[12px]">
          {item.sendAt}
        </span>
      </div>
    </div>
  );
};

export default FileMessageLeftSide;
