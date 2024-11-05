import React, { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";
import { useDispatch } from "react-redux";
import useClickOutside from "../../hooks/useClickOutside";
import { TbLoader2 } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteConversation,
  setSelectedConversationId,
} from "../../features/message/messageSlice";

const ContactList = ({ searchString, contacts, loading, error }) => {
  const dispatch = useDispatch();
  const jwt = sessionStorage.getItem("auth-tk-webchat");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingUnfriend, setLoadingUnfriend] = useState(false);

  const menuRef = useRef(null);
  const otherRef = useRef(null);

  useClickOutside([menuRef, otherRef], closeMenu);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = async (contact) => {
    const url_api = `/friend/unfriend/${contact.id}`;

    try {
      setLoadingUnfriend(true);
      await axios.delete("http://localhost:8080" + url_api, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      toast.success("Unfriend successfully!", {
        containerId: "unfriend-toast",
      });

      setLoadingUnfriend(false);
      setTimeout(() => {
        dispatch(deleteConversation(contact.id + "_friend"));
        dispatch(setSelectedConversationId(null));
      }, 1500);
    } catch (err) {
      setLoadingUnfriend(false);
      toast.error(err?.response ? err.response.data : err.message, {
        containerId: "unfriend-toast",
      });
    }
  };

  return (
    <div className="flex-grow divide-gray-200 overflow-y-scroll no-scrollbar">
      <ToastContainer containerId="unfriend-toast" position="top-center" />
      {loading && (
        <div className="flex w-full h-full justify-center items-center">
          <ImSpinner className="animate-spin h-[36px] w-[36px]" />
        </div>
      )}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {contacts &&
        !loading &&
        !error &&
        contacts
          .filter((contact) => {
            if (searchString === "") return true;
            return contact.username.includes(searchString);
          })
          .map((contact, index) => (
            <React.Fragment key={contact.username}>
              {(index === 0 ||
                contact.letter !== contacts[index - 1].letter) && (
                <div className="px-4 pb-2 pt-4 gap-2 bg-gray-50 text-sm font-medium text-gray-500 border-y">
                  {contact.letter}
                </div>
              )}
              <div className="pl-8 pr-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={contact.image}
                    alt={contact.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {contact.username}
                  </span>
                </div>
                <button
                  onClick={toggleMenu}
                  ref={otherRef}
                  className="relative text-gray-400 hover:text-gray-500"
                >
                  {loadingUnfriend ? (
                    <TbLoader2 className="h-[26px] w-[26px] animate-spin" />
                  ) : (
                    <BsThreeDotsVertical className="text-[20px]" />
                  )}
                  {isMenuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute top-1 right-0 mt-1 w-[140px] bg-white border shadow-lg rounded-lg z-10"
                    >
                      <ul className="py-1 text-[14px] text-[#495057cc]">
                        <li
                          className="relative px-2 py-2 hover:bg-gray-100 hover:text-[#3d4349] cursor-pointer"
                          onClick={() => handleClick(contact)}
                        >
                          Unfriend
                        </li>
                      </ul>
                    </div>
                  )}
                </button>
              </div>
            </React.Fragment>
          ))}
    </div>
  );
};

export default ContactList;
