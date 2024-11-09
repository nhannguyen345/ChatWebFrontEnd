import React, { useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useClickOutside from "../../hooks/useClickOutside";
import useCloudinaryUpload from "../../hooks/useCloudinaryUpload";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../features/auth/authSlice";
import { setProfileMainPanelVisibility } from "../../features/panelVisibility/panelVisibilitySlice";

const Avatar = () => {
  const jwt = sessionStorage.getItem("auth-tk-webchat");

  // Using to showw/hide menu when click three dots
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  // Menu & Three Dót Icon Ref
  const menuRef = useRef(null);
  const otherRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);

  const { postToCloudinary, error } = useCloudinaryUpload();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useClickOutside([menuRef, otherRef], closeMenu);

  const handleFileChange = async (event) => {
    // toast.info("Change avatar", {
    //   containerId: "change-avatar-toast",
    // });
    const fileSelected = event.target.files[0];
    if (fileSelected) {
      closeMenu();
      try {
        setLoading(true);
        const url_file = await postToCloudinary(fileSelected);
        if (error) throw new Error(error);
        const response = await axios.put(
          `http://localhost:8080/auth/update-avatar?avatarUrl=${url_file}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if ((await response.data) >= 1) {
          toast.success("Change avatar successfully!", {
            containerId: "change-avatar-toast",
          });
          dispatch(setUserInfo({ avatarUrl: url_file }));
        } else {
          throw new Error("Cannot change avatar!");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error(err?.response ? err.response.data : err.message, {
          containerId: "notification-toast",
        });
        setLoading(false);
      }
    }
  };

  const LogoutButton = () => (
    <button className="flex items-center gap-1 text-sm text-[#495057] px-4 py-2 mx-1.5 border border-[#e5e9f2] hover:border-red-500 group rounded bg-transparent">
      <BiLogOut className="h-4.5 w-4.5 group-hover:text-red-500" />
      <span className="group-hover:text-red-500">Logout</span>
    </button>
  );

  return (
    <div className="relative flex flex-col items-center bg-white p-5 mt-5 border rounded">
      <ToastContainer containerId="change-avatar-toast" position="top-center" />
      {!loading && (
        <img
          className="h-20 w-20 rounded-full object-cover mb-3"
          src={user.info.avatarUrl}
          alt="Profile"
        />
      )}
      {loading && (
        <div
          className="h-20 w-20 flex justify-center items-center rounded-full mb-3 bg-gray-300"
          role="status"
          aria-label="Loading"
        >
          <AiOutlineLoading3Quarters className="h-10 w-10 text-gray-500 animate-spin" />
        </div>
      )}
      <p className="text-xl text-[#495057] mb-3 font-medium">
        {user.info.username}
      </p>
      <LogoutButton />
      <button ref={otherRef} className="absolute top-3 right-3">
        <BsThreeDotsVertical
          onClick={toggleMenu}
          className=" text-[#adb5bd] text-xl"
        />
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-1 w-[140px] bg-white border shadow-lg rounded-lg z-10"
          >
            <ul className="py-1 text-[14px] text-[#495057cc]">
              <li
                className="relative px-2 py-2 hover:bg-gray-100 hover:text-[#3d4349] cursor-pointer"
                onClick={null}
              >
                <input
                  type="file"
                  id="profilePicture"
                  className="absolute top-0 right-2 flex-grow w-full h-full opacity-0 z-10"
                  placeholder="Choose file"
                  onChange={handleFileChange}
                />
                Change Avatar
              </li>
              <li
                className="relative md:hidden px-2 py-2 hover:bg-gray-100 hover:text-[#3d4349] cursor-pointer"
                onClick={() => dispatch(setProfileMainPanelVisibility(true))}
              >
                Update your info
              </li>
            </ul>
          </div>
        )}
      </button>
    </div>
  );
};

export default Avatar;
