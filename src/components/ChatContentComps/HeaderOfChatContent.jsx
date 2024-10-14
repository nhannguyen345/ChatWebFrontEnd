import React, { useRef, useState } from "react";
import { BsTelephone, BsThreeDotsVertical } from "react-icons/bs";
import {
  IoIosSearch,
  IoMdArrowBack,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setPanelVisibility } from "../../features/panelVisibility/panelVisibilitySlice";
import { setShowInfoChat } from "../../features/showInfoChat/showInfoChatSlice";
import useClickOutside from "../../hooks/useClickOutside";
import { setStartingCall } from "../../features/call/callSlice";
const HeaderOfChatContent = () => {
  const { selectedConversationId, listMess } = useSelector(
    (state) => state.message
  );

  // Using to show/hide menu when click three dots
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu & Three Dót Icon Ref
  const menuRef = useRef(null);
  const otherRef = useRef(null);

  function getSelectedConversation() {
    const conve = listMess.find((conv) => {
      return conv.entity.id === selectedConversationId;
    });
    return conve;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useClickOutside([menuRef, otherRef], closeMenu);

  const dispatch = useDispatch();
  const panelVisibility = useSelector((state) => state.panelVisibility);
  return (
    <div className="h-[70px] w-full border-b flex items-center pl-8">
      {/* Back */}
      <IoMdArrowBack
        onClick={() => dispatch(setPanelVisibility(false))}
        className="h-[28px] w-[34px] text-[#adb5bd] hover:text-[#495057] mr-2 sm:block md:hidden"
      />
      {/* Avatar */}
      <img
        className="h-[52px] w-[52px] shadow object-cover rounded-full my-auto"
        src={getSelectedConversation()?.entity?.avatarUrl}
        alt=""
      />

      {/* Name & text info */}
      <div className="ml-3 w-fit">
        <h4 className="col-span-6 font-semibold text-[#495057]">
          {getSelectedConversation()?.entity?.username}
        </h4>
        <span
          onClick={() => dispatch(setShowInfoChat(true))}
          className="col-span-2 text-sm text-[#adb5bd] cursor-pointer hover:text-[#665dfe] max-sm:text-[11px]"
        >
          Click here for more information
        </span>
      </div>

      {/* Search & call & others */}
      <div className="relative flex-1 mr-10 flex justify-end gap-3">
        <IoIosSearch className="text-[22px] stroke-1 my-auto mr-2 fill-[#adb5bd] cursor-pointer hover:fill-[#495057]" />
        <BsTelephone
          className="text-[18px] my-auto stroke-[0.1] mr-2 text-[#adb5bd] cursor-pointer hover:text-[#495057]"
          onClick={() =>
            dispatch(
              setStartingCall({
                userId: getSelectedConversation()?.entity?.username,
              })
            )
          }
        />
        <div ref={otherRef} className="relative">
          <BsThreeDotsVertical
            className={
              "text-[20px] cursor-pointer hover:text-[#495057] " +
              (isMenuOpen
                ? "text-[#495057]"
                : "text-[#adb5bd] hover:text-[#495057]")
            }
            onClick={toggleMenu}
          />
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-[140px] bg-white border shadow-lg rounded-lg z-10"
            >
              <ul className="py-2 text-[14px] text-[#495057cc]">
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[#3d4349] group cursor-pointer">
                  <IoIosInformationCircleOutline className="h-[20px] w-[20px] text-[#adb5bd] group-hover:text-[#3d4349]" />
                  View Info
                </li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[#3d4349] group cursor-pointer">
                  <RiDeleteBin6Line className="h-[20px] w-[20px] text-[#adb5bd] group-hover:text-[#3d4349]" />
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderOfChatContent;
