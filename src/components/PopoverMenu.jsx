import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { TfiUnlock } from "react-icons/tfi";
import { SlLogout } from "react-icons/sl";
import { useEffect, useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useStompClient } from "react-stomp-hooks";
import { setActiveTab } from "../features/menu/menuSlice";
import { logout } from "../features/auth/authAction";

const PopoverMenu = ({ closeMenu, avatarRef }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stompClient = useStompClient();

  useClickOutside([avatarRef, menuRef], closeMenu);

  const handleLogOut = () => {
    sessionStorage.removeItem("auth-tk-webchat");
    navigate("/login");
    dispatch(logout());
    stompClient?.deactivate;
  };

  return (
    <div
      ref={menuRef}
      className="absolute -top-44 -left-2 z-20 w-[190px] h-fit flex flex-col py-3 bg-white rounded-md shadow-[0_15px_90px_5px_rgba(0,0,0,0.3)] max-sm:left-auto max-sm:right-0 max-sm:-top-40"
    >
      <a
        onClick={() => {
          dispatch(setActiveTab("profile"));
          closeMenu();
        }}
        className="px-5 py-1 flex flex-row justify-between items-center text-[#495057] text-[15px] max-sm:text-[14px]"
        href="#"
      >
        Profile
        <CgProfile style={{ fontSize: "14px" }} />
      </a>
      <a
        className="px-5 py-1 flex flex-row justify-between items-center text-[#495057] text-[15px] max-sm:text-[14px]"
        href="#"
      >
        Setting
        <IoSettingsOutline style={{ fontSize: "14px" }} />
      </a>
      <a
        className="px-5 py-1 flex flex-row justify-between items-center text-[#495057] text-[15px] max-sm:text-[14px]"
        href="#"
      >
        Changing Password
        <TfiUnlock style={{ fontSize: "13px" }} />
      </a>
      <div className="border-t-[0.8px] h-0 my-2 border-gray-200 dark:border-neutral-700"></div>
      <a
        className="px-5 py-1 flex flex-row justify-between items-center text-[#495057] text-[15px] max-sm:text-[14px]"
        href="#"
        onClick={handleLogOut}
      >
        Log out
        <SlLogout style={{ fontSize: "13px", marginRight: "2px" }} />
      </a>
    </div>
  );
};

export default PopoverMenu;
