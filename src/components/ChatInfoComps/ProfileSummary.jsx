import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteConversation,
  setSelectedConversationId,
} from "../../features/message/messageSlice";
import { ImSpinner } from "react-icons/im";

const ProfileSummary = ({ userInfo, selectedConversationId }) => {
  const dispatch = useDispatch();
  const jwt = sessionStorage.getItem("auth-tk-webchat");

  const [loading, setLoading] = useState();

  const handleClick = async () => {
    const url_api = userInfo?.username
      ? `/friend/unfriend/${userInfo.id}`
      : `/group/leave-group/${userInfo.id}`;

    try {
      setLoading(true);
      await axios.delete("http://localhost:8080" + url_api, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      userInfo?.username
        ? toast.success("Unfriend successfully!", {
            containerId: "chat-info-toast",
          })
        : toast.success("Leave group successfully!", {
            containerId: "chat-info-toast",
          });

      setLoading(false);
      setTimeout(() => {
        dispatch(deleteConversation(selectedConversationId));
        dispatch(setSelectedConversationId(null));
      }, 1500);
    } catch (err) {
      setLoading(false);
      toast.error(err?.response ? err.response.data : err.message, {
        containerId: "chat-info-toast",
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 p-8 border-b">
      <ToastContainer containerId="chat-info-toast" position="top-right" />
      <img
        className="h-[120px] w-[120px] rounded-full object-cover"
        src={userInfo?.avatarUrl}
        alt=""
      />
      <h5 className="text-[20px] text-[#495057] font-medium leading-[1.2]">
        {userInfo?.username ? userInfo.username : userInfo.name}
      </h5>
      <button
        onClick={handleClick}
        className="w-[160px] flex items-center justify-center gap-2 text-[14px] text-white font-medium px-5 py-1 outline-none rounded-sm border border-[#ff337c] bg-[#ff337c] hover:bg-[#c9265f]"
      >
        {loading ? (
          <ImSpinner className="animate-spin h-[18px] w-[18px]" />
        ) : userInfo?.username ? (
          "Unfriend"
        ) : (
          "Leave Group"
        )}
      </button>
    </div>
  );
};

export default ProfileSummary;
