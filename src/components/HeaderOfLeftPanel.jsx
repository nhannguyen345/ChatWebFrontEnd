import { TbBell } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import ChatFilter from "./ChatFilter";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { GoPlus } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import {
  openNotificationModal,
  closeNotificationModal,
  openInviteModal,
  openCreateGroupModal,
} from "../features/modal/modalSlice";
import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
const HeaderOfLeftPanel = () => {
  // Using to showw/hide menu when click three dots
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu & Three Dót Icon Ref
  const menuRef = useRef(null);
  const otherRef = useRef(null);

  // Get state global to make header suitable for content
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.activeTab);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useClickOutside([menuRef, otherRef], closeMenu);

  // Get title from menu state global
  const getTitle = () => {
    const titles = {
      profile: "Profile",
      chats: "Chats",
      contacts: "Contacts",
      calls: "Calls",
    };
    return titles[menu] || "";
  };

  const NotificationIcon = () => (
    <div className="relative" title="Notifications">
      <TbBell
        className="text-[#adb5bd] text-[20px] cursor-pointer hover:text-[#495057]"
        onClick={() => dispatch(openNotificationModal())}
      />
      <span className="absolute -top-2 -right-1 text-center h-4 w-4 p-px rounded-full bg-red-600 text-white text-[10px] font-bold">
        2
      </span>
    </div>
  );

  const DynamicIconButton = () => {
    if (menu === "chats") {
      return (
        <div className="relative" ref={otherRef}>
          <BsThreeDotsVertical
            className={
              "text-[20px] cursor-pointer " +
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
                <li
                  className="px-4 py-2 hover:bg-gray-100 hover:text-[#3d4349] cursor-pointer"
                  onClick={() => dispatch(openCreateGroupModal())}
                >
                  Create Group
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 hover:text-[#3d4349] cursor-pointer"
                  onClick={() => dispatch(openInviteModal())}
                >
                  Invite Others
                </li>
              </ul>
            </div>
          )}
        </div>
      );
    }
    if (menu === "contacts") {
      return (
        <button className="p-[6px] -mt-2 rounded-full bg-[#665dfe] text-white hover:bg-[#4237fe]">
          <GoPlus className="text-[16px]" />
        </button>
      );
    }
    return null;
  };

  // MAIN COMPONENT
  const SearchContacts = () => (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search Contacts.."
        className="w-full pl-10 pr-4 py-2 text-[15px] border rounded-lg bg-[#f9fafb] focus:outline-none focus:border-blue-500"
      />
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#adb5bd]">
        <IoIosSearch className="text-[20px]" />
      </div>
    </div>
  );

  return (
    <div className="sticky top-0 w-full px-4 pt-4 pb-4 shadow-sm border-b border-b-[#e0e0e0]">
      {/* Header & notification & setting */}
      <div className="w-full flex flex-row justify-between">
        <h4 className="text-[18px] leading-[1.2] font-semibold text-[#495057]">
          {getTitle()}
        </h4>
        <ul className="flex flex-row justify-around items-center gap-4 mr-2">
          <li>
            {(menu === "chats" || menu === "contacts" || menu === "calls") && (
              <NotificationIcon />
            )}
          </li>
          <li>
            <DynamicIconButton />
          </li>
        </ul>
      </div>

      {/* Chat Filter & Search bar */}
      <div className="w-full mt-3 flex flex-row justify-between">
        {(menu === "chats" || menu === "calls") && (
          <>
            <ChatFilter />
            <SearchBar />
          </>
        )}
        {menu === "contacts" && <SearchContacts />}
      </div>
    </div>
  );
};

export default HeaderOfLeftPanel;
