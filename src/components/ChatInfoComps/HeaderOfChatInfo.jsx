import React from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setShowInfoChat } from "../../features/showInfoChat/showInfoChatSlice";
const HeaderOfChatInfo = () => {
  const dispatch = useDispatch();
  return (
    <div className="sticky top-0 h-[70px] w-full border-b flex justify-between items-center px-6 bg-white">
      <h5 className="overflow-hidden text-[17px] text-[#495057] font-medium leading-[1.2]">
        Profile Details
      </h5>
      <IoMdClose
        className="h-[22px] w-[22px] text-[#adb5bd] cursor-pointer hover:text-[#495057]"
        onClick={() => dispatch(setShowInfoChat(false))}
      />
    </div>
  );
};

export default HeaderOfChatInfo;
