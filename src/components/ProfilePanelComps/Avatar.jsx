import React, { useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";
import useCloudinaryUpload from "../../hooks/useCloudinaryUpload";
import { toast, ToastContainer } from "react-toastify";

const Avatar = () => {
  // Using to showw/hide menu when click three dots
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu & Three Dót Icon Ref
  const menuRef = useRef(null);
  const otherRef = useRef(null);

  const { postToCloudinary, uploading, error } = useCloudinaryUpload();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useClickOutside([menuRef, otherRef], closeMenu);

  const handleFileChange = (event) => {
    toast.info("Change avatar", {
      containerId: "change-avatar-toast",
    });
    const fileSelected = event.target.files[0];
    if (fileSelected) return;
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
      <img
        className="h-20 w-20 rounded-full mb-3"
        src="https://doot-light.react.themesbrand.com/static/media/avatar-3.6256d30dbaad2b8f4e60.jpg"
        alt="Profile"
      />
      <p className="text-xl text-[#495057] mb-3 font-medium">Martin Beter</p>
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
            </ul>
          </div>
        )}
      </button>
    </div>
  );
};

export default Avatar;
