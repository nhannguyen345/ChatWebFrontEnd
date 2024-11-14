import React from "react";
import { GoFile } from "react-icons/go";
import { formattedTime } from "../../utils/timeUtils";
import { useDispatch } from "react-redux";
import { openImageModal } from "../../features/modal/modalSlice";

const FileMessageRightSide = ({ item, index }) => {
  const dispatch = useDispatch();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = item.fileUrl;
    link.download = `${item.fileUrl.split("/").pop()}`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-fit text-right my-[36px]">
      <div className="inline-block text-left max-w-[400px] bg-[#665dfe] text-[#ffffff] text-[14px] mr-[20px] px-[36px] py-[16px] rounded-[20px]">
        {item.messageType === "IMAGE" ? (
          <img
            onClick={() =>
              dispatch(openImageModal({ imageUrl: item.fileUrl, status: true }))
            }
            className="max-w-full h-auto rounded-md object-cover"
            src={item.fileUrl}
          />
        ) : (
          <div
            className="flex justify-center items-center"
            onClick={handleDownload}
          >
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
          {formattedTime(item.createdAt)}
        </span>
      </div>

      <div className="text-[10px] mt-2 mr-[28px]">
        {item?.statusMess === "pending" && (
          <span className="text-blue-500">Sending...</span>
        )}
        {item?.statusMess === "error" && (
          <span className="text-red-500">Failed to send</span>
        )}
        {item?.statusMess === "success" && (
          <span className="text-green-500">Sent</span>
        )}
      </div>
    </div>
  );
};

export default FileMessageRightSide;
