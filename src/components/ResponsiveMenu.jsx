import { BiSolidMessageRoundedDetail } from "react-icons/bi";
// import { MdMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdChatboxes } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import { PiPhoneCallBold } from "react-icons/pi";
import { MdOutlineBookmarks } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import PopoverMenu from "./PopoverMenu";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../features/menu/menuSlice";
import { useNavigate } from "react-router-dom";
import { useStompClient } from "react-stomp-hooks";
import { clearUserInfo } from "../features/auth/authSlice";
import { logout } from "../features/auth/authAction";
const ResponsiveMenu = () => {
  const navigate = useNavigate();
  const stompClient = useStompClient();
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.activeTab);
  const user = useSelector((state) => state.auth.userInfo);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state để thực hiện đóng mở menu popover khi click vào avatar
  const avatarRef = useRef(null); // Tạo ref cho avatar, mục đích để giải quyết vấn đề khi click vào bên ngoài menu cụ thể là avatar để đóng menu

  const handleLogOut = () => {
    sessionStorage.removeItem("auth-tk-webchat");
    navigate("/login");
    dispatch(logout());
    stompClient?.deactivate;
  };

  return (
    <div
      className="h-screen w-[90px] bg-[#665dfe] flex flex-col gap-11 items-center justify-center py-4
    max-sm:h-[70px] max-sm:w-screen max-sm:absolute max-sm:bottom-0 max-sm:flex-row max-sm:justify-evenly max-sm:py-4 max-sm:z-30"
    >
      <div className="group p-1 rounded-md bg-[#f8f9fa] relative flex justify-center max-sm:hidden">
        <BiSolidMessageRoundedDetail
          className="text-[32px] cursor-pointer"
          style={{ color: "#665dfe" }}
        />
      </div>

      <div className="flex flex-col items-center justify-start gap-11 h-full max-sm:h-fit max-sm:flex-row max-sm:justify-evenly max-sm:w-full">
        <div className="group relative flex justify-center">
          <CgProfile
            className={
              "text-[24px] cursor-pointer group-hover:text-white text-[#aea9fe] " +
              (menu === "profile" ? "text-white" : "")
            }
            onClick={() => dispatch(setActiveTab("profile"))}
          />
          {/* Tooltip */}
          <span className="absolute left-9 -top-[3px] z-30 scale-0 rounded bg-gray-900 bg-opacity-95 p-2 text-xs text-center text-white font-semibold group-hover:scale-100 group-hover:min-w-[70px] max-sm:hidden">
            Profile
          </span>
        </div>

        <div className="group relative flex justify-center">
          <IoMdChatboxes
            className={
              "text-[24px] max-sm:text-[22px] cursor-pointer group-hover:fill-white fill-[#aea9fe] " +
              (menu === "chats" ? "fill-white" : "")
            }
            onClick={() => dispatch(setActiveTab("chats"))}
          />
          {/* Tooltip */}
          <span className="absolute left-9 -top-[3px] z-30 scale-0 rounded bg-gray-900 bg-opacity-95 p-2 text-xs text-center text-white font-semibold group-hover:scale-100 group-hover:min-w-[70px] max-sm:hidden">
            Chats
          </span>
        </div>

        <div className="group relative flex justify-center">
          <RiContactsFill
            className={
              "text-[24px] max-sm:text-[22px] cursor-pointer group-hover:fill-white " +
              (menu === "contacts" ? "fill-white" : "")
            }
            style={{ color: "#aea9fe" }}
            onClick={() => dispatch(setActiveTab("contacts"))}
          />
          {/* Tooltip */}
          <span className="absolute left-9 -top-[3px] z-30 scale-0 rounded bg-gray-900 bg-opacity-95 p-2 text-xs text-center text-white font-semibold group-hover:scale-100 group-hover:min-w-[70px] max-sm:hidden">
            Contacts
          </span>
        </div>

        <div className="group relative flex justify-center">
          <PiPhoneCallBold
            className={
              "text-[24px] max-sm:text-[22px] cursor-pointer group-hover:fill-white " +
              (menu === "calls" ? "fill-white" : "")
            }
            style={{ color: "#aea9fe" }}
            onClick={() => dispatch(setActiveTab("calls"))}
          />
          {/* Tooltip */}
          <span className="absolute left-9 -top-[3px] z-30 scale-0 rounded bg-gray-900 bg-opacity-95 p-2 text-xs text-center text-white font-semibold group-hover:scale-100 group-hover:min-w-[70px] max-sm:hidden">
            Calls
          </span>
        </div>

        <div className="flex-1 max-sm:hidden"></div>
        <div className="group relative flex justify-center max-sm:hidden">
          <MdOutlineLogout
            onClick={handleLogOut}
            className="mt-[40px] text-[26px] max-sm:mt-0 max-sm:text-[22px] group-hover:fill-white cursor-pointer"
            style={{ color: "#aea9fe" }}
          />
          {/* Tooltip */}
          <span className="absolute left-9 -bottom-[3px] z-30 scale-0 rounded bg-gray-900 bg-opacity-95 p-2 text-xs text-center text-white font-semibold group-hover:scale-100 group-hover:min-w-[80px] max-sm:hidden">
            Log out
          </span>
        </div>

        <div className="relative">
          <img
            ref={avatarRef}
            className="w-[38px] h-[38px] rounded-full object-cover max-sm:w-[34px] max-sm:h-[34px]"
            src={user?.info?.avatarUrl}
            alt=""
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          />
          {isMenuOpen && (
            <PopoverMenu
              closeMenu={() => setIsMenuOpen(!isMenuOpen)}
              avatarRef={avatarRef}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
