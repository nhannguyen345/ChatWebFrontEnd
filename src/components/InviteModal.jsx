import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeInviteModal } from "../features/modal/modalSlice";
import { IoMdClose } from "react-icons/io";
import { useStompClient } from "react-stomp-hooks";
import { toast, ToastContainer } from "react-toastify";

const InviteModal = () => {
  const [isVisible, setIsVisible] = useState(false); // Quản lý trạng thái hiển thị của modal
  const modal = useSelector((state) => state.modal.isInviteModalOpen);
  const user =
    useSelector((state) => state.auth.userInfo) ||
    JSON.parse(localStorage.getItem("user-info"));
  const dispatch = useDispatch();
  const stompClient = useStompClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    stompClient.publish({
      destination: "/app/create-friend-request",
      body: JSON.stringify({
        userId: user.info.id,
        userName: user.info.username,
        emailReceiver: email,
        inviteMessage: message,
      }),
    });
    // Handle invitation logic here
    toast.info("Invitation sent!");
    setTimeout(() => dispatch(closeInviteModal()), 800);
  };

  useEffect(() => {
    if (modal) {
      setIsVisible(true); // Bắt đầu hiệu ứng khi modal mở
    } else {
      setIsVisible(false); // Khi modal đóng, ẩn hiệu ứng
    }
  }, [modal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* background black */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => dispatch(closeInviteModal())}
      ></div>
      <ToastContainer position="top-center" />
      <div
        className={`bg-white flex flex-col sm:min-w-[340px] md:min-w-[420px] rounded-lg z-10 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header Modal */}
        <div className="p-4 flex items-center justify-between text-[#495057] border-b">
          <h5 className="text-[17px] font-medium">Invite Others</h5>
          <IoMdClose
            className="h-[22px] w-[22px] text-[#adb5bd] cursor-pointer hover:text-black"
            onClick={() => dispatch(closeInviteModal())}
          />
        </div>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#495057] mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type email address here"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#495057] mb-2"
            >
              Invitation message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here"
              rows="4"
              className="w-full resize-none px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => dispatch(closeInviteModal())}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#665dfe] rounded-md hover:bg-[#4237fe] focus:outline-none"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;
